import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, RotateCcw, Target } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  daysUntil,
  getActivitySummary,
  getScoreEstimate,
  getSectionAccuracy,
  getTodayPlanDay,
  getWeaknesses,
} from "@/lib/queries";
import { DOMAINS } from "@/lib/domain/taxonomy";
import { gapToTarget } from "@/lib/domain/scoring";
import { PLAN_FOCUS_LABEL, SECTION_LABEL, type PlanFocus } from "@/lib/domain/enums";
import {
  AccuracyTrend,
  DomainAccuracy,
  SectionComparison,
  type DomainAccuracyPoint,
} from "@/components/charts";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  Notice,
  ProgressBar,
  Stat,
  buttonClass,
} from "@/components/ui";

export const metadata = { title: "Command Centre" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  const [estimate, activity, sections, weaknesses, planToday, domainRows] = await Promise.all([
    getScoreEstimate(user.id),
    getActivitySummary(user.id),
    getSectionAccuracy(user.id),
    getWeaknesses(user.id, user.settings.targetScore),
    getTodayPlanDay(user.id),
    prisma.attempt.findMany({
      where: { userId: user.id },
      select: { isCorrect: true, question: { select: { skillId: true, section: true } } },
    }),
  ]);

  // Aggregate attempts up to domain level for the accuracy chart.
  const skillToDomain = new Map(
    DOMAINS.flatMap((d) => d.skills.map((s) => [s.id, d])),
  );
  const domainTally = new Map<string, { correct: number; attempts: number }>();
  for (const row of domainRows) {
    const domain = skillToDomain.get(row.question.skillId);
    if (!domain) continue;
    const bucket = domainTally.get(domain.id) ?? { correct: 0, attempts: 0 };
    bucket.attempts += 1;
    if (row.isCorrect) bucket.correct += 1;
    domainTally.set(domain.id, bucket);
  }
  const domainAccuracy: DomainAccuracyPoint[] = DOMAINS.map((domain) => {
    const tally = domainTally.get(domain.id) ?? { correct: 0, attempts: 0 };
    return {
      domain: domain.name,
      accuracy: tally.attempts > 0 ? tally.correct / tally.attempts : 0,
      attempts: tally.attempts,
      section: domain.section,
    };
  });

  const days = daysUntil(user.settings.testDate);
  const gap = estimate.reliable ? gapToTarget(estimate.total, user.settings.targetScore) : null;
  const topWeaknesses = weaknesses.filter((w) => w.expectedGain > 0).slice(0, 4);
  const minutesTarget = user.settings.dailyMinutes;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            {user.name ? `Afternoon, ${user.name.split(" ")[0]}` : "Command Centre"}
          </h1>
          <p className="mt-1 text-xs text-text-muted">
            {activity.totalAttempts === 0
              ? "Nothing logged yet. Start a drill and the dashboard fills in."
              : `${activity.totalAttempts} questions answered on this instance.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/practice" className={buttonClass("primary")}>
            Start practising
          </Link>
          {activity.dueReviewCount > 0 ? (
            <Link href="/practice?mode=review" className={buttonClass("secondary")}>
              <RotateCcw className="h-3.5 w-3.5" />
              {activity.dueReviewCount} due
            </Link>
          ) : null}
        </div>
      </div>

      {/* ---------------------------------------------------- headline row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat
              label="Estimated score"
              tone="accent"
              value={estimate.reliable ? estimate.total : "--"}
              sub={
                estimate.reliable
                  ? `95% range ${estimate.lower} to ${estimate.upper}`
                  : "Not enough data yet"
              }
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat
              label="Target"
              value={user.settings.targetScore}
              sub={
                gap === null
                  ? "Set once you have a baseline"
                  : gap === 0
                    ? "Estimate is at or above target"
                    : `${gap} points to find`
              }
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat
              label="Days to test"
              tone={days !== null && days <= 14 ? "warning" : "neutral"}
              value={days === null ? "--" : days < 0 ? "past" : days}
              sub={
                user.settings.testDate
                  ? user.settings.testDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "No test date set"
              }
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat
              label="Today"
              value={`${activity.minutesToday}m`}
              sub={`${activity.attemptsToday} questions · target ${minutesTarget}m`}
            />
            <ProgressBar
              className="mt-3"
              value={activity.minutesToday}
              max={minutesTarget}
              tone={activity.minutesToday >= minutesTarget ? "correct" : "accent"}
              label="Minutes practised today against today's target"
            />
          </CardBody>
        </Card>
      </div>

      {!user.settings.testDate ? (
        <Notice tone="warning">
          No test date is set, so the study planner cannot work out how long you have.{" "}
          <Link href="/settings" className="font-medium underline">
            Add your test date
          </Link>
          .
        </Notice>
      ) : null}

      <Notice>
        <span className="font-medium">How the estimate is produced.</span>{" "}
        {estimate.caveat} It is computed from a Rasch model over your recent attempts, and the
        range accounts for both sampling error and the fact that this platform&apos;s question
        difficulties are not calibrated against real exam forms.
      </Notice>

      {/* ------------------------------------------------- today and charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Last seven days</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                Accuracy per day. Days with no practice are left as gaps, not plotted as zero.
              </p>
            </div>
            <Badge tone={activity.streakDays > 0 ? "accent" : "neutral"}>
              <Flame className="h-3 w-3" />
              {activity.streakDays} day streak
            </Badge>
          </CardHeader>
          <CardBody className="pt-3">
            <AccuracyTrend data={activity.lastSevenDays} />
            <Divider className="my-4" />
            <div className="grid grid-cols-3 gap-4">
              <Stat label="Questions this week" value={activity.attemptsThisWeek} />
              <Stat label="Minutes this week" value={activity.minutesThisWeek} />
              <Stat
                label="Open errors"
                tone={activity.openErrorCount > 0 ? "warning" : "neutral"}
                value={activity.openErrorCount}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Today&apos;s plan</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                {planToday?.plan
                  ? "From your active study plan."
                  : "No active plan yet."}
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            {planToday?.day ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge tone="accent">
                    {PLAN_FOCUS_LABEL[planToday.day.focus as PlanFocus] ?? planToday.day.focus}
                  </Badge>
                  <span className="text-xs text-text-muted">
                    {planToday.day.targetMinutes} min
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-text-muted">
                  {planToday.day.theme}
                </p>
                <ul className="space-y-2">
                  {planToday.day.assignments.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="flex items-start justify-between gap-2 rounded-[var(--radius-control)] border bg-bg-sunken px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-text-base">
                          {assignment.title}
                        </p>
                        <p className="text-[11px] text-text-subtle">
                          {assignment.questionCount} questions &middot;{" "}
                          {assignment.targetMinutes} min
                        </p>
                      </div>
                      {assignment.status === "done" ? (
                        <Badge tone="correct">Done</Badge>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <Link href="/plan" className={`${buttonClass("secondary", "sm")} w-full`}>
                  Open plan
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs leading-relaxed text-text-muted">
                  {planToday?.plan
                    ? "Your plan has no entry for today. It may have ended, or today is a rest day."
                    : "Generate a plan and the days between now and your test date are laid out, scaled to the time you actually have."}
                </p>
                <Link href="/plan" className={`${buttonClass("primary", "sm")} w-full`}>
                  <CalendarDays className="h-3.5 w-3.5" />
                  {planToday?.plan ? "Open plan" : "Build a study plan"}
                </Link>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* --------------------------------------------- accuracy and weakness */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Accuracy by section</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                Lifetime accuracy and mean time per question.
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-4">
            <SectionComparison data={sections} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Accuracy by domain</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                Ranked highest to lowest. Only domains you have attempted appear.
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <DomainAccuracy data={domainAccuracy} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Where the points are</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              Ranked by points recoverable against your {user.settings.targetScore} target, not by
              how weak the skill is. A small gap in a heavily tested skill beats a large gap in a
              rare one.
            </p>
          </div>
          <Link href="/weaknesses" className={buttonClass("ghost", "sm")}>
            All weaknesses
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardBody className="pt-3">
          {topWeaknesses.length === 0 ? (
            <p className="py-6 text-center text-xs text-text-subtle">
              Nothing to rank yet. Answer questions across a few skills and the detector will have
              something to work with.
            </p>
          ) : (
            <ul className="space-y-2">
              {topWeaknesses.map((weakness) => (
                <li
                  key={weakness.skillId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-control)] border bg-bg-sunken px-3 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-medium text-text-base">{weakness.skillName}</p>
                      <Badge tone="neutral">{SECTION_LABEL[weakness.section]}</Badge>
                      {weakness.blindSpot ? <Badge tone="warning">Blind spot</Badge> : null}
                      {weakness.speedProblem ? <Badge tone="warning">Too slow</Badge> : null}
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                      {weakness.reason}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="numeric text-sm font-semibold text-accent">
                        +{Math.round(weakness.expectedGain)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-text-subtle">
                        points
                      </p>
                    </div>
                    <Link
                      href={`/practice?skill=${weakness.skillId}`}
                      className={buttonClass("secondary", "sm")}
                    >
                      <Target className="h-3.5 w-3.5" />
                      Drill
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
