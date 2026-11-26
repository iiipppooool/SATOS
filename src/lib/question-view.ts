import "server-only";
import { prisma } from "./db";
import { parseStringList } from "./json-fields";
import {
  SOURCE_LABEL,
  SOURCE_NOTE,
  UNTRUSTED_SOURCES,
  type QuestionSource,
  type Section,
} from "./domain/enums";

export interface ChoiceView {
  id: string;
  label: string;
  text: string;
}

/** Revealed only after an answer is submitted. */
export interface ChoiceReveal {
  id: string;
  label: string;
  isCorrect: boolean;
  distractorType: string | null;
  /** Null for imported material that arrived without per-option reasoning. */
  rationale: string | null;
}

export interface PatternView {
  patternName: string | null;
  concept: string | null;
  recognitionCues: string[];
  fastestMethod: string | null;
  alternativeMethod: string | null;
  commonTraps: string[];
  relatedConcepts: string[];
  expectedSeconds: number;
}

export interface QuestionView {
  id: string;
  section: Section;
  format: "mcq" | "spr";
  skillId: string;
  skillName: string;
  domainName: string;
  difficulty: number;
  stimulus: string | null;
  stimulusTitle: string | null;
  stem: string;
  choices: ChoiceView[];
  /** Provenance, always surfaced in the UI. */
  source: QuestionSource;
  sourceLabel: string;
  sourceNote: string;
  sourceRef: string | null;
  verified: boolean;
  answerKeyTrusted: boolean;
  pattern: PatternView;
}

export interface QuestionReveal {
  explanation: string;
  choices: ChoiceReveal[];
  acceptedAnswers: string[];
  pattern: PatternView;
}

function toPatternView(question: {
  patternName: string | null;
  concept: string | null;
  recognitionCues: string | null;
  fastestMethod: string | null;
  alternativeMethod: string | null;
  commonTraps: string | null;
  relatedConcepts: string | null;
  expectedSeconds: number;
}): PatternView {
  return {
    patternName: question.patternName,
    concept: question.concept,
    recognitionCues: parseStringList(question.recognitionCues),
    fastestMethod: question.fastestMethod,
    alternativeMethod: question.alternativeMethod,
    commonTraps: parseStringList(question.commonTraps),
    relatedConcepts: parseStringList(question.relatedConcepts),
    expectedSeconds: question.expectedSeconds,
  };
}

const QUESTION_INCLUDE = {
  choices: { orderBy: { order: "asc" } },
  skill: { include: { domain: true } },
} as const;

export async function getQuestionView(questionId: string): Promise<QuestionView | null> {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: QUESTION_INCLUDE,
  });
  if (!question) return null;

  const source = (question.source ?? "original_authored") as QuestionSource;

  return {
    id: question.id,
    section: question.section as Section,
    format: question.format === "spr" ? "spr" : "mcq",
    skillId: question.skillId,
    skillName: question.skill.name,
    domainName: question.skill.domain.name,
    difficulty: question.difficulty,
    stimulus: question.stimulus,
    stimulusTitle: question.stimulusTitle,
    stem: question.stem,
    choices: question.choices.map((choice) => ({
      id: choice.id,
      label: choice.label,
      text: choice.text,
    })),
    source,
    sourceLabel: SOURCE_LABEL[source] ?? source,
    sourceNote: SOURCE_NOTE[source] ?? "",
    sourceRef: question.sourceRef,
    verified: question.verified,
    answerKeyTrusted: !UNTRUSTED_SOURCES.includes(source),
    pattern: toPatternView(question),
  };
}

export async function getQuestionReveal(questionId: string): Promise<QuestionReveal | null> {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { choices: { orderBy: { order: "asc" } } },
  });
  if (!question) return null;

  return {
    explanation: question.explanation,
    acceptedAnswers: parseStringList(question.acceptedAnswers),
    choices: question.choices.map((choice) => ({
      id: choice.id,
      label: choice.label,
      isCorrect: choice.isCorrect,
      distractorType: choice.distractorType,
      rationale: choice.rationale,
    })),
    pattern: toPatternView(question),
  };
}

export async function getQuestionViews(questionIds: string[]): Promise<QuestionView[]> {
  if (questionIds.length === 0) return [];
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    include: QUESTION_INCLUDE,
  });
  const byId = new Map(questions.map((q) => [q.id, q]));

  // Preserve the order the session chose, which is deliberately interleaved.
  return questionIds
    .map((id) => byId.get(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .map((question) => {
      const source = (question.source ?? "original_authored") as QuestionSource;
      return {
        id: question.id,
        section: question.section as Section,
        format: question.format === "spr" ? ("spr" as const) : ("mcq" as const),
        skillId: question.skillId,
        skillName: question.skill.name,
        domainName: question.skill.domain.name,
        difficulty: question.difficulty,
        stimulus: question.stimulus,
        stimulusTitle: question.stimulusTitle,
        stem: question.stem,
        choices: question.choices.map((choice) => ({
          id: choice.id,
          label: choice.label,
          text: choice.text,
        })),
        source,
        sourceLabel: SOURCE_LABEL[source] ?? source,
        sourceNote: SOURCE_NOTE[source] ?? "",
        sourceRef: question.sourceRef,
        verified: question.verified,
        answerKeyTrusted: !UNTRUSTED_SOURCES.includes(source),
        pattern: toPatternView(question),
      };
    });
}

/** The distinct pattern names in the bank, for the trainer's guess list. */
export async function getPatternNames(section?: Section): Promise<string[]> {
  const rows = await prisma.question.findMany({
    where: {
      active: true,
      patternName: { not: null },
      ...(section ? { section } : {}),
    },
    select: { patternName: true },
    distinct: ["patternName"],
    orderBy: { patternName: "asc" },
  });
  return rows
    .map((row) => row.patternName)
    .filter((name): name is string => Boolean(name));
}
