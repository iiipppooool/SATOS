import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * `prisma generate` only reads the schema to emit types; it needs no database
 * connection. It also runs from `postinstall`, which on a fresh clone happens
 * before `.env` exists, so a missing DATABASE_URL must not fail `npm install`.
 *
 * Hence the fallback below rather than prisma's `env()` helper, which throws on
 * a missing variable. Commands that genuinely touch the database (migrate,
 * db push, db seed) run after `npm run setup`, by which point `.env` is in
 * place and the real value is used.
 *
 * This fallback cannot silently mask a misconfigured deployment: the
 * application refuses to start without a real DATABASE_URL (see src/lib/db.ts),
 * and the deployment guide sets it explicitly before any migration runs.
 */
const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: { url },
});
