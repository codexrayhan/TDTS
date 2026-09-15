import { Router } from "express";
import { db } from "../db";
import { requireAuth } from "../auth";

const router = Router();
router.use(requireAuth);

router.get("/", async (_req: any, res: any) => {
  const [employees, rewardGroups] = await Promise.all([
    db.employee.findMany(),
    db.reward.groupBy({ by: ["userId"], _sum: { points: true } }),
  ]);
  const points = new Map(rewardGroups.map((group) => [group.userId, group._sum.points ?? 0]));
  const rows = employees.map((employee) => ({
    id: employee.id,
    points: points.get(employee.id) || 0,
    completion: employee.completionRate,
    employee: {
      id: employee.id,
      name: employee.name,
      initials: employee.initials,
      title: employee.title,
      workload: employee.workload.toLowerCase(),
      completionRate: employee.completionRate,
    },
  })).filter((row) => row.points > 0).sort((a, b) => b.points - a.points);
  return res.json(rows);
});

export { router as leaderboardRoutes };
