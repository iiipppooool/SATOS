import { jwtVerify } from "jose";

/**
 * Edge-safe half of the session logic. The middleware runs in the edge
 * runtime, where bcryptjs and the Prisma client are unavailable, so token
 * verification lives here with no Node-only imports.
 */

export interface SessionPayload {
  userId: string;
  email: string;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(value), {
      algorithms: ["HS256"],
    });
    if (typeof payload.userId !== "string" || typeof payload.email !== "string") return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}
