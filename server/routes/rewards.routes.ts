import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { requireAuth } from "../auth";

const router = Router();
router.use(requireAuth);

router.get("/", async (req: any, res: any) => {
  const userId = String(req.query.userId || req.user?.id || "user-employee");
  const rewards = await db.reward.findMany({ where: { userId }, orderBy: { earnedAt: "desc" } });
  return res.json(rewards);
});

router.post("/redeem", async (req: any, res: any) => {
  const parsed = z.object({ rewardName: z.string().default("Team Learning Credit"), points: z.number().int().positive().default(2500) }).safeParse(req.body ?? {});
  if (!parsed.success) return res.status(400).json({ error: "Invalid reward request" });
  return res.json({ ok: true, rewardName: parsed.data.rewardName, points: parsed.data.points });
});

export { router as rewardsRoutes };
