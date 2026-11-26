"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Check, ChevronDown, RotateCcw } from "lucide-react";
import { updateErrorEntryAction } from "./actions";
import {
  ERROR_CATEGORY_FIX,
  ERROR_CATEGORY_LABEL,
  type ErrorCategory,
} from "@/lib/domain/enums";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Notice,
  Textarea,
  buttonClass,
} from "@/components/ui";
import { cn } from "@/lib/cn";

const CATEGORIES: ErrorCategory[] = [
  "concept_gap",
  "misread",
  "careless_arithmetic",
  "trap_choice",
  "time_pressure",
  "guessed",
  "notation",
  "ran_out_of_time",
];

export interface ErrorRow {
  id: string;
  category: ErrorCategory;
  note: string | null;
  resolved: boolean;
  createdAt: string;
  questionId: string;
  stem: string;
  section: string;
  sectionLabel: string;
  difficulty: number;
  patternName: string | null;
  explanation: string;
  skillId: string;
  skillName: string;
  answerText: string | null;
  seconds: number | null;
  confidence: string | null;
}

export function ErrorList({ entries }: { entries: ErrorRow[] }) {
  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <ErrorItem key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

function ErrorItem({ entry }: { entry: ErrorRow }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<ErrorCategory>(entry.category);
  const [note, setNote] = useState(entry.note ?? "");
  const [saving, setSaving] = useState(false);
  const [, startTransition] = useTransition();

  async function update(patch: Partial<{ category: ErrorCategory; note: string; resolved: boolean }>) {
    setSaving(true);
    await updateErrorEntryAction({ entryId: entry.id, ...patch });
    setSaving(false);
  }

  return (
    <Card>
      <CardBody className="p-0">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-start gap-3 px-4 py-3 text-left"
        >
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-xs leading-relaxed text-text-base">{entry.stem}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge tone={category === "unknown" ? "warning" : "neutral"}>
                {ERROR_CATEGORY_LABEL[category]}
              </Badge>
              <Badge tone="neutral">{entry.skillName}</Badge>
              <Badge tone="neutral">{entry.sectionLabel}</Badge>
              {entry.patternName ? <Badge tone="neutral">{entry.patternName}</Badge> : null}
              {entry.seconds !== null ? (
                <span className="text-[11px] text-text-subtle">{entry.seconds}s</span>
              ) : null}
              <span className="text-[11px] text-text-subtle">
                {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 text-text-subtle transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open ? (
          <div className="space-y-4 border-t px-4 py-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                Explanation
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">{entry.explanation}</p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                Cause
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {CATEGORIES.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setCategory(value);
                      startTransition(() => void update({ category: value }));
                    }}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                      category === value
                        ? "border-accent bg-accent-soft text-accent"
                        : "text-text-muted hover:bg-surface-hover hover:text-text-base",
                    )}
                  >
                    {ERROR_CATEGORY_LABEL[value]}
                  </button>
                ))}
              </div>
              {category !== "unknown" ? (
                <Notice className="mt-2" tone="accent">
                  {ERROR_CATEGORY_FIX[category]}
                </Notice>
              ) : null}
            </div>

            <div>
              <label
                htmlFor={`note-${entry.id}`}
                className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle"
              >
                Your note
              </label>
              <Textarea
                id={`note-${entry.id}`}
                rows={2}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                onBlur={() => void update({ note })}
                placeholder="What exactly went wrong, in your own words? This is the part you will reread before the test."
                className="mt-1.5"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant={entry.resolved ? "secondary" : "correct"}
                size="sm"
                disabled={saving}
                onClick={() => void update({ resolved: !entry.resolved })}
              >
                {entry.resolved ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reopen
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Mark resolved
                  </>
                )}
              </Button>
              <Link
                href={`/practice?skill=${entry.skillId}`}
                className={buttonClass("secondary", "sm")}
              >
                Drill this skill
              </Link>
              <Link
                href={`/tutor?question=${entry.questionId}`}
                className={buttonClass("ghost", "sm")}
              >
                Ask the tutor
              </Link>
            </div>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
