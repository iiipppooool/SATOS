import "server-only";
import type { z } from "zod";
import { prisma } from "./db";
import { ALL_SKILLS } from "./domain/taxonomy";
import type { QuestionSource } from "./domain/enums";
import { serialiseStringList } from "./json-fields";
import { ImportPayloadSchema, ImportRowSchema, type ImportRow } from "./import-schema";

export { ImportPayloadSchema, ImportRowSchema };
export type { ImportRow };

/**
 * Import pipeline for question material the owner already holds a licence to.
 *
 * This exists because the lawful way to grow the bank is to bring in your own
 * copies of Official Practice Tests, Khan Academy sets and prep books, not to
 * scrape them. Provenance travels with every row and is never silently
 * upgraded: an import marked as recalled stays marked as recalled.
 */

export interface RowError {
  index: number;
  stem: string;
  errors: string[];
}

export interface ImportResult {
  batchId: string | null;
  seen: number;
  imported: number;
  rejected: number;
  rowErrors: RowError[];
}

export interface ImportOptions {
  userId: string;
  name: string;
  source: QuestionSource;
  sourceRef?: string;
  licenceNote?: string;
  notes?: string;
  /** When true, validate and report but write nothing. */
  dryRun?: boolean;
}

/**
 * Sources whose text we must not store verbatim without the owner confirming
 * they hold a licence. The flag is recorded so the UI can warn, and so a
 * future export can exclude restricted bodies.
 */
function isRestricted(source: QuestionSource): boolean {
  return source === "official_practice" || source === "third_party";
}

export async function importQuestions(
  raw: unknown,
  options: ImportOptions,
): Promise<ImportResult> {
  const payload = ImportPayloadSchema.safeParse(raw);
  if (!payload.success) {
    return {
      batchId: null,
      seen: 0,
      imported: 0,
      rejected: 0,
      rowErrors: [
        {
          index: -1,
          stem: "",
          errors: [
            payload.error.issues[0]?.message ??
              'The file must be JSON of the form { "questions": [ ... ] }.',
          ],
        },
      ],
    };
  }

  const rows = payload.data.questions;
  const valid: Array<z.output<typeof ImportRowSchema>> = [];
  const rowErrors: RowError[] = [];

  rows.forEach((row, index) => {
    const parsed = ImportRowSchema.safeParse(row);
    if (parsed.success) {
      valid.push(parsed.data);
      return;
    }
    const stem =
      row !== null && typeof row === "object" && "stem" in row
        ? String((row as { stem?: unknown }).stem ?? "").slice(0, 80)
        : "";
    rowErrors.push({
      index,
      stem,
      errors: parsed.error.issues.map(
        (issue) => `${issue.path.join(".") || "row"}: ${issue.message}`,
      ),
    });
  });

  if (options.dryRun) {
    return {
      batchId: null,
      seen: rows.length,
      imported: 0,
      rejected: rowErrors.length,
      rowErrors,
    };
  }

  if (valid.length === 0) {
    return {
      batchId: null,
      seen: rows.length,
      imported: 0,
      rejected: rowErrors.length,
      rowErrors,
    };
  }

  const batch = await prisma.importBatch.create({
    data: {
      userId: options.userId,
      name: options.name,
      source: options.source,
      sourceRef: options.sourceRef ?? null,
      licenceNote: options.licenceNote ?? null,
      notes: options.notes ?? null,
      rowsSeen: rows.length,
      rowsImported: 0,
      rowsRejected: rowErrors.length,
      report: rowErrors.length > 0 ? JSON.stringify(rowErrors) : null,
    },
  });

  const skillSection = new Map(ALL_SKILLS.map((s) => [s.id, s.section]));
  let imported = 0;

  for (const row of valid) {
    const created = await prisma.question.create({
      data: {
        skillId: row.skillId,
        section: skillSection.get(row.skillId) ?? "math",
        format: row.format,
        stimulus: row.stimulus ?? null,
        stimulusTitle: row.stimulusTitle ?? null,
        stem: row.stem,
        acceptedAnswers: serialiseStringList(row.acceptedAnswers),
        difficulty: row.difficulty,
        explanation: row.explanation || "No explanation was supplied with this import.",
        patternName: row.patternName ?? null,
        concept: row.concept ?? null,
        recognitionCues: serialiseStringList(row.recognitionCues),
        fastestMethod: row.fastestMethod ?? null,
        alternativeMethod: row.alternativeMethod ?? null,
        commonTraps: serialiseStringList(row.commonTraps),
        expectedSeconds: row.expectedSeconds,
        source: options.source,
        sourceRef: row.sourceRef ?? options.sourceRef ?? null,
        sourceUrl: row.sourceUrl ?? null,
        licenceNote: options.licenceNote ?? null,
        // Imports are never auto-marked verified. Only a human says that.
        verified: false,
        restrictedText: isRestricted(options.source),
        testAdministration: row.testAdministration ?? null,
        authorId: options.userId,
        importBatchId: batch.id,
      },
    });

    if (row.format === "mcq" && row.choices) {
      await prisma.choice.createMany({
        data: row.choices.map((choice, order) => ({
          questionId: created.id,
          label: choice.label,
          text: choice.text,
          isCorrect: choice.isCorrect,
          distractorType: choice.distractorType ?? null,
          rationale: choice.rationale ?? null,
          order,
        })),
      });
    }

    imported += 1;
  }

  await prisma.importBatch.update({
    where: { id: batch.id },
    data: { rowsImported: imported },
  });

  return {
    batchId: batch.id,
    seen: rows.length,
    imported,
    rejected: rowErrors.length,
    rowErrors,
  };
}

export { IMPORT_TEMPLATE } from "./import-template";
