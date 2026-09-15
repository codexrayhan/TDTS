import { resolve } from "node:path";

const DEFAULT_DATABASE_URL = "file:./dev.db";

type ProcessLike = {
  env?: Record<string, string | undefined>;
  cwd?: () => string;
};

function getProcessLike(): ProcessLike | undefined {
  return (globalThis as { process?: ProcessLike }).process;
}

/**
 * Resolve a `file:`-prefixed SQLite DATABASE_URL to an absolute path so the
 * Prisma client at runtime reads the same database file the Prisma CLI
 * created (the CLI resolves `file:./dev.db` relative to the schema directory,
 * i.e. `prisma/`).
 *
 * - Absolute file paths are returned unchanged.
 * - Non-`file:` URLs (e.g. `postgresql://...`) are returned unchanged.
 * - Relative `file:./dev.db` becomes `file:/abs/cwd/prisma/dev.db`.
 */
export function resolveDatabaseUrl(value = DEFAULT_DATABASE_URL) {
  if (!value.startsWith("file:")) return value;

  const filePath = value.slice("file:".length);
  const isAbsolute = filePath.startsWith("/") || /^[A-Za-z]:[\\/]/.test(filePath);
  if (isAbsolute) return value;

  const relativePath = filePath.replace(/^\.\//, "");
  const cwd = getProcessLike()?.cwd?.() ?? ".";
  const absolutePath = resolve(cwd, "prisma", relativePath);
  return `file:${absolutePath}`;
}

export function getServerEnv() {
  const env = getProcessLike()?.env ?? {};
  return {
    DATABASE_URL: resolveDatabaseUrl(env.DATABASE_URL || DEFAULT_DATABASE_URL),
    JWT_SECRET: env.JWT_SECRET || "tdts-development-secret-change-me",
    OPENAI_API_KEY: env.OPENAI_API_KEY || "",
    PORT: Number(env.PORT || 8787),
  };
}

export function ensureDatabaseUrl() {
  const processLike = getProcessLike();
  if (!processLike?.env) return;
  processLike.env.DATABASE_URL = resolveDatabaseUrl(processLike.env.DATABASE_URL || DEFAULT_DATABASE_URL);
}
