import { PrismaClient } from "@/generated/prisma/client";
import { createAdapter } from "./prisma-adapter";

/**
 * Prisma 7 requires an explicit driver adapter. Which one is used follows from
 * DATABASE_URL (see src/lib/prisma-adapter.ts), so moving from the local
 * SQLite file to Postgres is a change of environment variable, not of code.
 */
function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and run `npm run setup`.",
    );
  }
  return new PrismaClient({
    adapter: createAdapter(url),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

// Next.js dev server reloads modules on every edit; without this a new pool
// would be opened on each reload until SQLite starts refusing connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
