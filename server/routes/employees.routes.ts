import { Router } from "express";
import { db } from "../db";
import { requireAuth } from "../auth";

const router = Router();
router.use(requireAuth);

router.get("/", async (_req: any, res: any) => {
  const rows = await db.employee.findMany({ include: { _count: { select: { tasks: true } } }, orderBy: { name: "asc" } });
  return res.json(rows.map((employee) => ({
    id: employee.id,
    name: employee.name,
    initials: employee.initials,
    title: employee.title,
    workload: employee.workload.toLowerCase(),
    completionRate: employee.completionRate,
    recentTasksCount: employee._count.tasks,
  })));
});

export { router as employeesRoutes };
