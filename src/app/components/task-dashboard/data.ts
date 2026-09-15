export type Workload = "available" | "moderate" | "overloaded";
export type Priority = "low" | "medium" | "high";
export type TaskStatus = "Backlog" | "To-Do" | "In Progress" | "Done";

export type Employee = {
  id: "ana" | "ben" | "cara" | "dev" | "eli" | "fay";
  name: string;
  initials: string;
  workload: Workload;
  title: string;
  completionRate: number;
};

export const employees: Employee[] = [
  { id: "ana", name: "Farida Begum", initials: "FB", workload: "moderate", title: "UI/UX Specialist", completionRate: 94 },
  { id: "ben", name: "Rafiq Islam", initials: "RI", workload: "available", title: "Full-Stack Developer", completionRate: 96 },
  { id: "cara", name: "Nusrat Jahan", initials: "NJ", workload: "overloaded", title: "React Developer", completionRate: 86 },
  { id: "dev", name: "Tanvir Ahmed", initials: "TA", workload: "moderate", title: "Frontend Developer", completionRate: 89 },
  { id: "eli", name: "Sabbir Hossain", initials: "SH", workload: "available", title: "Backend Specialist", completionRate: 91 },
  { id: "fay", name: "Meherun Nesa", initials: "MN", workload: "overloaded", title: "Designer", completionRate: 82 },
];

export const aiProfiles = {
  ben: { score: 92, reasons: ["Full-Stack Developer", "Lowest Current Workload", "96% On-Time Rate", "18 Similar Tasks", "Available This Week"] },
  eli: { score: 85, reasons: ["Backend Specialist", "Available", "Fast Delivery History", "On-Time Rate 91%"] },
  ana: { score: 78, reasons: ["UI/UX Specialist", "Moderate Workload", "High Quality Score"] },
  dev: { score: 73, reasons: ["Frontend Developer", "Similar Task Experience"] },
  cara: { score: 61, reasons: ["React Developer", "High Workload — Limited Capacity"] },
  fay: { score: 58, reasons: ["Designer", "Overloaded — Not Recommended"] },
} as const;

export type EmployeeId = keyof typeof aiProfiles;

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  status: TaskStatus;
  subtasksDone?: number;
  subtasksTotal?: number;
  assignee: EmployeeId;
  assigneeData?: Employee;
  description?: string;
  deadline: string;
  deadlineIso?: string;
  project: string;
};

export const initialTasks: Task[] = [
  { id: "t1", title: "Research competitor pricing pages", priority: "low", status: "Backlog", assignee: "ana", deadline: "Sep 28", project: "Growth" },
  { id: "t2", title: "Draft Q3 marketing brief", priority: "medium", status: "Backlog", assignee: "dev", deadline: "Sep 25", project: "Growth" },
  { id: "t3", title: "Design new onboarding flow", priority: "high", status: "To-Do", subtasksDone: 1, subtasksTotal: 5, assignee: "ana", deadline: "Sep 20", project: "Project Alpha" },
  { id: "t4", title: "Set up analytics events", priority: "medium", status: "To-Do", subtasksDone: 0, subtasksTotal: 3, assignee: "eli", deadline: "Sep 22", project: "Project Alpha" },
  { id: "t5", title: "Website redesign — homepage", priority: "high", status: "In Progress", subtasksDone: 3, subtasksTotal: 5, assignee: "dev", deadline: "Sep 18", project: "Project Alpha" },
  { id: "t6", title: "Payment gateway integration", priority: "medium", status: "In Progress", subtasksDone: 2, subtasksTotal: 4, assignee: "ben", deadline: "Sep 21", project: "Checkout" },
  { id: "t7", title: "Migrate auth service", priority: "high", status: "Done", assignee: "ben", deadline: "Sep 11", project: "Platform" },
  { id: "t8", title: "Onboarding email sequence", priority: "medium", status: "Done", assignee: "cara", deadline: "Sep 10", project: "Growth" },
  { id: "t9", title: "Q2 retro doc", priority: "low", status: "Done", assignee: "fay", deadline: "Sep 08", project: "Operations" },
];

export const roleProfiles = {
  admin: { name: "Arif Hossain", email: "arif@taskflow.io", initials: "AH", badge: "Admin" },
  super: { name: "Kamrul Islam", email: "kamrul@taskflow.io", initials: "KI", badge: "Super Admin" },
  employee: { name: "Sumaiya Akter", email: "sumaiya@taskflow.io", initials: "SA", badge: "Employee" },
} as const;

export const landingStats = [
  ["10k+", "tasks delegated"], ["98%", "on-time"], ["3", "roles"], ["40%", "faster turnaround"],
] as const;

export const leaderboard = [
  { id: "ben", points: 4280, completion: 96 },
  { id: "eli", points: 3910, completion: 91 },
  { id: "ana", points: 3560, completion: 94 },
  { id: "dev", points: 3280, completion: 89 },
  { id: "cara", points: 2940, completion: 86 },
] as const;

export const notifications = [
  { id: "n1", title: "Rafiq completed Payment gateway integration", time: "4 min ago" },
  { id: "n2", title: "Website redesign is due in 3 days", time: "18 min ago" },
  { id: "n3", title: "Project Health Score moved to 89%", time: "1 hr ago" },
  { id: "n4", title: "Sabbir earned the Fast Finisher badge", time: "3 hrs ago" },
  { id: "n5", title: "New admin joined Product Workspace", time: "Yesterday" },
] as const;

export const workspaces = ["Project Alpha", "Growth Workspace", "Checkout Team", "Platform"];

export const ganttTasks = [
  { name: "Onboarding flow", start: 1, duration: 7, completion: 45, priority: "high" as const },
  { name: "Analytics events", start: 3, duration: 6, completion: 25, priority: "medium" as const },
  { name: "Homepage redesign", start: 0, duration: 9, completion: 72, priority: "high" as const },
  { name: "Payment gateway", start: 2, duration: 8, completion: 58, priority: "low" as const },
];

export const performanceTrend = [
  { week: "W1", completed: 8, points: 540 }, { week: "W2", completed: 11, points: 720 },
  { week: "W3", completed: 9, points: 650 }, { week: "W4", completed: 14, points: 880 },
  { week: "W5", completed: 13, points: 830 }, { week: "W6", completed: 16, points: 990 },
];
