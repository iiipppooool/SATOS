"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Search, X } from "lucide-react";
import type { QuestionSource, Section } from "@/lib/domain/enums";
import { Badge, Button, Card, CardBody, Input, Select, buttonClass } from "@/components/ui";
import { cn } from "@/lib/cn";

export interface BankQuestion {
  id: string;
  stem: string;
  section: Section;
  sectionLabel: string;
  difficulty: number;
  format: string;
  patternName: string | null;
  concept: string | null;
  skillId: string;
  skillName: string;
  source: QuestionSource;
  sourceLabel: string;
  sourceNote: string;
  sourceRef: string | null;
  verified: boolean;
  expectedSeconds: number;
  seen: number;
  correct: number;
}

export function BankBrowser({
  questions,
  skills,
  collections,
  total,
  page,
  totalPages,
  filters,
}: {
  questions: BankQuestion[];
  skills: Array<{ id: string; name: string; domain: string; section: string }>;
  collections: Array<{ name: string; count: number }>;
  total: number;
  page: number;
  totalPages: number;
  filters: { q: string; section: string; skill: string; source: string; collection: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(filters.q);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`/bank?${next.toString()}`);
  }

  function goToPage(target: number) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(target));
    router.push(`/bank?${next.toString()}`);
  }

  const hasFilters =
    filters.q || filters.section || filters.skill || filters.source || filters.collection;

  const visibleSkills = filters.section
    ? skills.filter((s) => s.section === filters.section)
    : skills;

  return (
    <div className="space-y-4">
      <Card>
        <CardBody className="space-y-3">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setParam("q", query);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search stems, passages, patterns and concepts"
                className="pl-9"
                aria-label="Search the question bank"
              />
            </div>
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </form>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              aria-label="Filter by section"
              value={filters.section}
              onChange={(event) => setParam("section", event.target.value)}
            >
              <option value="">All sections</option>
              <option value="reading_writing">Reading and Writing</option>
              <option value="math">Maths</option>
            </Select>

            <Select
              aria-label="Filter by skill"
              value={filters.skill}
              onChange={(event) => setParam("skill", event.target.value)}
            >
              <option value="">All skills</option>
              {visibleSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </Select>

            <Select
              aria-label="Filter by source"
              value={filters.source}
              onChange={(event) => setParam("source", event.target.value)}
            >
              <option value="">All sources</option>
              <option value="original_authored">Authored for SAT OS</option>
              <option value="official_practice">Official practice material</option>
              <option value="user_imported">Imported by you</option>
              <option value="ai_generated">AI generated</option>
              <option value="third_party">Third-party prep</option>
              <option value="recalled_unverified">Recalled, unverified</option>
            </Select>

            <Select
              aria-label="Filter by collection"
              value={filters.collection}
              onChange={(event) => setParam("collection", event.target.value)}
            >
              <option value="">All questions</option>
              {collections.map((collection) => (
                <option key={collection.name} value={collection.name}>
                  {collection.name} ({collection.count})
                </option>
              ))}
            </Select>
          </div>

          {hasFilters ? (
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-muted">
                {total} question{total === 1 ? "" : "s"} match
              </p>
              <Link href="/bank" className={buttonClass("ghost", "sm")}>
                <X className="h-3.5 w-3.5" />
                Clear filters
              </Link>
            </div>
          ) : null}
        </CardBody>
      </Card>

      {questions.length === 0 ? (
        <Card>
          <CardBody>
            <p className="py-8 text-center text-xs text-text-subtle">
              No questions match those filters.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-2">
          {questions.map((question) => (
            <BankRow key={question.id} question={question} />
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
          >
            Previous
          </Button>
          <span className="numeric text-xs text-text-muted">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function BankRow({ question }: { question: BankQuestion }) {
  const [open, setOpen] = useState(false);
  const accuracy =
    question.seen > 0 ? Math.round((question.correct / question.seen) * 100) : null;

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
            <p className="line-clamp-2 text-xs leading-relaxed text-text-base">{question.stem}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge tone="neutral">{question.skillName}</Badge>
              <Badge tone="neutral">{question.sectionLabel}</Badge>
              <Badge tone="neutral">Difficulty {question.difficulty}</Badge>
              {question.format === "spr" ? <Badge tone="neutral">Type-in</Badge> : null}
              <Badge
                tone={
                  question.source === "original_authored" || question.source === "official_practice"
                    ? "neutral"
                    : "warning"
                }
              >
                {question.sourceLabel}
              </Badge>
              {accuracy !== null ? (
                <Badge tone={accuracy >= 70 ? "correct" : "wrong"}>
                  {accuracy}% over {question.seen}
                </Badge>
              ) : null}
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
          <div className="space-y-3 border-t px-4 py-4 text-xs">
            {question.patternName ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                  Pattern
                </p>
                <p className="mt-0.5 text-accent">{question.patternName}</p>
                {question.concept ? (
                  <p className="mt-0.5 text-text-muted">{question.concept}</p>
                ) : null}
              </div>
            ) : null}

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                Provenance
              </p>
              <p className="mt-0.5 text-text-muted">
                {question.sourceLabel}
                {question.sourceRef ? ` — ${question.sourceRef}` : ""}
                {question.verified ? (
                  <span className="ml-1.5 inline-flex items-center gap-1 text-correct">
                    <Check className="h-3 w-3" />
                    verified
                  </span>
                ) : (
                  <span className="ml-1.5 text-warning">not verified</span>
                )}
              </p>
              <p className="mt-0.5 text-text-subtle">{question.sourceNote}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href={`/practice?skill=${question.skillId}`}
                className={buttonClass("secondary", "sm")}
              >
                Drill this skill
              </Link>
              <Link
                href={`/tutor?question=${question.id}`}
                className={buttonClass("ghost", "sm")}
              >
                Ask the tutor about it
              </Link>
              <span className="self-center text-[11px] text-text-subtle">
                Expected time {question.expectedSeconds}s
              </span>
            </div>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
