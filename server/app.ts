import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { tasksRoutes } from "./routes/tasks.routes";
import { employeesRoutes } from "./routes/employees.routes";
import { rewardsRoutes } from "./routes/rewards.routes";
import { leaderboardRoutes } from "./routes/leaderboard.routes";
import { aiRoutes } from "./routes/ai.routes";

export const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req: any, res: any) => res.json({ ok: true, service: "tdts-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api", (_req: any, res: any) => res.status(404).json({ error: "API route not found" }));
