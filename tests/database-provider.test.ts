import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { providerForUrl } from "../src/lib/prisma-adapter";

/**
 * The deployment story rests on one invariant: the driver adapter chosen at
 * runtime and the datasource provider written into the schema at build time are
 * derived from the same DATABASE_URL, by two separate pieces of code. If they
 * ever disagree, the app generates a client for one engine and then talks to
 * the other, which fails at the first query rather than at build time.
 */
describe("provider selection", () => {
  it("maps SQLite file URLs to sqlite", () => {
    expect(providerForUrl("file:./prisma/dev.db")).toBe("sqlite");
    expect(providerForUrl("file:/var/data/satos.db")).toBe("sqlite");
  });

  it("maps both Postgres URL schemes to postgresql", () => {
    expect(providerForUrl("postgresql://u:p@host:5432/satos?sslmode=require")).toBe("postgresql");
    expect(providerForUrl("postgres://u:p@host:6543/satos")).toBe("postgresql");
  });

  it("refuses a scheme it has no adapter for, rather than guessing", () => {
    expect(() => providerForUrl("mysql://u:p@host:3306/satos")).toThrow(/unsupported scheme/i);
    expect(() => providerForUrl("libsql://satos.turso.io")).toThrow(/unsupported scheme/i);
  });

  it("agrees with the build-time script for every supported scheme", async () => {
    // Import the script's logic by reading it rather than executing it: the
    // script writes to the schema file as a side effect of running.
    const source = readFileSync(resolve(__dirname, "../scripts/set-db-provider.mjs"), "utf8");
    const body = source.slice(
      source.indexOf("function providerFor(url) {"),
      source.indexOf("// Read .env when present"),
    );
    expect(body).toContain("providerFor");
    const providerFor = new Function(`${body}; return providerFor;`)() as (u: string) => string;

    for (const url of [
      "file:./prisma/dev.db",
      "postgresql://u:p@host:5432/satos?sslmode=require",
      "postgres://u:p@host:6543/satos",
    ]) {
      expect(providerFor(url)).toBe(providerForUrl(url));
    }
  });

  it("keeps the committed schema on sqlite, so a fresh clone needs no database server", () => {
    const schema = readFileSync(resolve(__dirname, "../prisma/schema.prisma"), "utf8");
    expect(schema).toMatch(/datasource db \{[^}]*provider\s*=\s*"sqlite"/);
  });
});
