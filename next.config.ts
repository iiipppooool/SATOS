import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the Prisma engine out of the client/edge bundles.
  serverExternalPackages: [
    "@prisma/client",
    ".prisma/client",
    // Both driver adapters are resolved at runtime (see src/lib/prisma-adapter.ts);
    // keeping them external stops the bundler pulling better-sqlite3's native
    // binding into a Postgres deployment.
    "@prisma/adapter-pg",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
    "pg",
  ],
  experimental: {
    // Server Actions carry question payloads and AI prompts; 2 MB is ample.
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
