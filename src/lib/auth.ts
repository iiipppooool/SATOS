import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { compare, hash } from "bcryptjs";
import { prisma } from "./db";

const COOKIE_NAME = "satos_session";
const SESSION_DAYS = 30;

function secret(): Uint8Array {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Generate one with:\n" +
        '  node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64url\'))"',
    );
  }
  return new TextEncoder().encode(value);
}

export interface SessionPayload {
  userId: string;
  email: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    if (typeof payload.userId !== "string" || typeof payload.email !== "string") return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    // Expired, tampered with, or signed under an old secret. All mean no session.
    return null;
  }
}

export async function startSession(payload: SessionPayload): Promise<void> {
  const token = await createSessionToken(payload);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  settings: {
    theme: string;
    targetScore: number;
    testDate: Date | null;
    dailyMinutes: number;
    studyDaysPerWeek: number;
    timezone: string;
    aiProvider: string;
    aiModel: string | null;
    aiEnabled: boolean;
    recognitionTimeoutSec: number;
  };
};

const DEFAULT_SETTINGS: CurrentUser["settings"] = {
  theme: "dark",
  targetScore: 1550,
  testDate: null,
  dailyMinutes: 105,
  studyDaysPerWeek: 6,
  timezone: "Europe/London",
  aiProvider: "anthropic",
  aiModel: null,
  aiEnabled: true,
  recognitionTimeoutSec: 20,
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { settings: true },
  });
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    settings: user.settings
      ? {
          theme: user.settings.theme,
          targetScore: user.settings.targetScore,
          testDate: user.settings.testDate,
          dailyMinutes: user.settings.dailyMinutes,
          studyDaysPerWeek: user.settings.studyDaysPerWeek,
          timezone: user.settings.timezone,
          aiProvider: user.settings.aiProvider,
          aiModel: user.settings.aiModel,
          aiEnabled: user.settings.aiEnabled,
          recognitionTimeoutSec: user.settings.recognitionTimeoutSec,
        }
      : DEFAULT_SETTINGS,
  };
}

/**
 * For server actions and route handlers. Throws rather than redirecting so a
 * caller cannot accidentally continue with no user.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in.");
  return user;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash);
}

/** Signup is open only while no account exists, or while ALLOW_SIGNUP is set. */
export async function signupAllowed(): Promise<boolean> {
  if (process.env.ALLOW_SIGNUP === "true") return true;
  const count = await prisma.user.count();
  return count === 0;
}

export async function userCount(): Promise<number> {
  return prisma.user.count();
}
