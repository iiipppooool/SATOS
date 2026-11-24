import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Timer, X } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { readSessionConfig } from "@/lib/practice";
import { SECTION_LABEL, SESSION_KIND_LABEL, type SessionKind } from "@/lib/domain/enums";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  Notice,
  Stat,
  buttonClass,
} from "@/components/ui";

export const metadata = { title: "Session summary" };
export const dynamic = "force-dynamic";

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const user = await requireUser();

  const session = await prisma.practiceSession.findFirst({
    where: { id: sessionId, userId: user.id },
  });
  if (!session) notFound();

  const attempts = await prisma.attempt.findMany({
    where: { sessionId: session.id },
    orderBy: { createdAt: "asc" },
    include: {
      question: {
        select: {
          id: true,
          stem: true,
          section: true,
          difficulty: true,
          patternName: true,
          expectedSeconds: true,
          skill: { select: { name: true } },
        },
      },
    },
  });

  const config = readSessionConfig(session.config);
  const answered = attempts.length;
  const correct = attempts.filter((a) => a.isCorrect).length;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const totalMs = attempts.reduce((sum, a) => sum + a.totalMs, 0);
  const avgMs = answered > 0 ? Math.round(totalMs / answered) : 0;

  const overTime = attempts.filter(
    (a) => a.totalMs > a.question.expectedSeconds * 1000 * 1.5,
  );
  const patternAttempts = attempts.filter((a) => a.patternGuessCorrect !== null);
  const patternHits = patternAttempts.filter((a) => a.patternGuessCorrect === true).length;

  const wrong = attempts.filter((a) => !a.isCorrect);

  // Skills seen in this session, so the follow-up drill button is useful.
  const skillCounts = new Map<string, number>();
  for (const attempt of wrong) {
    const name = attempt.question.skill.name;
    skillCounts.set(name, (skillCounts.get(name) ?? 0) + 1);
  }
  const worstSkill = [...skillCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
            {SESSION_KIND_LABEL[session.kind as SessionKind] ?? session.kind} complete
          </p>
          <h1 className="text-lg font-semibold tracking-tight">Session summary</h1>
          <p className="mt-1 text-xs text-text-muted">
            {session.startedAt.toLocaleString("en-GB", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/practice" className={buttonClass("primary")}>
            Practise again
          </Link>
          <Link href="/errors" className={buttonClass("secondary")}>
            Error log
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat
              label="Accuracy"
              tone={accuracy >= 85 ? "correct" : accuracy >= 65 ? "neutral" : "wrong"}
              value={`${accuracy}%`}
              sub={`${correct} of ${answered} correct`}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Time"
              value={`${Math.round(totalMs / 60000)}m`}
              sub={`${Math.round(avgMs / 1000)}s per question`}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Over target time"
              tone={overTime.length > answered / 3 ? "warning" : "neutral"}
              value={overTime.length}
              sub="More than 50% above the expected time"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Pattern recognition"
              value={
                patternAttempts.length > 0
                  ? `${Math.round((patternHits / patternAttempts.length) * 100)}%`
                  : "--"
              }
              sub={
                patternAttempts.length > 0
                  ? `${patternHits} of ${patternAttempts.length} identified`
                  : "Not measured in this session"
              }
            />
          </CardBody>
        </Card>
      </div>

      {config && answered < config.questionIds.length ? (
        <Notice tone="warning">
          This session was finished early: {answered} of {config.questionIds.length} questions were
          answered. The unanswered ones were not recorded either way.
        </Notice>
      ) : null}

      {overTime.length > 0 && accuracy >= 80 ? (
        <Notice tone="warning">
          Your accuracy is solid but {overTime.length} question
          {overTime.length === 1 ? " took" : "s took"} well over the target time. On a timed module
          that is what turns into wrong answers elsewhere, so this is a pacing problem rather than a
          knowledge one.
        </Notice>
      ) : null}

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Every question in this session</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              Timing is shown against each question&apos;s expected time.
            </p>
          </div>
          {worstSkill ? (
            <Link
              href={`/practice?skill=${
                attempts.find((a) => a.question.skill.name === worstSkill[0])?.question.id ?? ""
              }`}
              className={buttonClass("ghost", "sm")}
            >
              Drill {worstSkill[0]}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </CardHeader>
        <CardBody className="pt-3">
          <ul className="divide-y">
            {attempts.map((attempt, position) => {
              const expected = attempt.question.expectedSeconds * 1000;
              const slow = attempt.totalMs > expected * 1.5;
              return (
                <li key={attempt.id} className="flex items-start gap-3 py-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      attempt.isCorrect ? "bg-correct-soft text-correct" : "bg-wrong-soft text-wrong"
                    }`}
                  >
                    {attempt.isCorrect ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs leading-relaxed text-text-base">
                      <span className="text-text-subtle">{position + 1}. </span>
                      {attempt.question.stem}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <Badge tone="neutral">{attempt.question.skill.name}</Badge>
                      <Badge tone="neutral">
                        {SECTION_LABEL[attempt.question.section as "math" | "reading_writing"]}
                      </Badge>
                      {attempt.question.patternName ? (
                        <Badge tone="neutral">{attempt.question.patternName}</Badge>
                      ) : null}
                      {attempt.skipped ? <Badge tone="warning">Skipped</Badge> : null}
                      {attempt.confidence === "guess" && attempt.isCorrect ? (
                        <Badge tone="warning">Lucky guess</Badge>
                      ) : null}
                    </div>
                  </div>
                  <span
                    className={`numeric flex shrink-0 items-center gap-1 text-xs ${
                      slow ? "text-warning" : "text-text-muted"
                    }`}
                  >
                    <Timer className="h-3 w-3" />
                    {Math.round(attempt.totalMs / 1000)}s
                    <span className="text-text-subtle">
                      /{attempt.question.expectedSeconds}s
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          {wrong.length > 0 ? (
            <>
              <Divider className="my-4" />
              <p className="text-xs text-text-muted">
                {wrong.length} question{wrong.length === 1 ? "" : "s"} went into your error log and
                will be reintroduced by spaced repetition. Classify any that are still
                unclassified, otherwise the weakness detector cannot tell a concept gap from a
                careless slip.
              </p>
            </>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
