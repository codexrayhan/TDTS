import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { hashPassword, signToken, toClientRole, toDbRole, verifyPassword } from "../auth";

const router = Router();
const credentials = z.object({ email: z.string().email(), password: z.string().min(8) });
const signupInput = credentials.extend({ name: z.string().min(2), role: z.enum(["admin", "super", "employee"]) });

router.post("/login", async (req: any, res: any) => {
  const parsed = credentials.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Enter a valid email and password" });
  const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const clientUser = { id: user.id, name: user.name, email: user.email, role: toClientRole(user.role) };
  return res.json({ token: signToken(clientUser), user: clientUser });
});

router.post("/signup", async (req: any, res: any) => {
  const parsed = signupInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Please complete all signup fields" });
  const email = parsed.data.email.toLowerCase();
  if (await db.user.findUnique({ where: { email } })) return res.status(409).json({ error: "Email already registered" });
  const user = await db.user.create({
    data: {
      email,
      name: parsed.data.name,
      passwordHash: await hashPassword(parsed.data.password),
      role: toDbRole(parsed.data.role),
    },
  });
  const clientUser = { id: user.id, name: user.name, email: user.email, role: toClientRole(user.role) };
  return res.status(201).json({ token: signToken(clientUser), user: clientUser });
});

router.post("/logout", (_req: any, res: any) => res.status(204).end());

export { router as authRoutes };
