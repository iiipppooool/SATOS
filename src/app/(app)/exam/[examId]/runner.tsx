"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Flag, Timer } from "lucide-react";
import {
  abandonExamAction,
  markModuleStartedAction,
  saveExamAnswerAction,
  submitModuleAction,
} from "../actions";
import { Badge, Button, Card, CardBody, Notice } from "@/components/ui";
import { Stimulus } from "@/components/stimulus";
import { cn } from "@/lib/cn";

export interface ExamItemView {
  id: string;
  order: number;
  questionId: string;
  format: "mcq" | "spr";
  stimulus: string | null;
  stimulusTitle: string | null;
  stem: string;
  choices: Array<{ id: string; label: string; text: string }>;
  acceptedAnswerHint: boolean;
  choiceId: string | null;
  answerText: string | null;
  flagged: boolean;
}

function formatClock(seconds: number): string {
  const safe = Math.max(0, seconds);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function ExamRunner({
  examId,
  moduleId,
  moduleLabel,
  tier,
  moduleNumber,
  moduleTotal,
  durationSec,
  startedAtIso,
  secondsPerQuestion,
  items,
  previousModules,
}: {
  examId: string;
  moduleId: string;
  moduleLabel: string;
  tier: string;
  moduleNumber: number;
  moduleTotal: number;
  durationSec: number;
  startedAtIso: string | null;
  secondsPerQuestion: number;
  items: ExamItemView[];
  previousModules: Array<{ label: string; tier: string }>;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [started, setStarted] = useState(Boolean(startedAtIso));
  const [startedAt, setStartedAt] = useState<number | null>(
    startedAtIso ? new Date(startedAtIso).getTime() : null,
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { choiceId: string | null; text: string }>>(
    () =>
      Object.fromEntries(
        items.map((item) => [item.id, { choiceId: item.choiceId, text: item.answerText ?? "" }]),
      ),
  );
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.id, item.flagged])),
  );
  const [remaining, setRemaining] = useState(durationSec);
  const [submitting, setSubmitting] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  // Set on mount, not during render: reading the clock while rendering is
  // impure and would be recomputed on every re-render.
  const questionEnteredAt = useRef<number>(0);

  const current = items[index];

  const submitModule = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    await submitModuleAction(examId, moduleId);
    startTransition(() => router.refresh());
  }, [examId, moduleId, router, submitting]);

  // The clock is derived from the server-recorded start time, so closing the
  // tab does not pause it. That is the point of a timed rehearsal.
  useEffect(() => {
    if (!started || startedAt === null) return;
    questionEnteredAt.current = Date.now();

    // Ticking every 250ms rather than every second means a resumed module
    // shows the right time almost immediately, without needing a synchronous
    // setState in the effect body to seed it.
    const timer = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = Math.max(0, durationSec - elapsed);
      setRemaining(left);

      // Time is up: submit from here rather than from an effect watching the
      // countdown, so the side effect sits with the thing that causes it.
      if (left === 0) {
        window.clearInterval(timer);
        void submitModule();
      }
    }, 250);
    return () => window.clearInterval(timer);
    // submitModule only changes when the submit actually starts, so the
    // interval is rebuilt at most once per module rather than per render.
  }, [started, startedAt, durationSec, submitModule]);

  const answeredCount = useMemo(
    () =>
      items.filter((item) => {
        const answer = answers[item.id];
        return Boolean(answer?.choiceId) || Boolean(answer?.text?.trim());
      }).length,
    [answers, items],
  );

  const flaggedCount = useMemo(
    () => Object.values(flags).filter(Boolean).length,
    [flags],
  );

  async function persist(itemId: string, patch: { choiceId?: string | null; answerText?: string | null; flagged?: boolean }) {
    // Only ever called from event handlers, never during render.
    // eslint-disable-next-line react-hooks/purity
    const spent = Date.now() - (questionEnteredAt.current || Date.now());
    await saveExamAnswerAction({
      examId,
      itemId,
      timeMs: Math.min(3_600_000, Math.max(0, spent)),
      ...patch,
    });
  }

  function choose(itemId: string, choiceId: string) {
    setAnswers((current) => ({ ...current, [itemId]: { choiceId, text: "" } }));
    void persist(itemId, { choiceId, answerText: null });
  }

  function type(itemId: string, text: string) {
    setAnswers((current) => ({ ...current, [itemId]: { choiceId: null, text } }));
  }

  function toggleFlag(itemId: string) {
    const next = !flags[itemId];
    setFlags((current) => ({ ...current, [itemId]: next }));
    void persist(itemId, { flagged: next });
  }

  function goTo(nextIndex: number) {
    if (!current) return;
    const answer = answers[current.id];
    if (current.format === "spr") {
      void persist(current.id, { answerText: answer?.text ?? "", choiceId: null });
    } else {
      void persist(current.id, {});
    }
    // goTo runs from click handlers only.
    // eslint-disable-next-line react-hooks/purity
    questionEnteredAt.current = Date.now();
    setIndex(Math.min(items.length - 1, Math.max(0, nextIndex)));
    setShowGrid(false);
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Card>
          <CardBody className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                Module {moduleNumber} of {moduleTotal}
              </p>
              <h1 className="mt-1 text-lg font-semibold tracking-tight">{moduleLabel}</h1>
            </div>

            {previousModules.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {previousModules.map((previous) => (
                  <Badge key={previous.label} tone="neutral">
                    {previous.label} done
                  </Badge>
                ))}
              </div>
            ) : null}

            {tier !== "routing" ? (
              <Notice tone={tier === "hard" ? "accent" : "warning"}>
                {tier === "hard"
                  ? "Your first module went well, so this one is the harder tier. This is how the real test behaves, and reaching it is what makes the top of the scale available."
                  : "Based on your first module, this is the easier tier. On the real test this caps the section score, so the first module matters more than most students realise."}
              </Notice>
            ) : null}

            <div className="space-y-1.5 text-xs text-text-muted">
              <p>
                {items.length} questions, {Math.round(durationSec / 60)} minutes. That is about{" "}
                {secondsPerQuestion} seconds each.
              </p>
              <p>
                The clock starts when you press begin and keeps running if you close the tab. You
                can flag questions and come back to them within the module, but you cannot return
                to a module once it is submitted.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="primary"
                size="lg"
                id="begin-module"
                onClick={() => {
                  const now = Date.now();
                  setStartedAt(now);
                  setStarted(true);
                  questionEnteredAt.current = now;
                  void markModuleStartedAction(moduleId);
                }}
              >
                Begin module
              </Button>
              <form action={abandonExamAction.bind(null, examId)}>
                <Button type="submit" variant="ghost" size="lg">
                  Abandon exam
                </Button>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!current) return null;

  const answer = answers[current.id];
  const lowTime = remaining <= 300;

  /*
   * While a module is running the app chrome is covered completely. A real
   * sitting has no sidebar to wander into, and the navigation is also a way to
   * leave a module half-finished by accident, which the real test does not
   * allow either.
   */
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-bg">
      <div className="mx-auto w-full max-w-4xl space-y-4 px-4 pb-16 sm:px-6">
      {/* ------------------------------------------------------ exam chrome */}
      <div className="sticky top-0 z-10 -mx-4 border-b bg-bg-elevated/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-base">{moduleLabel}</span>
            <Badge tone="neutral">
              {answeredCount}/{items.length} answered
            </Badge>
            {flaggedCount > 0 ? (
              <Badge tone="warning">{flaggedCount} flagged</Badge>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "numeric flex items-center gap-1.5 text-sm font-semibold",
                lowTime ? "text-wrong" : "text-text-base",
              )}
              role="timer"
              aria-live="off"
            >
              <Timer className="h-4 w-4" />
              {formatClock(remaining)}
            </span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowGrid((value) => !value)}
            >
              Question {index + 1} of {items.length}
            </Button>
          </div>
        </div>

        {showGrid ? (
          <div className="mt-3 grid grid-cols-8 gap-1.5 sm:grid-cols-12 lg:grid-cols-14">
            {items.map((item, position) => {
              const done =
                Boolean(answers[item.id]?.choiceId) || Boolean(answers[item.id]?.text?.trim());
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(position)}
                  className={cn(
                    "relative h-8 rounded border text-[11px] font-medium transition-colors",
                    position === index
                      ? "border-accent bg-accent text-accent-contrast"
                      : done
                        ? "border-[var(--correct)]/40 bg-correct-soft text-correct"
                        : "text-text-muted hover:bg-surface-hover",
                  )}
                >
                  {position + 1}
                  {flags[item.id] ? (
                    <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-warning" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {lowTime ? (
        <Notice tone="warning">
          <AlertTriangle className="mr-1 inline h-3 w-3" />
          Five minutes left. Make sure every question has something in it: there is no penalty for
          a wrong answer, so a blank is strictly worse than a guess.
        </Notice>
      ) : null}

      {/* -------------------------------------------------------- question */}
      <Card>
        <CardBody className="space-y-4">
          {current.stimulus ? (
            <Stimulus title={current.stimulusTitle} text={current.stimulus} />
          ) : null}

          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-relaxed text-text-base">
              <span className="mr-2 text-text-subtle">{index + 1}.</span>
              {current.stem}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => toggleFlag(current.id)}
              aria-pressed={Boolean(flags[current.id])}
            >
              <Flag
                className={cn("h-3.5 w-3.5", flags[current.id] && "fill-current text-warning")}
              />
              {flags[current.id] ? "Flagged" : "Flag"}
            </Button>
          </div>

          {current.format === "mcq" ? (
            <div className="space-y-2">
              {current.choices.map((choice) => {
                const selected = answer?.choiceId === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => choose(current.id, choice.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-[var(--radius-control)] border px-3.5 py-3 text-left transition-colors",
                      selected ? "border-accent bg-accent-soft" : "hover:bg-surface-hover",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                        selected
                          ? "border-accent bg-accent text-accent-contrast"
                          : "text-text-muted",
                      )}
                    >
                      {choice.label}
                    </span>
                    <span className="text-sm leading-relaxed text-text-base">{choice.text}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              <label
                htmlFor="exam-typed"
                className="block text-xs font-medium text-text-muted"
              >
                Type your answer
              </label>
              <input
                id="exam-typed"
                value={answer?.text ?? ""}
                onChange={(event) => type(current.id, event.target.value)}
                onBlur={() => void persist(current.id, { answerText: answer?.text ?? "", choiceId: null })}
                autoComplete="off"
                placeholder="e.g. 12, -4, 3/4"
                className="numeric h-11 w-full max-w-xs rounded-[var(--radius-control)] border bg-bg-sunken px-3 text-base text-text-base placeholder:text-text-subtle focus:border-accent focus:outline-none"
              />
              <p className="text-[11px] text-text-subtle">
                Fractions and decimals are both accepted.
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* -------------------------------------------------------- controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {index + 1 < items.length ? (
            <Button type="button" variant="primary" onClick={() => goTo(index + 1)}>
              Next
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              id="submit-module"
              disabled={submitting}
              onClick={() => {
                goTo(index);
                void submitModule();
              }}
            >
              {submitting ? "Submitting..." : "Submit module"}
            </Button>
          )}
        </div>
      </div>

      <p className="text-center text-[11px] text-text-subtle">
        Answers save as you go. Submitting a module is final, exactly as on the real test.
      </p>
      </div>
    </div>
  );
}
