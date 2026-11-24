import type { TutorIntent } from "../domain/enums";
import type { QuestionView, QuestionReveal } from "../question-view";

/**
 * Tutor prompting.
 *
 * Two rules run through all of these. First, the tutor must never claim that
 * something it produces is an official College Board question: the platform
 * labels AI output as AI output, and the prompt reinforces it. Second, it
 * should teach the fastest reliable method rather than a clever trick that
 * collapses under pressure, because the student is aiming at a score band
 * where consistency matters more than speed.
 */

export const TUTOR_SYSTEM_PROMPT = `You are an SAT tutor inside a private study platform called SAT OS. You are helping one student who is aiming for a 1550 or above on the digital SAT.

How to answer:
- Be concise and concrete. Lead with the answer or the method, then the reasoning.
- Teach the fastest method that is still reliable under time pressure. If a shortcut only works in special cases, say exactly when it fails.
- When the student got something wrong, identify the specific misstep rather than re-explaining the whole topic.
- Use British spelling.
- Write plainly. No motivational filler, no praise, no emoji.
- Mathematics should be written in plain text that reads cleanly without a renderer: write x^2, sqrt(5), 3/4 and so on.

Hard rules you must not break:
- Never claim that a question you write is a real, official or past College Board SAT question. Anything you generate is practice material written for this student, and you should say so if it comes up.
- Never invent statistics about the SAT, scoring tables, curve data or question distributions. If you do not know, say so.
- If you are unsure whether an answer key is right, say that explicitly rather than asserting it.
- Do not tell the student a score is guaranteed or predictable. Score estimates in this platform are estimates.`;

function describeQuestion(question: QuestionView, reveal?: QuestionReveal | null): string {
  const lines: string[] = [];
  lines.push(`Section: ${question.section === "math" ? "Maths" : "Reading and Writing"}`);
  lines.push(`Skill: ${question.skillName} (${question.domainName})`);
  lines.push(`Authored difficulty: ${question.difficulty} of 5`);
  if (question.pattern.patternName) lines.push(`Pattern: ${question.pattern.patternName}`);
  if (question.stimulus) {
    lines.push(`\nStimulus:\n${question.stimulus}`);
  }
  lines.push(`\nQuestion:\n${question.stem}`);

  if (question.format === "mcq" && question.choices.length > 0) {
    lines.push("\nOptions:");
    for (const choice of question.choices) {
      const revealed = reveal?.choices.find((c) => c.id === choice.id);
      const marker = revealed?.isCorrect ? " [correct]" : "";
      lines.push(`${choice.label}. ${choice.text}${marker}`);
    }
  }

  if (reveal) {
    if (reveal.acceptedAnswers.length > 0) {
      lines.push(`\nAccepted answers: ${reveal.acceptedAnswers.join(", ")}`);
    }
    lines.push(`\nPlatform explanation:\n${reveal.explanation}`);
  }

  if (question.pattern.commonTraps.length > 0) {
    lines.push(`\nKnown traps: ${question.pattern.commonTraps.join("; ")}`);
  }

  if (!question.answerKeyTrusted) {
    lines.push(
      `\nProvenance warning: this item is ${question.sourceLabel}. Its answer key has not been verified, so check the reasoning rather than assuming the key is right.`,
    );
  }

  return lines.join("\n");
}

export interface TutorContext {
  question?: QuestionView | null;
  reveal?: QuestionReveal | null;
  /** What the student actually chose or typed, when known. */
  studentAnswer?: string | null;
  studentWasCorrect?: boolean | null;
  /** Recent recurring mistakes, for the mistake-review intent. */
  mistakeSummary?: string | null;
}

export function buildTutorPrompt(
  intent: TutorIntent,
  userMessage: string,
  context: TutorContext,
): string {
  const parts: string[] = [];

  if (context.question) {
    parts.push("Here is the question in front of the student:\n");
    parts.push(describeQuestion(context.question, context.reveal));
  }

  if (context.studentAnswer) {
    parts.push(
      `\nThe student answered: ${context.studentAnswer}${
        context.studentWasCorrect === false
          ? " (incorrect)"
          : context.studentWasCorrect === true
            ? " (correct)"
            : ""
      }`,
    );
  }

  if (context.mistakeSummary) {
    parts.push(`\nThe student's recent error pattern:\n${context.mistakeSummary}`);
  }

  parts.push(`\n${INTENT_INSTRUCTION[intent]}`);

  if (userMessage.trim()) {
    parts.push(`\nThe student asks: ${userMessage.trim()}`);
  }

  return parts.join("\n");
}

const INTENT_INSTRUCTION: Record<TutorIntent, string> = {
  explain:
    "Explain how to solve this, step by step. Keep it to the steps that matter, and name the one step where students usually go wrong.",
  why_wrong:
    "Explain why each incorrect option is wrong, one line each. Be specific about the misunderstanding that would lead someone to pick it, rather than just restating that it is wrong.",
  similar:
    "Write one new practice question that tests the same skill and pattern at the same difficulty, with different numbers or content. Give the four options, state the correct answer, and explain it briefly. Begin your reply by stating plainly that this is a practice question you have written, not an official SAT question.",
  harder:
    "Write one new practice question that tests the same skill but is a step harder, for example by adding a second step or a less obvious setup. Give the options, the answer and a brief explanation. Begin by stating plainly that this is a practice question you have written, not an official SAT question.",
  shortcut:
    "Show the fastest reliable method for this question type. State how long it should take, and state explicitly the conditions under which the shortcut stops working and the slower method is needed.",
  mistake_review:
    "Look at the error pattern described above and identify what is actually going wrong. Name the single highest-value change the student should make, and say what practice would fix it. Be direct if the pattern suggests the student is avoiding a weakness.",
  free: "Answer the student's question directly.",
};

/** Compact summary of recent errors, used by the mistake-review intent. */
export function summariseMistakes(
  rows: Array<{ category: string; skillName: string; count: number }>,
): string {
  if (rows.length === 0) return "No classified errors recorded yet.";
  return rows
    .map((row) => `- ${row.count} x ${row.category.replace(/_/g, " ")} on ${row.skillName}`)
    .join("\n");
}
