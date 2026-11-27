/**
 * Prisma's datasource `provider` has to live in the schema file: it cannot be
 * read from an environment variable and `prisma.config.ts` does not accept it.
 * The models themselves are provider-agnostic (no native enums, no scalar
 * lists), so the only thing that has to change between SQLite and Postgres is
 * that one line.
 *
 * This script rewrites it to match DATABASE_URL before `prisma generate` runs.
 * Locally the URL is a `file:` one, so it writes "sqlite" -- the value already
 * committed, which leaves the working tree clean. On a Postgres deployment it
 * writes "postgresql" into the ephemeral checkout.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = resolve(root, "prisma/schema.prisma");

function providerFor(url) {
  if (!url) return "sqlite";
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) return "postgresql";
  if (url.startsWith("file:")) return "sqlite";
  throw new Error(
    `DATABASE_URL has an unsupported scheme: ${url.split(":")[0]}:. ` +
      "SAT OS supports file: (SQLite) and postgresql:.",
  );
}

// Read .env when present so `npm run build` behaves the same as the app, but do
// not overwrite a value the platform already injected (Vercel sets it directly).
if (!process.env.DATABASE_URL) {
  try {
    const env = readFileSync(resolve(root, ".env"), "utf8");
    const line = env.split(/\r?\n/).find((l) => /^\s*DATABASE_URL\s*=/.test(l));
    if (line) {
      process.env.DATABASE_URL = line.replace(/^\s*DATABASE_URL\s*=\s*/, "").replace(/^["']|["']$/g, "");
    }
  } catch {
    // No .env yet: fall through to the SQLite default.
  }
}

const provider = providerFor(process.env.DATABASE_URL);
const schema = readFileSync(schemaPath, "utf8");
const pattern = /(datasource db \{[^}]*?provider\s*=\s*)"[a-z0-9]+"/;

if (!pattern.test(schema)) {
  throw new Error("Could not find the datasource provider in prisma/schema.prisma.");
}

const updated = schema.replace(pattern, `$1"${provider}"`);
if (updated !== schema) {
  writeFileSync(schemaPath, updated);
  console.log(`prisma/schema.prisma: datasource provider set to "${provider}"`);
} else {
  console.log(`prisma/schema.prisma: datasource provider already "${provider}"`);
}
