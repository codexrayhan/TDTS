import {
  aiProfiles,
  employees as mockEmployees,
  initialTasks,
  leaderboard as mockLeaderboard,
  performanceTrend as mockPerformanceTrend,
  type Employee,
  type EmployeeId,
  type Priority,
  type Task,
  type TaskStatus,
} from "../components/task-dashboard/data";

export type AuthUser = { id: string; name: string; email: string; role: "admin" | "super" | "employee" };
export type AuthResponse = { token: string; user: AuthUser };
export type CreateTaskInput = {
  title: string;
  description?: string;
  priority: Priority;
  status?: TaskStatus;
  deadline: string;
  project: string;
  assigneeId?: EmployeeId | string | null;
};
export type Recommendation = { employeeId: string; score: number; reasons: string[]; alternatives?: string[] };
export type RecommendationResponse = { recommendations: Recommendation[]; source: "openai" | "fallback" | "mock" };
export type LeaderboardEntry = { id: string; points: number; completion: number; employee: Employee };
export type RewardRecord = { id: string; userId: string; badgeName: string; points: number; earnedAt: string };

const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const USE_MOCK = !API_BASE;
let mockTasks: Task[] = initialTasks.map((task) => ({ ...task }));
let mockSequence = 100;

export function isMockMode() {
  return USE_MOCK;
}

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function token() {
  return typeof window === "undefined" ? "" : window.localStorage.getItem("tdts-token") || "";
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...(init.headers || {}),
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function mockUserForEmail(email: string, fallbackRole: AuthUser["role"] = "admin"): AuthUser {
  const lower = email.toLowerCase();
  if (lower.includes("kamrul")) return { id: "user-super", name: "Kamrul Islam", email: lower, role: "super" };
  if (lower.includes("sumaiya")) return { id: "user-employee", name: "Sumaiya Akter", email: lower, role: "employee" };
  if (lower.includes("arif")) return { id: "user-admin", name: "Arif Hossain", email: lower, role: "admin" };
  return { id: `demo-${fallbackRole}`, name: "TDTS Demo User", email: lower, role: fallbackRole };
}

export async function loginRequest(email: string, password: string, demoRole: AuthUser["role"] = "admin") {
  if (USE_MOCK) {
    await delay(180);
    if (password.length < 4) throw new Error("Invalid email or password");
    return { token: "demo-token", user: mockUserForEmail(email, demoRole) } satisfies AuthResponse;
  }
  return request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function signupRequest(payload: { name: string; email: string; password: string; role: AuthUser["role"] }) {
  if (USE_MOCK) {
    await delay(180);
    return { token: "demo-token", user: { id: `demo-${payload.role}`, name: payload.name, email: payload.email, role: payload.role } } satisfies AuthResponse;
  }
  return request<AuthResponse>("/auth/signup", { method: "POST", body: JSON.stringify(payload) });
}

export async function logoutRequest() {
  if (USE_MOCK) return;
  return request<void>("/auth/logout", { method: "POST" });
}

export async function getTasks(): Promise<Task[]> {
  if (USE_MOCK) {
    await delay();
    return mockTasks.map((task) => ({ ...task, assigneeData: mockEmployees.find((employee) => employee.id === task.assignee) }));
  }
  const rows = await request<Task[]>("/tasks");
  return rows.map(normalizeTask);
}

function normalizeTask(task: Task): Task {
  const parsed = new Date(task.deadline);
  return {
    ...task,
    deadlineIso: Number.isNaN(parsed.getTime()) ? task.deadlineIso : parsed.toISOString(),
    deadline: Number.isNaN(parsed.getTime()) ? task.deadline : parsed.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
  };
}

export async function createTask(payload: CreateTaskInput): Promise<Task> {
  if (USE_MOCK) {
    await delay();
    const deadline = new Date(payload.deadline);
    const task: Task = {
      id: `mock-${mockSequence++}`,
      title: payload.title,
      description: payload.description || "",
      priority: payload.priority,
      status: payload.status || "To-Do",
      deadline: Number.isNaN(deadline.getTime()) ? payload.deadline : deadline.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      deadlineIso: payload.deadline,
      project: payload.project,
      assignee: (payload.assigneeId || "ben") as EmployeeId,
      assigneeData: mockEmployees.find((employee) => employee.id === (payload.assigneeId || "ben")),
    };
    mockTasks = [task, ...mockTasks];
    return task;
  }
  return normalizeTask(await request<Task>("/tasks", { method: "POST", body: JSON.stringify(payload) }));
}

export async function updateTask(id: string, patch: Partial<CreateTaskInput>): Promise<Task> {
  if (USE_MOCK) {
    await delay(120);
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index < 0) throw new Error("Task not found");
    const current = mockTasks[index];
    const deadline = patch.deadline ? new Date(patch.deadline) : null;
    const next: Task = {
      ...current,
      ...patch,
      assignee: (patch.assigneeId ?? current.assignee) as EmployeeId,
      deadline: patch.deadline && deadline && !Number.isNaN(deadline.getTime()) ? deadline.toLocaleDateString("en-US", { month: "short", day: "2-digit" }) : current.deadline,
      deadlineIso: patch.deadline || current.deadlineIso,
    } as Task;
    mockTasks[index] = next;
    return { ...next };
  }
  return normalizeTask(await request<Task>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(patch) }));
}

export async function deleteTask(id: string) {
  if (USE_MOCK) {
    await delay(120);
    mockTasks = mockTasks.filter((task) => task.id !== id);
    return;
  }
  return request<void>(`/tasks/${id}`, { method: "DELETE" });
}

export async function getEmployees(): Promise<Employee[]> {
  if (USE_MOCK) {
    await delay();
    return mockEmployees.map((employee) => ({ ...employee }));
  }
  return request<Employee[]>("/employees");
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  if (USE_MOCK) {
    await delay();
    return mockLeaderboard.map((entry) => ({
      ...entry,
      employee: mockEmployees.find((employee) => employee.id === entry.id)!,
    }));
  }
  return request<LeaderboardEntry[]>("/leaderboard");
}

export async function getRewards(userId = "user-employee"): Promise<RewardRecord[]> {
  if (USE_MOCK) {
    await delay();
    return [
      { id: "r1", userId, badgeName: "Reliable Owner", points: 2440, earnedAt: "2026-09-14T12:00:00.000Z" },
      { id: "r2", userId, badgeName: "Fast Finisher", points: 120, earnedAt: "2026-09-11T12:00:00.000Z" },
      { id: "r3", userId, badgeName: "Quality Streak", points: 180, earnedAt: "2026-09-09T12:00:00.000Z" },
    ];
  }
  return request<RewardRecord[]>(`/rewards?userId=${encodeURIComponent(userId)}`);
}

export async function redeemReward(rewardName = "Team Learning Credit", points = 2500) {
  if (USE_MOCK) {
    await delay(180);
    return { ok: true, rewardName, points };
  }
  return request<{ ok: boolean; rewardName: string; points: number }>("/rewards/redeem", { method: "POST", body: JSON.stringify({ rewardName, points }) });
}

export async function getPerformanceTrend() {
  if (USE_MOCK) {
    await delay();
    return mockPerformanceTrend.map((row) => ({ ...row }));
  }
  const [tasks, rewards] = await Promise.all([getTasks(), getRewards()]);
  const completed = tasks.filter((task) => task.status === "Done").length;
  const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0);
  return Array.from({ length: 6 }, (_, index) => ({
    week: `W${index + 1}`,
    completed: Math.max(0, completed - (5 - index)) + index,
    points: Math.round(totalPoints * (0.55 + index * 0.09)),
  }));
}

export async function getAIRecommendations(taskId: string): Promise<RecommendationResponse> {
  if (USE_MOCK) {
    return {
      source: "mock",
      recommendations: Object.entries(aiProfiles)
        .map(([employeeId, profile]) => ({ employeeId, score: profile.score, reasons: [...profile.reasons], alternatives: [] }))
        .sort((a, b) => b.score - a.score),
    };
  }
  return request<RecommendationResponse>("/ai/recommend", { method: "POST", body: JSON.stringify({ taskId }) });
}
