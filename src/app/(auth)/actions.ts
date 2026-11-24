"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  endSession,
  hashPassword,
  signupAllowed,
  startSession,
  verifyPassword,
} from "@/lib/auth";

export interface AuthState {
  error?: string;
}

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .pipe(z.email("Enter a valid email address.")),
  password: z.string().min(1, "Enter your password."),
});

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  // Identical message whether the account is missing or the password is wrong,
  // so this endpoint cannot be used to enumerate accounts.
  const genericError = { error: "Those details do not match an account." };
  if (!user) return genericError;

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return genericError;

  await startSession({ userId: user.id, email: user.email });
  redirect("/dashboard");
}

const SignupSchema = z
  .object({
    name: z.string().trim().max(80).optional(),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email address.")
      .pipe(z.email("Enter a valid email address.")),
    password: z.string().min(10, "Use at least 10 characters."),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "The two passwords do not match.",
    path: ["confirm"],
  });

export async function signupAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!(await signupAllowed())) {
    return { error: "Signup is closed. An account already exists on this instance." };
  }

  const parsed = SignupSchema.safeParse({
    name: formData.get("name") || undefined,
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with that email already exists." };

  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name ?? null,
      passwordHash: await hashPassword(parsed.data.password),
      role: "admin",
      settings: { create: {} },
    },
  });

  await prisma.questionCollection.createMany({
    data: [
      {
        userId: user.id,
        name: "Starred",
        description: "Questions you marked to revisit.",
        system: true,
      },
      {
        userId: user.id,
        name: "Needs another look",
        description: "Questions you got wrong and have not yet resolved.",
        system: true,
      },
    ],
  });

  await startSession({ userId: user.id, email: user.email });
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/login");
}
