"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ErrorCategory } from "@/lib/domain/enums";

const UpdateSchema = z.object({
  entryId: z.string().min(1),
  category: ErrorCategory.optional(),
  note: z.string().max(2000).optional(),
  resolved: z.boolean().optional(),
});

export async function updateErrorEntryAction(
  input: unknown,
): Promise<{ ok: boolean; error?: string }> {
  const user = await requireUser();
  const parsed = UpdateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Could not read that update." };

  const entry = await prisma.errorLogEntry.findFirst({
    where: { id: parsed.data.entryId, userId: user.id },
    select: { id: true },
  });
  if (!entry) return { ok: false, error: "Entry not found." };

  await prisma.errorLogEntry.update({
    where: { id: entry.id },
    data: {
      ...(parsed.data.category ? { category: parsed.data.category } : {}),
      ...(parsed.data.note !== undefined ? { note: parsed.data.note || null } : {}),
      ...(parsed.data.resolved !== undefined
        ? {
            resolved: parsed.data.resolved,
            resolvedAt: parsed.data.resolved ? new Date() : null,
          }
        : {}),
    },
  });

  revalidatePath("/errors");
  return { ok: true };
}

export async function resolveAllClassifiedAction(): Promise<{ ok: boolean; count: number }> {
  const user = await requireUser();
  const result = await prisma.errorLogEntry.updateMany({
    where: { userId: user.id, resolved: false, category: { not: "unknown" } },
    data: { resolved: true, resolvedAt: new Date() },
  });
  revalidatePath("/errors");
  return { ok: true, count: result.count };
}
