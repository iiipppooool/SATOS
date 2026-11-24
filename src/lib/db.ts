import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

/**
 * Prisma 7 requires an explicit driver adapter. Swapping database engines is a
 * two-line change here plus the `provider` in prisma/schema.prisma:
 *
 *   import { PrismaPg } from "@prisma/adapter-pg";
 *   const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
 *
 * Nothing else in the application touches the driver.
 */
function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and run `npm run setup`.",
    );
  }
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({
    adapter,
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
