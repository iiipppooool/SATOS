"use client";

import { useActionState, useState } from "react";
import { RotateCcw, Target, Zap } from "lucide-react";
import { startSessionAction, type StartState } from "./actions";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Label,
  Notice,
  Select,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Section } from "@/lib/domain/enums";

interface SkillGroup {
  id: string;
  name: string;
  section: Section;
  sectionLabel: string;
  skills: Array<{ id: string; name: string; available: number; mastery: number }>;
}

const INITIAL: StartState = {};

export function PracticeBuilder({
  skillGroups,
  dueReviewCount,
  initialSkillId,
  initialMode,
  initialSection,
  defaultMinutes,
}: {
  skillGroups: SkillGroup[];
  dueReviewCount: number;
  initialSkillId?: string;
  initialMode?: string;
  initialSection?: string;
  defaultMinutes: number;
}) {
  const [state, action, pending] = useActionState(startSessionAction, INITIAL);

  const [kind, setKind] = useState(
    initialMode === "review" ? "review" : initialMode === "weakness" ? "weakness" : "drill",
  );
  const [section, setSection] = useState<string>(
    initialSection === "math" || initialSection === "reading_writing" ? initialSection : "both",
  );
  const [selected, setSelected] = useState<string[]>(initialSkillId ? [initialSkillId] : []);
  const [count, setCount] = useState(12);
  const [minDifficulty, setMinDifficulty] = useState(1);
  const [maxDifficulty, setMaxDifficulty] = useState(5);
  const [patternFirst, setPatternFirst] = useState(false);

  const visibleGroups =
    section === "both" ? skillGroups : skillGroups.filter((g) => g.section === section);

  const availableInSelection = selected.length
    ? skillGroups
        .flatMap((g) => g.skills)
        .filter((s) => selected.includes(s.id))
        .reduce((sum, s) => sum + s.available, 0)
    : visibleGroups.flatMap((g) => g.skills).reduce((sum, s) => sum + s.available, 0);

  function toggleSkill(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }

  const estimatedMinutes = Math.round(count * 1.4);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="section" value={section} />
      <input type="hidden" name="count" value={count} />
      <input type="hidden" name="minDifficulty" value={minDifficulty} />
      <input type="hidden" name="maxDifficulty" value={maxDifficulty} />
      {patternFirst ? <input type="hidden" name="requirePatternGuess" value="on" /> : null}
      {selected.map((id) => (
        <input key={id} type="hidden" name="skillIds" value={id} />
      ))}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* ------------------------------------------------------ mode */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Session type</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 pt-3">
            {[
              {
                value: "drill",
                label: "Adaptive drill",
                icon: Target,
                description: "Mixed questions, weighted towards your weak skills.",
              },
              {
                value: "weakness",
                label: "Weakness session",
                icon: Zap,
                description: "Heavily concentrated on the highest-value gaps.",
              },
              {
                value: "review",
                label: "Spaced review",
                icon: RotateCcw,
                description:
                  dueReviewCount > 0
                    ? `${dueReviewCount} question${dueReviewCount === 1 ? "" : "s"} due now.`
                    : "Nothing due; this falls back to weak-skill practice.",
              },
            ].map((option) => {
              const Icon = option.icon;
              const active = kind === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setKind(option.value)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-[var(--radius-control)] border px-3 py-2.5 text-left transition-colors",
                    active ? "border-accent bg-accent-soft" : "hover:bg-surface-hover",
                  )}
                >
                  <Icon
                    className={cn("mt-0.5 h-4 w-4 shrink-0", active ? "text-accent" : "text-text-subtle")}
                  />
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-xs font-medium",
                        active ? "text-accent" : "text-text-base",
                      )}
                    >
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-relaxed text-text-muted">
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}

            <label className="mt-2 flex cursor-pointer items-start gap-2.5 rounded-[var(--radius-control)] border bg-bg-sunken px-3 py-2.5">
              <input
                type="checkbox"
                checked={patternFirst}
                onChange={(event) => setPatternFirst(event.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 accent-[var(--accent)]"
              />
              <span>
                <span className="block text-xs font-medium text-text-base">
                  Name the pattern first
                </span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-text-muted">
                  Identify the question type before you may solve it, so recognition time is
                  measured separately.
                </span>
              </span>
            </label>
          </CardBody>
        </Card>

        {/* -------------------------------------------------- parameters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Scope</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4 pt-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="section-select">Section</Label>
                <Select
                  id="section-select"
                  value={section}
                  onChange={(event) => {
                    setSection(event.target.value);
                    setSelected([]);
                  }}
                >
                  <option value="both">Both sections</option>
                  <option value="reading_writing">Reading and Writing</option>
                  <option value="math">Maths</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="count-select">Questions</Label>
                <Select
                  id="count-select"
                  value={String(count)}
                  onChange={(event) => setCount(Number(event.target.value))}
                >
                  {[5, 8, 12, 16, 20, 27, 32].map((value) => (
                    <option key={value} value={value}>
                      {value} questions
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Difficulty</Label>
                <div className="flex items-center gap-2">
                  <Select
                    aria-label="Minimum difficulty"
                    value={String(minDifficulty)}
                    onChange={(event) => setMinDifficulty(Number(event.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                  <span className="text-xs text-text-subtle">to</span>
                  <Select
                    aria-label="Maximum difficulty"
                    value={String(maxDifficulty)}
                    onChange={(event) => setMaxDifficulty(Number(event.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>
                  Skills{" "}
                  {selected.length > 0 ? (
                    <span className="text-text-subtle">({selected.length} selected)</span>
                  ) : (
                    <span className="text-text-subtle">(all, weighted adaptively)</span>
                  )}
                </Label>
                {selected.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="text-[11px] text-accent hover:underline"
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              <div className="max-h-72 space-y-3 overflow-y-auto rounded-[var(--radius-control)] border bg-bg-sunken p-3">
                {visibleGroups.map((group) => (
                  <div key={group.id}>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-subtle">
                      {group.name}
                      <span className="ml-1.5 font-normal normal-case tracking-normal">
                        {group.sectionLabel}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => {
                        const active = selected.includes(skill.id);
                        const unavailable = skill.available === 0;
                        return (
                          <button
                            key={skill.id}
                            type="button"
                            disabled={unavailable}
                            onClick={() => toggleSkill(skill.id)}
                            title={
                              unavailable
                                ? "No questions available for this skill yet"
                                : `${skill.available} questions, mastery ${skill.mastery}%`
                            }
                            className={cn(
                              "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                              active
                                ? "border-accent bg-accent text-accent-contrast"
                                : unavailable
                                  ? "cursor-not-allowed opacity-40"
                                  : "text-text-muted hover:bg-surface-hover hover:text-text-base",
                            )}
                          >
                            {skill.name}
                            <span className={cn("ml-1", active ? "opacity-70" : "text-text-subtle")}>
                              {skill.available}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {state.error ? (
              <p role="alert" className="text-xs text-wrong">
                {state.error}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" id="start-session" variant="primary" size="lg" disabled={pending}>
                {pending ? "Building session..." : "Start session"}
              </Button>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-text-subtle">
                <Badge tone="neutral">~{estimatedMinutes} min</Badge>
                <Badge tone="neutral">{availableInSelection} questions in scope</Badge>
                <span>Daily target is {defaultMinutes} min.</span>
              </div>
            </div>

            {availableInSelection < count ? (
              <Notice tone="warning">
                Only {availableInSelection} question{availableInSelection === 1 ? "" : "s"} match
                this scope, so the session will be shorter than {count}. Widen the selection, or
                import more material in the Question Bank.
              </Notice>
            ) : null}
          </CardBody>
        </Card>
      </div>
    </form>
  );
}
