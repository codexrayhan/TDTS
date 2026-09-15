import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getServerEnv } from "./env";

export type TokenUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super" | "employee";
};

export function toClientRole(role: string): TokenUser["role"] {
  if (role === "SUPER_ADMIN") return "super";
  if (role === "EMPLOYEE") return "employee";
  return "admin";
}

export function toDbRole(role: TokenUser["role"]) {
  if (role === "super") return "SUPER_ADMIN" as const;
  if (role === "employee") return "EMPLOYEE" as const;
  return "ADMIN" as const;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(user: TokenUser) {
  return jwt.sign(user, getServerEnv().JWT_SECRET, { algorithm: "HS256", expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, getServerEnv().JWT_SECRET, { algorithms: ["HS256"] }) as TokenUser & { exp: number };
}

export function requireAuth(req: any, res: any, next: any) {
  const header = String(req.headers?.authorization || "");
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Authentication required" });
  try {
    req.user = verifyToken(token);
    return next();
  } catch {
    return res.status(401).json({ error: "Session expired" });
  }
}
