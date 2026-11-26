"use client";

import { Ban, Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { DISTRACTOR_TYPE_LABEL } from "@/lib/domain/enums";

/**
 * The answer options, with elimination.
 *
 * Crossing out options you have ruled out is a real feature of the digital SAT
 * app, and it is not cosmetic: on a hard question the reliable route to the
 * answer is often eliminating three rather than recognising one. Practising
 * without it trains a different, worse habit.
 */

export interface ChoiceOption {
  id: string;
  label: string;
  text: string;
}

export interface ChoiceReveal {
  id: string;
  isCorrect: boolean;
  distractorType: string | null;
  rationale: string | null;
}

export function AnswerChoices({
  choices,
  selectedId,
  eliminated,
  reveal,
  disabled,
  onSelect,
  onToggleEliminate,
}: {
  choices: ChoiceOption[];
  selectedId: string | null;
  eliminated: ReadonlySet<string>;
  /** Supplied only once the answer has been submitted. */
  reveal?: ChoiceReveal[];
  disabled?: boolean;
  onSelect: (choiceId: string) => void;
  onToggleEliminate: (choiceId: string) => void;
}) {
  const revealById = new Map((reveal ?? []).map((r) => [r.id, r]));
  const revealed = Boolean(reveal?.length);

  return (
    <div className="space-y-2">
      {choices.map((choice) => {
        const info = revealById.get(choice.id);
        const isSelected = selectedId === choice.id;
        const isCorrect = info?.isCorrect === true;
        const showWrong = revealed && isSelected && !isCorrect;
        const isEliminated = eliminated.has(choice.id) && !revealed;

        return (
          <div key={choice.id} className="flex items-stretch gap-1.5">
            <button
              type="button"
              disabled={disabled || isEliminated}
              onClick={() => onSelect(choice.id)}
              aria-pressed={isSelected}
              className={cn(
                "flex min-w-0 flex-1 items-start gap-3 rounded-[var(--radius-control)] border px-3.5 py-3 text-left transition-colors",
                revealed
                  ? isCorrect
                    ? "border-[var(--correct)] bg-correct-soft"
                    : showWrong
                      ? "border-[var(--wrong)] bg-wrong-soft"
                      : "opacity-60"
                  : isEliminated
                    ? "cursor-not-allowed border-dashed opacity-40"
                    : isSelected
                      ? "border-accent bg-accent-soft"
                      : "hover:bg-surface-hover",
              )}
            >
              <span
                className={cn(
                  "mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                  revealed && isCorrect
                    ? "border-[var(--correct)] bg-correct text-accent-contrast"
                    : showWrong
                      ? "border-[var(--wrong)] bg-wrong text-accent-contrast"
                      : isSelected
                        ? "border-accent bg-accent text-accent-contrast"
                        : "text-text-muted",
                )}
              >
                {revealed && isCorrect ? (
                  <Check className="h-3 w-3" />
                ) : showWrong ? (
                  <X className="h-3 w-3" />
                ) : (
                  choice.label
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block text-sm leading-relaxed text-text-base",
                    isEliminated && "line-through",
                  )}
                >
                  {choice.text}
                </span>
                {revealed && info?.rationale ? (
                  <span className="mt-1.5 block text-[11px] leading-relaxed text-text-muted">
                    {info.distractorType ? (
                      <span className="font-medium text-text-subtle">
                        {DISTRACTOR_TYPE_LABEL[info.distractorType] ?? info.distractorType}
                        {": "}
                      </span>
                    ) : null}
                    {info.rationale}
                  </span>
                ) : null}
              </span>
            </button>

            {!revealed ? (
              <button
                type="button"
                disabled={disabled}
                onClick={() => onToggleEliminate(choice.id)}
                aria-pressed={isEliminated}
                aria-label={
                  isEliminated
                    ? `Restore option ${choice.label}`
                    : `Eliminate option ${choice.label}`
                }
                title={isEliminated ? "Restore this option" : "Cross this option out"}
                className={cn(
                  "flex w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] border transition-colors",
                  isEliminated
                    ? "border-[var(--border-strong)] bg-surface-hover text-text-base"
                    : "text-text-subtle hover:bg-surface-hover hover:text-text-base",
                )}
              >
                <Ban className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
