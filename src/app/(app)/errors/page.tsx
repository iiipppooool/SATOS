import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  ERROR_CATEGORY_FIX,
  ERROR_CATEGORY_LABEL,
  SECTION_LABEL,
  type ErrorCategory,
} from "@/lib/domain/enums";
import { ErrorList } from "./list";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  Notice,
  SectionHeading,
  Stat,
  buttonClass,
} from "@/components/ui";

export const metadata = { title: "Error Log" };
export const dynamic = "force-dynamic";

export default async function ErrorsPage({
  searchParams,
}: {
  searchParams: Promise<{ show?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const showResolved = params.show === "resolved";

  const entries = await prisma.errorLogEntry.findMany({
    where: { userId: user.id, resolved: showResolved },
    orderBy: { createdAt: "desc" },
    take: 150,
    include: {
      question: {
        select: {
          id: true,
          stem: true,
          section: true,
          difficulty: true,
          patternName: true,
          explanation: true,
          skill: { select: { id: true, name: true } },
        },
      },
      attempt: { select: { answerText: true, totalMs: true, confidence: true } },
    },
  });

  const [openCount, resolvedCount, byCategory] = await Promise.all([
    prisma.errorLogEntry.count({ where: { userId: user.id, resolved: false } }),
    prisma.errorLogEntry.count({ where: { userId: user.id, resolved: true } }),
    prisma.errorLogEntry.groupBy({
      by: ["category"],
      where: { userId: user.id },
      _count: { _all: true },
    }),
  ]);

  const unclassified = byCategory.find((row) => row.category === "unknown")?._count._all ?? 0;

  const ranked = byCategory
    .filter((row) => row.category !== "unknown")
    .sort((a, b) => b._count._all - a._count._all);
  const dominant = ranked[0];

  const rows = entries.map((entry) => ({
    id: entry.id,
    category: entry.category as ErrorCategory,
    note: entry.note,
    resolved: entry.resolved,
    createdAt: entry.createdAt.toISOString(),
    questionId: entry.question.id,
    stem: entry.question.stem,
    section: entry.question.section,
    sectionLabel: SECTION_LABEL[entry.question.section as "math" | "reading_writing"],
    difficulty: entry.question.difficulty,
    patternName: entry.question.patternName,
    explanation: entry.question.explanation,
    skillId: entry.question.skill.id,
    skillName: entry.question.skill.name,
    answerText: entry.attempt?.answerText ?? null,
    seconds: entry.attempt ? Math.round(entry.attempt.totalMs / 1000) : null,
    confidence: entry.attempt?.confidence ?? null,
  }));

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Error Log"
        description="Every wrong answer lands here automatically. Classifying each one by cause is what turns a list of mistakes into something the weakness detector can act on, because a concept gap and a careless slip need completely different fixes."
        action={
          <div className="flex gap-2">
            <Link
              href="/errors"
              className={buttonClass(showResolved ? "ghost" : "secondary", "sm")}
            >
              Open ({openCount})
            </Link>
            <Link
              href="/errors?show=resolved"
              className={buttonClass(showResolved ? "secondary" : "ghost", "sm")}
            >
              Resolved ({resolvedCount})
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat
              label="Open errors"
              tone={openCount > 0 ? "warning" : "correct"}
              value={openCount}
              sub="Not yet worked through"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Unclassified"
              tone={unclassified > 0 ? "warning" : "correct"}
              value={unclassified}
              sub="Classify these to make the log useful"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Most common cause"
              value={
                dominant
                  ? ERROR_CATEGORY_LABEL[dominant.category as ErrorCategory] ?? dominant.category
                  : "--"
              }
              sub={dominant ? `${dominant._count._all} occurrences` : "Nothing classified yet"}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat label="Resolved" tone="correct" value={resolvedCount} sub="Worked through" />
          </CardBody>
        </Card>
      </div>

      {dominant ? (
        <Notice tone="accent">
          <span className="font-medium">
            Your most frequent cause is {ERROR_CATEGORY_LABEL[dominant.category as ErrorCategory]}.
          </span>{" "}
          {ERROR_CATEGORY_FIX[dominant.category as ErrorCategory]}
        </Notice>
      ) : null}

      {ranked.length > 0 ? (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Causes, by frequency</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <ul className="space-y-1.5">
              {ranked.map((row) => {
                const total = ranked.reduce((sum, r) => sum + r._count._all, 0);
                const pct = total > 0 ? Math.round((row._count._all / total) * 100) : 0;
                return (
                  <li key={row.category} className="flex items-center gap-3">
                    <span className="w-44 shrink-0 text-xs text-text-base">
                      {ERROR_CATEGORY_LABEL[row.category as ErrorCategory] ?? row.category}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-sunken">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="numeric w-16 shrink-0 text-right text-xs text-text-muted">
                      {row._count._all} ({pct}%)
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      ) : null}

      {rows.length === 0 ? (
        <EmptyState
          title={showResolved ? "Nothing resolved yet" : "No open errors"}
          description={
            showResolved
              ? "Entries you mark as resolved will be listed here."
              : "Either you have not practised yet, or you have worked through everything. Both are fine, but only one of them means you are ready."
          }
          action={
            <Link href="/practice" className={buttonClass("primary", "sm")}>
              Start practising
            </Link>
          }
        />
      ) : (
        <ErrorList entries={rows} />
      )}
    </div>
  );
}
