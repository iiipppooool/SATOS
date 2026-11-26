"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { importQuestions, type ImportResult } from "@/lib/import";
import { QuestionSource } from "@/lib/domain/enums";

const FormSchema = z.object({
  name: z.string().trim().min(1, "Give the import a name.").max(120),
  source: QuestionSource,
  sourceRef: z.string().trim().max(300).optional(),
  licenceNote: z.string().trim().max(500).optional(),
  payload: z.string().min(2, "Paste the JSON, or choose a file."),
  dryRun: z.boolean().default(false),
  confirmRights: z.boolean(),
});

export interface ImportState {
  error?: string;
  result?: ImportResult;
}

export async function importAction(
  _prev: ImportState,
  formData: FormData,
): Promise<ImportState> {
  const user = await requireUser();

  const parsed = FormSchema.safeParse({
    name: formData.get("name"),
    source: formData.get("source"),
    sourceRef: formData.get("sourceRef") || undefined,
    licenceNote: formData.get("licenceNote") || undefined,
    payload: formData.get("payload"),
    dryRun: formData.get("dryRun") === "on",
    confirmRights: formData.get("confirmRights") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the import form." };
  }

  if (!parsed.data.confirmRights) {
    return {
      error:
        "Confirm that you hold a licence to this material before importing it. This instance is private, but that does not make copying someone else's questions lawful.",
    };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(parsed.data.payload);
  } catch {
    return { error: "That is not valid JSON. Check for a trailing comma or a missing bracket." };
  }

  const result = await importQuestions(payload, {
    userId: user.id,
    name: parsed.data.name,
    source: parsed.data.source,
    sourceRef: parsed.data.sourceRef,
    licenceNote: parsed.data.licenceNote,
    dryRun: parsed.data.dryRun,
  });

  if (!parsed.data.dryRun && result.imported > 0) {
    revalidatePath("/bank");
    revalidatePath("/practice");
  }

  return { result };
}
