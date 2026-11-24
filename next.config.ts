import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the Prisma engine out of the client/edge bundles.
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  experimental: {
    // Server Actions carry question payloads and AI prompts; 2 MB is ample.
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
