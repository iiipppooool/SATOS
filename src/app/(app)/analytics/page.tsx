import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getActivitySummary,
  getPacingReport,
  getScoreEstimate,
  getSectionAccuracy,
  getWeaknesses,
} from "@/lib/queries";
import { PacingReportView } from "@/components/pacing-report";
import { DOMAINS } from "@/lib/domain/taxonomy";
import { ERROR_CATEGORY_LABEL, SECTION_LABEL, type ErrorCategory } from "@/lib/domain/enums";
import {
  AccuracyTrend,
  DomainAccuracy,
  ScoreTrend,
  SectionComparison,
  type DomainAccuracyPoint,
  type ScorePoint,
} from "@/components/charts";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Notice,
  SectionHeading,
  Stat,
} from "@/components/ui";

export const metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const user = await requireUser();

  const [estimate, activity, sections, weaknesses, attempts, snapshots, errorsByCategory, pacing] =
    await Promise.all([
      getScoreEstimate(user.id),
      getActivitySummary(user.id),
      getSectionAccuracy(user.id),
      getWeaknesses(user.id, user.settings.targetScore),
      prisma.attempt.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
        select: {
          isCorrect: true,
          totalMs: true,
          recognitionMs: true,
          confidence: true,
          patternGuessCorrect: true,
          createdAt: true,
          question: {
            select: {
              skillId: true,
              section: true,
              difficulty: true,
              expectedSeconds: true,
            },
          },
        },
      }),
      prisma.scoreSnapshot.findMany({
        where: { userId: user.id },
        orderBy: { takenAt: "asc" },
        take: 60,
      }),
      prisma.errorLogEntry.groupBy({
        by: ["category"],
        where: { userId: user.id },
        _count: { _all: true },
      }),
      getPacingReport(user.id),
    ]);

  // Accuracy by domain.
  const skillToDomain = new Map(DOMAINS.flatMap((d) => d.skills.map((s) => [s.id, d])));
  const domainTally = new Map<string, { correct: number; attempts: number }>();
  for (const attempt of attempts) {
    const domain = skillToDomain.get(attempt.question.skillId);
    if (!domain) continue;
    const bucket = domainTally.get(domain.id) ?? { correct: 0, attempts: 0 };
    bucket.attempts += 1;
    if (attempt.isCorrect) bucket.correct += 1;
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

  // Accuracy by authored difficulty: the shape of this tells you whether the
  // ceiling is knowledge or nerve.
  const byDifficulty = [1, 2, 3, 4, 5].map((level) => {
    const rows = attempts.filter((a) => a.question.difficulty === level);
    const correct = rows.filter((a) => a.isCorrect).length;
    return {
      level,
      attempts: rows.length,
      accuracy: rows.length > 0 ? correct / rows.length : 0,
    };
  });

  const timed = attempts.filter((a) => a.question.expectedSeconds > 0);
  const overTime = timed.filter(
    (a) => a.totalMs > a.question.expectedSeconds * 1000 * 1.5,
  ).length;
  const avgSeconds =
    attempts.length > 0
      ? Math.round(attempts.reduce((s, a) => s + a.totalMs, 0) / attempts.length / 1000)
      : 0;

  const recognitionRows = attempts.filter((a) => typeof a.recognitionMs === "number");
  const avgRecognition =
    recognitionRows.length > 0
      ? Math.round(
          recognitionRows.reduce((s, a) => s + (a.recognitionMs ?? 0), 0) /
            recognitionRows.length /
            1000,
        )
      : null;

  const guessedCorrect = attempts.filter(
    (a) => a.confidence === "guess" && a.isCorrect,
  ).length;
  const confidentWrong = attempts.filter(
    (a) => a.confidence === "confident" && !a.isCorrect,
  ).length;

  const scoreHistory: ScorePoint[] = snapshots.map((snapshot) => ({
    date: snapshot.takenAt.toISOString().slice(0, 10),
    total: snapshot.total,
    lower: snapshot.lowerBound,
    upper: snapshot.upperBound,
  }));

  const topErrors = errorsByCategory
    .filter((row) => row.category !== "unknown")
    .sort((a, b) => b._count._all - a._count._all)
    .slice(0, 5);

  const consistency = activity.lastSevenDays.filter((d) => d.attempts > 0).length;

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Performance Analytics"
        description="Accuracy, timing, recognition speed and consistency. Every score here is an estimate from your own practice, and the confidence ranges are shown rather than hidden."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat
              label="Estimated total"
              tone="accent"
              value={estimate.reliable ? estimate.total : "--"}
              sub={
                estimate.reliable
                  ? `${estimate.lower} to ${estimate.upper} · ${estimate.readingWriting.quality}`
                  : "Not enough data"
              }
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Mean time per question"
              value={`${avgSeconds}s`}
              sub={`${overTime} answers over 150% of target`}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Mean recognition time"
              value={avgRecognition === null ? "--" : `${avgRecognition}s`}
              sub="From trainer sessions only"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Study consistency"
              tone={consistency >= 5 ? "correct" : consistency >= 3 ? "warning" : "wrong"}
              value={`${consistency}/7`}
              sub="Days practised in the last week"
            />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Estimated score over time</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                The shaded band is the 95% range, not decoration. Plotting the midpoint alone
                would imply precision this method does not have.
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <ScoreTrend data={scoreHistory} target={user.settings.targetScore} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Daily accuracy</CardTitle>
              <p className="mt-1 text-xs text-text-muted">The last seven days.</p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <AccuracyTrend data={activity.lastSevenDays} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>By section</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="pt-4">
            <SectionComparison data={sections} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>By domain</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <DomainAccuracy data={domainAccuracy} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Accuracy by difficulty</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                A flat line across difficulties usually means carelessness rather than a knowledge
                ceiling. A sharp drop at 4 and 5 means the opposite.
              </p>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 pt-3">
            {byDifficulty.map((row) => (
              <div key={row.level} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-xs text-text-muted">Level {row.level}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-sunken">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${Math.round(row.accuracy * 100)}%` }}
                  />
                </div>
                <span className="numeric w-24 shrink-0 text-right text-xs text-text-muted">
                  {row.attempts > 0 ? `${Math.round(row.accuracy * 100)}%` : "--"}
                  <span className="text-text-subtle"> of {row.attempts}</span>
                </span>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Calibration and error causes</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                Being confidently wrong is a more serious problem than guessing correctly, because
                you will not go back and check it.
              </p>
            </div>
          </CardHeader>
          <CardBody className="space-y-3 pt-3">
            <div className="grid grid-cols-2 gap-4">
              <Stat
                label="Confidently wrong"
                tone={confidentWrong > 0 ? "wrong" : "neutral"}
                value={confidentWrong}
                sub="Said confident, got it wrong"
              />
              <Stat
                label="Lucky guesses"
                tone={guessedCorrect > 0 ? "warning" : "neutral"}
                value={guessedCorrect}
                sub="Said guess, got it right"
              />
            </div>

            {topErrors.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                {topErrors.map((row) => (
                  <div key={row.category} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-text-muted">
                      {ERROR_CATEGORY_LABEL[row.category as ErrorCategory] ?? row.category}
                    </span>
                    <Badge tone="neutral">{row._count._all}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-subtle">
                No classified errors yet. Classify entries in the error log and the pattern will
                show up here.
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-text-base">Pacing</h2>
        <p className="mb-4 max-w-2xl text-xs leading-relaxed text-text-muted">
          Whether you could actually produce this accuracy inside a real timed module.
        </p>
        <PacingReportView report={pacing} />
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Skill table</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              Every skill, with mastery blended from accuracy, speed and recognition.
            </p>
          </div>
        </CardHeader>
        <CardBody className="pt-3">
          <div className="-mx-5 overflow-x-auto px-5">
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead>
                <tr className="border-b text-[10px] uppercase tracking-wider text-text-subtle">
                  <th className="pb-2 font-semibold">Skill</th>
                  <th className="pb-2 font-semibold">Section</th>
                  <th className="pb-2 text-right font-semibold">Attempts</th>
                  <th className="pb-2 text-right font-semibold">Accuracy</th>
                  <th className="pb-2 text-right font-semibold">Mean time</th>
                  <th className="pb-2 text-right font-semibold">Mastery</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {weaknesses.map((row) => (
                  <tr key={row.skillId}>
                    <td className="py-2 pr-3 text-text-base">{row.skillName}</td>
                    <td className="py-2 pr-3 text-text-subtle">
                      {SECTION_LABEL[row.section]}
                    </td>
                    <td className="numeric py-2 text-right text-text-muted">{row.attempts}</td>
                    <td className="numeric py-2 text-right text-text-muted">
                      {row.attempts > 0 ? `${Math.round(row.recentAccuracy * 100)}%` : "--"}
                    </td>
                    <td className="numeric py-2 text-right text-text-muted">
                      {row.avgSolveMs > 0 ? `${Math.round(row.avgSolveMs / 1000)}s` : "--"}
                    </td>
                    <td className="numeric py-2 text-right">
                      <span
                        className={
                          row.mastery >= 75
                            ? "text-correct"
                            : row.mastery >= 40
                              ? "text-warning"
                              : "text-text-muted"
                        }
                      >
                        {Math.round(row.mastery)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Notice>{estimate.caveat}</Notice>
    </div>
  );
}
