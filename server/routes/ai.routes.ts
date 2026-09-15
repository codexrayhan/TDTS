import { Router } from "express";
import OpenAI from "openai";
import { z } from "zod";
import { db } from "../db";
import { requireAuth } from "../auth";
import { getServerEnv } from "../env";
import { aiProfiles } from "../../src/app/components/task-dashboard/data";

const router = Router();
router.use(requireAuth);
let warnedMissingKey = false;

const responseSchema = z.object({
  recommendations: z.array(z.object({
    employeeId: z.string(),
    score: z.number(),
    reasons: z.array(z.string()).min(1),
    alternatives: z.array(z.string()).optional(),
  })),
});

function fallbackRecommendations(candidateIds: string[]) {
  return candidateIds
    .filter((id) => id in aiProfiles)
    .map((id) => {
      const profile = aiProfiles[id as keyof typeof aiProfiles];
      return { employeeId: id, score: profile.score, reasons: [...profile.reasons], alternatives: [] as string[] };
    })
    .sort((a, b) => b.score - a.score);
}

router.post("/recommend", async (req: any, res: any) => {
  const parsed = z.object({ taskId: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "taskId is required" });

  const [task, employees] = await Promise.all([
    db.task.findUnique({ where: { id: parsed.data.taskId } }),
    db.employee.findMany({ include: { _count: { select: { tasks: true } } } }),
  ]);
  if (!task) return res.status(404).json({ error: "Task not found" });

  const fallback = fallbackRecommendations(employees.map((employee) => employee.id));
  const apiKey = getServerEnv().OPENAI_API_KEY;
  if (!apiKey) {
    if (!warnedMissingKey) {
      console.warn("TDTS AI: OPENAI_API_KEY is not set; using deterministic aiProfiles fallback.");
      warnedMissingKey = true;
    }
    return res.json({ recommendations: fallback, source: "fallback" });
  }

  try {
    const client = new OpenAI({ apiKey });
    const prompt = [
      "You are a task delegation assistant. Given a task and a list of employees, score each employee's fit (0-100) and explain why.",
      `Task: ${JSON.stringify({ title: task.title, priority: task.priority, deadline: task.deadline, project: task.project, description: task.description })}`,
      `Employees: ${JSON.stringify(employees.map((employee) => ({ id: employee.id, name: employee.name, title: employee.title, workload: employee.workload, completionRate: employee.completionRate, recentTasksCount: employee._count.tasks })))}`,
      "Return JSON: {\"recommendations\":[{\"employeeId\":\"...\",\"score\":92,\"reasons\":[\"...\"],\"alternatives\":[\"...\"]}]}. Return every employee exactly once and sort highest score first.",
    ].join("\n\n");

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Return valid JSON only. Be concise and evidence-based." },
        { role: "user", content: prompt },
      ],
    });
    const content = completion.choices[0]?.message?.content || "{}";
    const validated = responseSchema.parse(JSON.parse(content));
    const recommendations = validated.recommendations
      .filter((item) => employees.some((employee) => employee.id === item.employeeId))
      .map((item) => ({ ...item, score: Math.max(0, Math.min(100, Math.round(item.score))) }))
      .sort((a, b) => b.score - a.score);
    return res.json({ recommendations: recommendations.length ? recommendations : fallback, source: recommendations.length ? "openai" : "fallback" });
  } catch (error) {
    console.error("TDTS AI recommendation failed; using fallback.", error);
    return res.json({ recommendations: fallback, source: "fallback" });
  }
});

export { router as aiRoutes };
