"use client";

import { useActionState, useState } from "react";
import { startExamAction, type ExamState } from "./actions";
import { Button, Card, CardBody, CardHeader, CardTitle, Notice } from "@/components/ui";
import { cn } from "@/lib/cn";

const INITIAL: ExamState = {};

const SHAPES = [
  {
    value: "full",
    label: "Full exam",
    detail: "Both sections, four modules, about 2 hours 14 minutes plus a break.",
  },
  {
    value: "rw_only",
    label: "Reading and Writing only",
    detail: "Two modules, 64 minutes. Includes the routing decision.",
  },
  {
    value: "math_only",
    label: "Maths only",
    detail: "Two modules, 70 minutes. Includes the routing decision.",
  },
  {
    value: "single_module",
    label: "One module",
    detail: "A single 32-minute Reading and Writing module. Good for a weekday evening.",
  },
];

export function ExamLauncher({ hasOpenExam }: { hasOpenExam: boolean }) {
  const [state, action, pending] = useActionState(startExamAction, INITIAL);
  const [shape, setShape] = useState("full");

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Start an exam</CardTitle>
          <p className="mt-1 text-xs text-text-muted">
            Once a module starts, its timer runs down whether the tab is open or not. That is
            deliberate.
          </p>
        </div>
      </CardHeader>
      <CardBody className="pt-3">
        <form action={action} className="space-y-4">
          <input type="hidden" name="shape" value={shape} />

          <div className="grid gap-2 sm:grid-cols-2">
            {SHAPES.map((option) => {
              const active = shape === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setShape(option.value)}
                  className={cn(
                    "rounded-[var(--radius-control)] border px-3 py-2.5 text-left transition-colors",
                    active ? "border-accent bg-accent-soft" : "hover:bg-surface-hover",
                  )}
                >
                  <span
                    className={cn(
                      "block text-xs font-medium",
                      active ? "text-accent" : "text-text-base",
                    )}
                  >
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-text-muted">
                    {option.detail}
                  </span>
                </button>
              );
            })}
          </div>

          {state.error ? (
            <Notice tone="warning" role="alert">
              {state.error}
            </Notice>
          ) : null}

          <Button
            type="submit"
            id="start-exam"
            variant="primary"
            size="lg"
            disabled={pending || hasOpenExam}
          >
            {pending
              ? "Building exam..."
              : hasOpenExam
                ? "Finish your open exam first"
                : "Begin exam"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
