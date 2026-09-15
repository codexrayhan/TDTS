import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { requireAuth } from "../auth";

const router = Router();
router.use(requireAuth);

function mapPriority(value: string) {
  if (value === "high") return "HIGH" as const;
  if (value === "low") return "LOW" as const;
  return "MEDIUM" as const;
}
function mapStatus(value: string) {
  if (value === "Backlog") return "BACKLOG" as const;
  if (value === "In Progress") return "IN_PROGRESS" as const;
  if (value === "Done") return "DONE" as const;
  return "TODO" as const;
}
const taskInput = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(""),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["Backlog", "To-Do", "In Progress", "Done"]).default("To-Do"),
  deadline: z.string().min(1),
  project: z.string().min(1),
  assigneeId: z.string().optional().nullable(),
});

function serializeTask(task: any) {
  const statuses: Record<string, string> = { BACKLOG: "Backlog", TODO: "To-Do", IN_PROGRESS: "In Progress", DONE: "Done" };
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    priority: String(task.priority).toLowerCase(),
    status: statuses[task.status] ?? task.status,
    deadline: task.deadline.toISOString(),
    project: task.project,
    assignee: task.assigneeId || "ben",
    assigneeData: task.assignee ? {
      id: task.assignee.id,
      name: task.assignee.name,
      initials: task.assignee.initials,
      workload: String(task.assignee.workload).toLowerCase(),
      title: task.assignee.title,
      completionRate: task.assignee.completionRate,
    } : undefined,
  };
}

router.get("/", async (_req: any, res: any) => {
  const tasks = await db.task.findMany({ include: { assignee: true }, orderBy: { createdAt: "desc" } });
  return res.json(tasks.map(serializeTask));
});

router.post("/", async (req: any, res: any) => {
  const parsed = taskInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid task payload" });
  const task = await db.task.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      priority: mapPriority(parsed.data.priority),
      status: mapStatus(parsed.data.status),
      deadline: new Date(parsed.data.deadline),
      project: parsed.data.project,
      assigneeId: parsed.data.assigneeId || null,
      creatorId: req.user?.id || null,
    },
    include: { assignee: true },
  });
  return res.status(201).json(serializeTask(task));
});

router.patch("/:id", async (req: any, res: any) => {
  const parsed = taskInput.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid task update" });
  const data: any = { ...parsed.data };
  if (parsed.data.priority) data.priority = mapPriority(parsed.data.priority);
  if (parsed.data.status) data.status = mapStatus(parsed.data.status);
  if (parsed.data.deadline) data.deadline = new Date(parsed.data.deadline);
  if ("assigneeId" in parsed.data) data.assigneeId = parsed.data.assigneeId || null;
  const task = await db.task.update({ where: { id: req.params.id }, data, include: { assignee: true } });
  return res.json(serializeTask(task));
});

router.delete("/:id", async (req: any, res: any) => {
  await db.task.delete({ where: { id: req.params.id } });
  return res.status(204).end();
});

export { router as tasksRoutes };
