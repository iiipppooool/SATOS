"use client";

import { useEffect } from "react";

/**
 * Keyboard control for answering.
 *
 * Pointing and clicking four options is slower than the test allows at the top
 * of the scale. These bindings mirror what a fast test-taker does on paper:
 * pick with a letter, cross out with X, commit with Enter.
 *
 * Bindings are suppressed while the focus is in a text field, so typing a
 * student-produced response never triggers a shortcut.
 */
export interface AnswerKeyHandlers {
  /** Letters A-D, lower or upper case. */
  onSelectLabel?: (label: string) => void;
  /** X, or Backspace, eliminates the currently selected option. */
  onEliminateLabel?: (label: string) => void;
  onSubmit?: () => void;
  onNext?: () => void;
  onFlag?: () => void;
  onToggleReference?: () => void;
  enabled?: boolean;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  return target.isContentEditable;
}

export function useAnswerKeys({
  onSelectLabel,
  onEliminateLabel,
  onSubmit,
  onNext,
  onFlag,
  onToggleReference,
  enabled = true,
}: AnswerKeyHandlers): void {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const key = event.key;
      const upper = key.toUpperCase();

      // Shift plus a letter crosses that option out, which keeps elimination on
      // the same keys as selection rather than inventing a second set.
      if (event.shiftKey && ["A", "B", "C", "D"].includes(upper)) {
        if (onEliminateLabel) {
          event.preventDefault();
          onEliminateLabel(upper);
        }
        return;
      }

      if (event.shiftKey) return;

      if (["A", "B", "C", "D"].includes(upper)) {
        if (onSelectLabel) {
          event.preventDefault();
          onSelectLabel(upper);
        }
        return;
      }

      switch (upper) {
        case "ENTER":
          if (onSubmit) {
            event.preventDefault();
            onSubmit();
          }
          break;
        case "N":
          if (onNext) {
            event.preventDefault();
            onNext();
          }
          break;
        case "F":
          if (onFlag) {
            event.preventDefault();
            onFlag();
          }
          break;
        case "R":
          if (onToggleReference) {
            event.preventDefault();
            onToggleReference();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, onSelectLabel, onEliminateLabel, onSubmit, onNext, onFlag, onToggleReference]);
}

/** Shown under the options so the bindings are discoverable. */
export const KEY_HINTS = [
  { keys: "A-D", action: "select" },
  { keys: "Shift+A-D", action: "cross out" },
  { keys: "Enter", action: "submit" },
  { keys: "N", action: "next" },
] as const;
