import { PrismaClient } from "@prisma/client";
import { ensureDatabaseUrl, getServerEnv } from "./env";

ensureDatabaseUrl();

const globalForPrisma = globalThis as unknown as { tdtsPrisma?: PrismaClient };

const { DATABASE_URL } = getServerEnv();

export const db = globalForPrisma.tdtsPrisma ?? new PrismaClient({ datasourceUrl: DATABASE_URL });

if ((globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV !== "production") {
  globalForPrisma.tdtsPrisma = db;
}
