"use client";

import { useCallback } from "react";
import { QuestionRunner } from "@/components/question-runner";
import { finishSessionAction } from "../actions";
import type { QuestionView } from "@/lib/question-view";

/**
 * Thin client wrapper so the server component can pass a server action down to
 * the runner without making the whole page a client component.
 */
export function SessionRunner(props: {
  sessionId: string;
  question: QuestionView;
  index: number;
  total: number;
  requirePatternGuess: boolean;
  patternOptions: string[];
  starred: boolean;
}) {
  const onFinish = useCallback(() => {
    void finishSessionAction(props.sessionId);
  }, [props.sessionId]);

  // key = question id so every new question gets a fresh component instance,
  // which resets timing and selection without an effect.
  return <QuestionRunner key={props.question.id} {...props} onFinish={onFinish} />;
}
