"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  Flag,
  Lightbulb,
  SkipForward,
  Star,
  Timer,
  X,
} from "lucide-react";
import type { QuestionReveal, QuestionView } from "@/lib/question-view";
import {
  classifyErrorAction,
  submitAnswerAction,
  toggleStarAction,
  type AnswerResult,
} from "@/app/(app)/practice/actions";
import {
  DISTRACTOR_TYPE_LABEL,
  ERROR_CATEGORY_FIX,
  ERROR_CATEGORY_LABEL,
  SECTION_LABEL,
  type Confidence,
  type ErrorCategory,
} from "@/lib/domain/enums";
import { Badge, Button, Card, CardBody, Divider, Notice, ProgressBar } from "@/components/ui";
import { Stimulus } from "@/components/stimulus";
import { cn } from "@/lib/cn";

const ERROR_CATEGORIES: ErrorCategory[] = [
  "concept_gap",
  "misread",
  "careless_arithmetic",
  "trap_choice",
  "time_pressure",
  "guessed",
  "notation",
];

function formatClock(ms: number): string {
  const total = Math.floor(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export interface RunnerProps {
  sessionId: string;
  question: QuestionView;
  index: number;
  total: number;
  requirePatternGuess: boolean;
  patternOptions: string[];
  starred: boolean;
  /** Finishes the session and sends the student to the summary. */
  onFinish: () => void;
}

export function QuestionRunner({
  sessionId,
  question,
  index,
  total,
  requirePatternGuess,
  patternOptions,
  starred: initialStarred,
  onFinish,
}: RunnerProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [elapsed, setElapsed] = useState(0);
  // Set on mount rather than during render: reading the clock while rendering
  // is impure, and the value would be recomputed on every re-render anyway.
  const startedAt = useRef<number>(0);
  const recognisedAt = useRef<number | null>(null);

  const [stage, setStage] = useState<"recognise" | "solve" | "revealed">(
    requirePatternGuess ? "recognise" : "solve",
  );
  const [patternGuess, setPatternGuess] = useState<string>("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [starred, setStarred] = useState(initialStarred);
  const [classified, setClassified] = useState<ErrorCategory | null>(null);
  const [showPattern, setShowPattern] = useState(false);

  /*
   * Per-question state is reset by remounting, not by an effect: the session
   * page gives this component a key of question.id, so React discards the old
   * instance and every useState initialiser runs again. That is the pattern
   * React recommends over synchronising state in an effect, and it removes a
   * whole class of stale-state bugs.
   *
   * The only thing left to do on mount is start the clock.
   */
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (stage === "revealed") return;
    const timer = window.setInterval(() => {
      if (startedAt.current === 0) return;
      setElapsed(Date.now() - startedAt.current);
    }, 250);
    return () => window.clearInterval(timer);
  }, [stage]);

  const expectedMs = question.pattern.expectedSeconds * 1000;
  const overTime = elapsed > expectedMs;

  const reveal: QuestionReveal | undefined = result?.reveal;

  const revealByChoice = useMemo(() => {
    const map = new Map<string, QuestionReveal["choices"][number]>();
    for (const choice of reveal?.choices ?? []) map.set(choice.id, choice);
    return map;
  }, [reveal]);

  const commitRecognition = useCallback(() => {
    if (recognisedAt.current === null) {
      recognisedAt.current = Date.now() - (startedAt.current || Date.now());
    }
    setStage("solve");
  }, []);

  const submit = useCallback(
    async (options: { skipped?: boolean } = {}) => {
      if (submitting) return;
      setSubmitting(true);
      setError(null);

      const begun = startedAt.current || Date.now();
      const totalMs = Date.now() - begun;
      // Show exactly what was recorded, rather than whatever the 250ms ticker
      // last wrote. They differ for very fast answers.
      setElapsed(totalMs);

      const response = await submitAnswerAction({
        sessionId,
        questionId: question.id,
        choiceId: question.format === "mcq" ? selectedChoice : null,
        answerText: question.format === "spr" ? typed : null,
        totalMs,
        recognitionMs: recognisedAt.current,
        patternGuess: patternGuess || null,
        confidence,
        skipped: options.skipped ?? false,
      });

      setSubmitting(false);

      if (!response.ok) {
        setError(response.error ?? "Could not save that answer.");
        return;
      }

      setResult(response);
      setStage("revealed");
    },
    [
      confidence,
      patternGuess,
      question.format,
      question.id,
      selectedChoice,
      sessionId,
      submitting,
      typed,
    ],
  );

  const next = useCallback(() => {
    if (index + 1 >= total) {
      onFinish();
      return;
    }
    startTransition(() => router.refresh());
  }, [index, onFinish, router, total]);

  const answerable =
    question.format === "mcq" ? selectedChoice !== null : typed.trim().length > 0;

  async function onStar() {
    const response = await toggleStarAction(question.id);
    setStarred(response.starred);
  }

  async function onClassify(category: ErrorCategory) {
    if (!result?.attemptId) return;
    setClassified(category);
    await classifyErrorAction({ attemptId: result.attemptId, category });
  }

  return (
    <div className="space-y-4">
      {/* ------------------------------------------------------- progress */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-base">
              Question {index + 1} of {total}
            </span>
            <Badge tone="neutral">{SECTION_LABEL[question.section]}</Badge>
            <Badge tone="neutral">{question.skillName}</Badge>
            <Badge tone="neutral">Difficulty {question.difficulty}</Badge>
          </div>
          <div
            className={cn(
              "numeric flex items-center gap-1.5 font-medium",
              overTime ? "text-warning" : "text-text-muted",
            )}
          >
            <Timer className="h-3.5 w-3.5" />
            {formatClock(elapsed)}
            <span className="text-text-subtle">
              / {formatClock(expectedMs)} target
            </span>
          </div>
        </div>
        <ProgressBar value={index} max={total} label="Progress through this session" />
      </div>

      {/* ---------------------------------------------------- the question */}
      <Card>
        <CardBody className="space-y-4">
          {question.stimulus ? (
            <Stimulus title={question.stimulusTitle} text={question.stimulus} />
          ) : null}

          <p className="text-sm leading-relaxed text-text-base">{question.stem}</p>

          {/* Stage 1: name the pattern before solving. */}
          {stage === "recognise" ? (
            <div className="space-y-3 rounded-[var(--radius-control)] border border-[var(--accent)]/30 bg-accent-soft/40 p-4">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Lightbulb className="h-3.5 w-3.5" />
                  First: what kind of question is this?
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                  Name the pattern before you solve anything. Recognition speed is trained
                  separately from solving speed, and it is the thing that actually collapses under
                  time pressure.
                </p>
              </div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {patternOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPatternGuess(option)}
                    className={cn(
                      "rounded-[var(--radius-control)] border px-3 py-2 text-left text-xs transition-colors",
                      patternGuess === option
                        ? "border-accent bg-accent text-accent-contrast"
                        : "bg-bg-elevated text-text-muted hover:bg-surface-hover hover:text-text-base",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={!patternGuess}
                  onClick={commitRecognition}
                >
                  Lock it in and solve
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={commitRecognition}>
                  Not sure, just show me
                </Button>
              </div>
            </div>
          ) : null}

          {/* Stage 2: answer. */}
          {stage !== "recognise" ? (
            <div className="space-y-2">
              {question.format === "mcq" ? (
                question.choices.map((choice) => {
                  const revealed = revealByChoice.get(choice.id);
                  const isSelected = selectedChoice === choice.id;
                  const isCorrect = revealed?.isCorrect === true;
                  const showWrong = stage === "revealed" && isSelected && !isCorrect;

                  return (
                    <button
                      key={choice.id}
                      type="button"
                      disabled={stage === "revealed"}
                      onClick={() => setSelectedChoice(choice.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-[var(--radius-control)] border px-3.5 py-3 text-left transition-colors",
                        stage === "revealed"
                          ? isCorrect
                            ? "border-[var(--correct)] bg-correct-soft"
                            : showWrong
                              ? "border-[var(--wrong)] bg-wrong-soft"
                              : "opacity-60"
                          : isSelected
                            ? "border-accent bg-accent-soft"
                            : "hover:bg-surface-hover",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                          stage === "revealed" && isCorrect
                            ? "border-[var(--correct)] bg-correct text-accent-contrast"
                            : showWrong
                              ? "border-[var(--wrong)] bg-wrong text-accent-contrast"
                              : isSelected
                                ? "border-accent bg-accent text-accent-contrast"
                                : "text-text-muted",
                        )}
                      >
                        {stage === "revealed" && isCorrect ? (
                          <Check className="h-3 w-3" />
                        ) : showWrong ? (
                          <X className="h-3 w-3" />
                        ) : (
                          choice.label
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm leading-relaxed text-text-base">
                          {choice.text}
                        </span>
                        {stage === "revealed" && revealed?.rationale ? (
                          <span className="mt-1.5 block text-[11px] leading-relaxed text-text-muted">
                            {revealed.distractorType ? (
                              <span className="font-medium text-text-subtle">
                                {DISTRACTOR_TYPE_LABEL[revealed.distractorType] ??
                                  revealed.distractorType}
                                {": "}
                              </span>
                            ) : null}
                            {revealed.rationale}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="space-y-2">
                  <label
                    htmlFor="typed-answer"
                    className="block text-xs font-medium text-text-muted"
                  >
                    Type your answer
                  </label>
                  <input
                    id="typed-answer"
                    value={typed}
                    disabled={stage === "revealed"}
                    onChange={(event) => setTyped(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && answerable && stage === "solve") {
                        void submit();
                      }
                    }}
                    inputMode="text"
                    autoComplete="off"
                    placeholder="e.g. 12, -4, 3/4 or 0.75"
                    className={cn(
                      "numeric h-11 w-full max-w-xs rounded-[var(--radius-control)] border bg-bg-sunken px-3 text-base text-text-base",
                      "placeholder:text-text-subtle focus:border-accent focus:outline-none",
                      stage === "revealed" &&
                        (result?.isCorrect
                          ? "border-[var(--correct)] bg-correct-soft"
                          : "border-[var(--wrong)] bg-wrong-soft"),
                    )}
                  />
                  {stage === "revealed" && reveal?.acceptedAnswers.length ? (
                    <p className="text-xs text-text-muted">
                      Accepted:{" "}
                      <span className="numeric font-medium text-text-base">
                        {reveal.acceptedAnswers.join(", ")}
                      </span>
                    </p>
                  ) : null}
                  <p className="text-[11px] text-text-subtle">
                    Equivalent forms are accepted, so 0.75 and 3/4 both count.
                  </p>
                </div>
              )}
            </div>
          ) : null}

          {/* Confidence, captured before the answer is graded. */}
          {stage === "solve" ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-text-subtle">How sure are you?</span>
              {(["guess", "unsure", "confident"] as Confidence[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setConfidence(confidence === level ? null : level)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] capitalize transition-colors",
                    confidence === level
                      ? "border-accent bg-accent-soft text-accent"
                      : "text-text-muted hover:bg-surface-hover",
                  )}
                >
                  {level}
                </button>
              ))}
              <span className="text-[11px] text-text-subtle">
                Optional, but it sharpens the spaced repetition grading.
              </span>
            </div>
          ) : null}

          {error ? (
            <p role="alert" className="text-xs text-wrong">
              {error}
            </p>
          ) : null}

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {stage === "solve" ? (
              <>
                <Button
                  type="button"
                  variant="primary"
                  disabled={!answerable || submitting}
                  onClick={() => void submit()}
                >
                  {submitting ? "Checking..." : "Submit answer"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={submitting}
                  onClick={() => void submit({ skipped: true })}
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Skip
                </Button>
              </>
            ) : null}

            {stage === "revealed" ? (
              <Button type="button" variant="primary" onClick={next}>
                {index + 1 >= total ? "Finish session" : "Next question"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : null}

            <div className="ml-auto flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => void onStar()}
                aria-pressed={starred}
              >
                <Star className={cn("h-3.5 w-3.5", starred && "fill-current text-warning")} />
                {starred ? "Starred" : "Star"}
              </Button>
              {stage === "solve" ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPattern((value) => !value)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  {showPattern ? "Hide hint" : "Hint"}
                </Button>
              ) : null}
            </div>
          </div>

          {/* A hint reveals recognition cues but never the method or answer. */}
          {showPattern && stage === "solve" && question.pattern.recognitionCues.length > 0 ? (
            <Notice tone="accent">
              <p className="font-medium">Recognition cues</p>
              <ul className="mt-1 list-inside list-disc space-y-0.5">
                {question.pattern.recognitionCues.map((cue) => (
                  <li key={cue}>{cue}</li>
                ))}
              </ul>
            </Notice>
          ) : null}
        </CardBody>
      </Card>

      {/* ------------------------------------------------------- the reveal */}
      {stage === "revealed" && reveal ? (
        <Card className="animate-in">
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={result?.isCorrect ? "correct" : "wrong"}>
                {result?.isCorrect ? (
                  <>
                    <Check className="h-3 w-3" /> Correct
                  </>
                ) : (
                  <>
                    <X className="h-3 w-3" /> Incorrect
                  </>
                )}
              </Badge>
              {result?.patternGuessCorrect === true ? (
                <Badge tone="correct">Pattern recognised</Badge>
              ) : null}
              {result?.patternGuessCorrect === false ? (
                <Badge tone="warning">Pattern missed</Badge>
              ) : null}
              <Badge tone="neutral">
                {formatClock(elapsed)} against a {question.pattern.expectedSeconds}s target
              </Badge>
              {typeof result?.nextDueInDays === "number" ? (
                <Badge tone="neutral">
                  Back in{" "}
                  {result.nextDueInDays === 0 ? "today" : `${result.nextDueInDays}d`}
                </Badge>
              ) : null}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                Explanation
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-base">
                {reveal.explanation}
              </p>
            </div>

            <Divider />

            <div className="grid gap-4 sm:grid-cols-2">
              {question.pattern.patternName ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                    Pattern
                  </p>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {question.pattern.patternName}
                  </p>
                  {question.pattern.concept ? (
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">
                      {question.pattern.concept}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {question.pattern.fastestMethod ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                    Fastest reliable method
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    {question.pattern.fastestMethod}
                  </p>
                </div>
              ) : null}

              {question.pattern.recognitionCues.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                    How to spot it
                  </p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs leading-relaxed text-text-muted">
                    {question.pattern.recognitionCues.map((cue) => (
                      <li key={cue}>{cue}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {question.pattern.commonTraps.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                    Common traps
                  </p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs leading-relaxed text-text-muted">
                    {question.pattern.commonTraps.map((trap) => (
                      <li key={trap}>{trap}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {question.pattern.alternativeMethod ? (
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
                    Alternative method
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    {question.pattern.alternativeMethod}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Error classification, only when the answer was wrong. */}
            {result?.isCorrect === false ? (
              <>
                <Divider />
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-text-base">
                    <Flag className="h-3.5 w-3.5" />
                    Why did you get this wrong?
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                    Classifying it is what makes the error log useful. An unclassified mistake
                    tells the weakness detector nothing about how to fix it.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ERROR_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => void onClassify(category)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                          classified === category
                            ? "border-accent bg-accent-soft text-accent"
                            : "text-text-muted hover:bg-surface-hover hover:text-text-base",
                        )}
                      >
                        {ERROR_CATEGORY_LABEL[category]}
                      </button>
                    ))}
                  </div>
                  {classified ? (
                    <Notice className="mt-2" tone="accent">
                      {ERROR_CATEGORY_FIX[classified]}
                    </Notice>
                  ) : null}
                </div>
              </>
            ) : null}

            {!question.answerKeyTrusted ? (
              <Notice tone="warning">{question.sourceNote}</Notice>
            ) : null}

            <p className="text-[11px] text-text-subtle">
              Source: {question.sourceLabel}
              {question.sourceRef ? ` (${question.sourceRef})` : ""}. {question.sourceNote}
            </p>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
