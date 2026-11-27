import { createRequire } from "node:module";
import type { SqlDriverAdapterFactory } from "@prisma/driver-adapter-utils";

/**
 * Picks the Prisma driver adapter from the shape of DATABASE_URL, so the same
 * build runs on SQLite locally and on Postgres in production.
 *
 * The adapters are loaded through `createRequire` with a computed specifier
 * rather than a static `import`. A static import of
 * `@prisma/adapter-better-sqlite3` would load better-sqlite3's native binding
 * at module load even on a Postgres deployment, and a missing or
 * wrong-platform binding would then crash the server on the first request.
 * Loading only the one in use means a serverless deployment never touches the
 * native module at all.
 */
const nodeRequire = createRequire(import.meta.url);

export type DbProvider = "sqlite" | "postgresql";

export function providerForUrl(url: string): DbProvider {
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) return "postgresql";
  if (url.startsWith("file:")) return "sqlite";
  throw new Error(
    `DATABASE_URL has an unsupported scheme: ${url.split(":")[0]}:. ` +
      "SAT OS supports file: (SQLite) and postgresql:.",
  );
}

export function createAdapter(url: string): SqlDriverAdapterFactory {
  if (providerForUrl(url) === "postgresql") {
    const { PrismaPg } = nodeRequire("@prisma/adapter-pg") as typeof import("@prisma/adapter-pg");
    // TLS is left to the connection string. Managed Postgres providers expect
    // `?sslmode=require`, which node-postgres honours with full certificate
    // verification; the deployment guide spells that out.
    return new PrismaPg({ connectionString: url });
  }
  const { PrismaBetterSqlite3 } = nodeRequire(
    "@prisma/adapter-better-sqlite3",
  ) as typeof import("@prisma/adapter-better-sqlite3");
  return new PrismaBetterSqlite3({ url });
}
