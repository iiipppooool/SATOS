import { z } from "zod";
import { ImportRowSchema } from "../import-schema";

/**
 * Turning model output into bank questions.
 *
 * The model is asked for strict JSON matching the importer's own row schema,
 * so generated questions go through exactly the same validation as a file the
 * owner uploads. Nothing bypasses it: a generated item with three options, or
 * two correct answers, or an unknown skill id, is rejected the same way.
 *
 * Generated questions are always stored with source=ai_generated and
 * verified=false, which makes the answer-key warning appear during practice.
 * That is deliberate and must not be loosened: a model's answer key is a guess,
 * and a wrong key that a student trusts teaches the wrong method.
 */

export const GenerationResponseSchema = z.object({
  questions: z.array(z.unknown()).min(1),
});

export interface GenerationOutcome {
  accepted: Array<z.output<typeof ImportRowSchema>>;
  rejected: Array<{ index: number; errors: string[] }>;
  /** Raw text, kept so a parse failure can be shown rather than swallowed. */
  raw: string;
}

export function parseGeneratedQuestions(raw: string): GenerationOutcome {
  const accepted: GenerationOutcome["accepted"] = [];
  const rejected: GenerationOutcome["rejected"] = [];

  const json = extractJson(raw);
  if (json === null) {
    return {
      accepted,
      rejected: [{ index: -1, errors: ["The model did not return valid JSON."] }],
      raw,
    };
  }

  const payload = GenerationResponseSchema.safeParse(json);
  if (!payload.success) {
    return {
      accepted,
      rejected: [
        { index: -1, errors: ['Expected an object of the form { "questions": [ ... ] }.'] },
      ],
      raw,
    };
  }

  payload.data.questions.forEach((row, index) => {
    const parsed = ImportRowSchema.safeParse(row);
    if (parsed.success) accepted.push(parsed.data);
    else {
      rejected.push({
        index,
        errors: parsed.error.issues.map(
          (issue) => `${issue.path.join(".") || "row"}: ${issue.message}`,
        ),
      });
    }
  });

  return { accepted, rejected, raw };
}

/**
 * Models wrap JSON in prose or fences more often than not, so the object is
 * extracted rather than assuming the whole reply parses.
 */
export function extractJson(raw: string): unknown {
  const trimmed = raw.trim();

  const direct = tryParse(trimmed);
  if (direct !== undefined) return direct;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) {
    const parsed = tryParse(fenced[1].trim());
    if (parsed !== undefined) return parsed;
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const parsed = tryParse(trimmed.slice(firstBrace, lastBrace + 1));
    if (parsed !== undefined) return parsed;
  }

  return null;
}

function tryParse(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

export interface GenerationRequest {
  skillId: string;
  skillName: string;
  domainName: string;
  section: "reading_writing" | "math";
  difficulty: number;
  count: number;
  /** Patterns the student already struggles with, to aim the generation. */
  weakPatterns: string[];
}

export function buildGenerationPrompt(request: GenerationRequest): string {
  const isMaths = request.section === "math";

  return `Write ${request.count} new SAT practice questions for one specific skill.

Skill: ${request.skillName}
Domain: ${request.domainName}
Section: ${isMaths ? "Maths" : "Reading and Writing"}
Target difficulty: ${request.difficulty} on a 1 to 5 scale, where 5 is the hardest band on the test
${request.weakPatterns.length > 0 ? `The student repeatedly misses these patterns, so prefer them: ${request.weakPatterns.join("; ")}` : ""}

Return ONLY a JSON object, with no prose before or after it, in exactly this shape:

{
  "questions": [
    {
      "skillId": "${request.skillId}",
      "format": ${isMaths ? '"mcq" or "spr"' : '"mcq"'},
      "difficulty": ${request.difficulty},
      "stem": "the question itself",
      ${isMaths ? '"acceptedAnswers": ["7", "7.0"],   // spr only; omit for mcq\n      ' : ""}"choices": [
        { "label": "A", "text": "...", "isCorrect": false, "distractorType": "sign_error", "rationale": "why a student picks this" },
        { "label": "B", "text": "...", "isCorrect": true, "rationale": "why this is right" },
        { "label": "C", "text": "...", "isCorrect": false, "distractorType": "partial_solution", "rationale": "..." },
        { "label": "D", "text": "...", "isCorrect": false, "distractorType": "wrong_operation", "rationale": "..." }
      ],
      "explanation": "how to solve it, naming the step students get wrong",
      "patternName": "a short name for the question type",
      "concept": "the underlying concept",
      "recognitionCues": ["how to spot this question type", "a second cue"],
      "fastestMethod": "the fastest reliable method",
      "commonTraps": ["a trap", "a second trap"],
      "expectedSeconds": 60${isMaths ? "" : ',\n      "stimulus": "the passage, if the question needs one",\n      "stimulusTitle": "Passage"'}
    }
  ]
}

Rules you must follow or the question will be rejected:
- An mcq needs exactly four options, labelled A to D, with exactly one isCorrect true.
- An spr needs acceptedAnswers and no choices at all. Only Maths questions may be spr.
- Every incorrect option needs a distractorType and a rationale. Use one of:
  sign_error, partial_solution, reciprocal, swapped_values, off_by_one,
  wrong_operation, unit_error, plausible_paraphrase, too_broad, too_narrow,
  true_but_irrelevant, wrong_relationship, comma_splice, fragment,
  agreement_error, misplaced_modifier, tense_shift, redundant, run_on,
  unnecessary_comma, possessive_error, parallelism_error, comparison_error,
  essential_clause, pronoun_case, number_agreement, wrong_idiom, circular,
  subject_verb_split.
- Every distractor must be genuinely wrong, and no two options may be equivalent.
- Write maths in plain text: x^2, sqrt(5), 3/4. No LaTeX.
- Use British spelling. Write any passage yourself; do not reproduce published text.
- These are practice questions you have written. They are not real or past SAT
  questions, and must not be presented as such.
- Check your own answer key before returning it. A wrong key is worse than no
  question at all.`;
}

export const DIGEST_PROMPT_HEADER = `Write a short digest of this student's recurring SAT mistakes.

Be specific and direct. Name the single highest-value change, say what practice
would fix it, and say plainly if the pattern suggests they are avoiding a
weakness. No praise, no filler, no restating the data back at them. Under 250
words. British spelling.`;
