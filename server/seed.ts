import { db } from "./db";
import { hashPassword } from "./auth";
import { aiProfiles, employees, initialTasks, leaderboard } from "../src/app/components/task-dashboard/data";

const taskStatus = { Backlog: "BACKLOG", "To-Do": "TODO", "In Progress": "IN_PROGRESS", Done: "DONE" } as const;
const priority = { low: "LOW", medium: "MEDIUM", high: "HIGH" } as const;
const workload = { available: "AVAILABLE", moderate: "MODERATE", overloaded: "OVERLOADED" } as const;

function deadlineToDate(value: string) {
  const [month, day] = value.split(" ");
  return new Date(`${month} ${day}, 2026 12:00:00 UTC`);
}

async function main() {
  const passwordHash = await hashPassword("demo1234");
  const users = [
    { id: "user-admin", email: "arif@taskflow.io", name: "Arif Hossain", role: "ADMIN" as const },
    { id: "user-super", email: "kamrul@taskflow.io", name: "Kamrul Islam", role: "SUPER_ADMIN" as const },
    { id: "user-employee", email: "sumaiya@taskflow.io", name: "Sumaiya Akter", role: "EMPLOYEE" as const },
  ];
  for (const user of users) {
    await db.user.upsert({ where: { email: user.email }, update: { name: user.name, role: user.role, passwordHash }, create: { ...user, passwordHash } });
  }

  for (const employee of employees) {
    const completionRate = employee.completionRate ?? (employee.id === "ben" ? 96 : employee.id === "eli" ? 91 : employee.id === "ana" ? 94 : employee.id === "dev" ? 89 : employee.id === "cara" ? 86 : 82);
    await db.employee.upsert({
      where: { id: employee.id },
      update: { name: employee.name, initials: employee.initials, title: employee.title, workload: workload[employee.workload], completionRate },
      create: { id: employee.id, name: employee.name, initials: employee.initials, title: employee.title, workload: workload[employee.workload], completionRate },
    });
  }

  for (const task of initialTasks) {
    await db.task.upsert({
      where: { id: task.id },
      update: {
        title: task.title, description: `Seeded TDTS task. AI baseline score for ${task.assignee}: ${aiProfiles[task.assignee].score}.`,
        priority: priority[task.priority], status: taskStatus[task.status], deadline: deadlineToDate(task.deadline), project: task.project,
        assigneeId: task.assignee, creatorId: "user-admin",
      },
      create: {
        id: task.id, title: task.title, description: `Seeded TDTS task. AI baseline score for ${task.assignee}: ${aiProfiles[task.assignee].score}.`,
        priority: priority[task.priority], status: taskStatus[task.status], deadline: deadlineToDate(task.deadline), project: task.project,
        assigneeId: task.assignee, creatorId: "user-admin",
      },
    });
  }

  await db.reward.deleteMany();
  for (const entry of leaderboard) {
    await db.reward.create({ data: { userId: entry.id, badgeName: "Performance points", points: entry.points, earnedAt: new Date("2026-09-14T12:00:00Z") } });
  }
  await db.reward.createMany({ data: [
    { userId: "user-employee", badgeName: "Fast Finisher", points: 120, earnedAt: new Date("2026-09-11T12:00:00Z") },
    { userId: "user-employee", badgeName: "Quality Streak", points: 180, earnedAt: new Date("2026-09-09T12:00:00Z") },
    { userId: "user-employee", badgeName: "Reliable Owner", points: 2440, earnedAt: new Date("2026-09-14T12:00:00Z") },
  ] });

  const [userCount, employeeCount, taskCount, rewardCount] = await Promise.all([
    db.user.count(), db.employee.count(), db.task.count(), db.reward.count(),
  ]);
  console.log(`Seed complete: users=${userCount}, employees=${employeeCount}, tasks=${taskCount}, rewards=${rewardCount}`);
}

main().catch((error) => {
  console.error(error);
  throw error;
}).finally(async () => db.$disconnect());
