import { Zap } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getWeaknesses } from "@/lib/queries";
import { SECTION_LABEL } from "@/lib/domain/enums";
import { TrainerLauncher } from "./launcher";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Notice,
  SectionHeading,
  Stat,
} from "@/components/ui";

export const metadata = { title: "Pattern Trainer" };
export const dynamic = "force-dynamic";

export default async function TrainerPage() {
  const user = await requireUser();

  const [patternRows, recognitionAttempts] = await Promise.all([
    prisma.question.groupBy({
      by: ["patternName"],
      where: { active: true, patternName: { not: null } },
      _count: { _all: true },
    }),
    prisma.attempt.findMany({
      where: { userId: user.id, patternGuessCorrect: { not: null } },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        patternGuessCorrect: true,
        recognitionMs: true,
        question: { select: { patternName: true, section: true } },
      },
    }),
  ]);

  const weaknesses = await getWeaknesses(user.id, user.settings.targetScore);

  const totalPatterns = patternRows.length;
  const attempted = recognitionAttempts.length;
  const hits = recognitionAttempts.filter((a) => a.patternGuessCorrect === true).length;
  const hitRate = attempted > 0 ? Math.round((hits / attempted) * 100) : null;

  const timed = recognitionAttempts.filter((a) => typeof a.recognitionMs === "number");
  const avgRecognition =
    timed.length > 0
      ? Math.round(timed.reduce((s, a) => s + (a.recognitionMs ?? 0), 0) / timed.length / 1000)
      : null;

  // Per-pattern recognition record, so the weakest patterns are visible.
  const byPattern = new Map<string, { seen: number; hit: number }>();
  for (const attempt of recognitionAttempts) {
    const name = attempt.question.patternName;
    if (!name) continue;
    const bucket = byPattern.get(name) ?? { seen: 0, hit: 0 };
    bucket.seen += 1;
    if (attempt.patternGuessCorrect) bucket.hit += 1;
    byPattern.set(name, bucket);
  }
  const weakestPatterns = [...byPattern.entries()]
    .filter(([, v]) => v.seen >= 2)
    .map(([name, v]) => ({ name, seen: v.seen, rate: v.hit / v.seen }))
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 6);

  const unseenPatterns = patternRows
    .map((row) => row.patternName)
    .filter((name): name is string => Boolean(name))
    .filter((name) => !byPattern.has(name));

  const prioritySkills = weaknesses
    .filter((w) => w.expectedGain > 0)
    .slice(0, 8)
    .map((w) => ({
      id: w.skillId,
      name: w.skillName,
      section: SECTION_LABEL[w.section],
    }));

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Pattern Recognition Trainer"
        description="Most lost marks at this level are not knowledge failures. You know how to solve the question; you spent twenty seconds working out what kind of question it was. This trainer separates those two clocks: you name the pattern first, then solve, and both times are recorded against the skill."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat
              label="Recognition rate"
              tone={hitRate === null ? "neutral" : hitRate >= 80 ? "correct" : "warning"}
              value={hitRate === null ? "--" : `${hitRate}%`}
              sub={
                attempted > 0
                  ? `${hits} of ${attempted} identified`
                  : "No pattern attempts recorded"
              }
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Mean recognition time"
              value={avgRecognition === null ? "--" : `${avgRecognition}s`}
              sub="Time before committing to a method"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Patterns in the bank"
              value={totalPatterns}
              sub={`${byPattern.size} encountered so far`}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Never seen"
              tone={unseenPatterns.length > 0 ? "warning" : "correct"}
              value={unseenPatterns.length}
              sub="Patterns you have not met in a trainer session"
            />
          </CardBody>
        </Card>
      </div>

      <TrainerLauncher prioritySkills={prioritySkills} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Patterns you misidentify</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                Only patterns seen at least twice are ranked, since one miss is noise.
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            {weakestPatterns.length === 0 ? (
              <p className="py-6 text-center text-xs text-text-subtle">
                Run a few trainer sessions and the patterns you keep misreading will be listed
                here.
              </p>
            ) : (
              <ul className="space-y-2">
                {weakestPatterns.map((pattern) => (
                  <li
                    key={pattern.name}
                    className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] border bg-bg-sunken px-3 py-2"
                  >
                    <span className="min-w-0 truncate text-xs text-text-base">{pattern.name}</span>
                    <span className="numeric shrink-0 text-xs font-medium text-text-muted">
                      {Math.round(pattern.rate * 100)}%
                      <span className="text-text-subtle"> of {pattern.seen}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Patterns you have never met</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                An unseen pattern is an unknown, not a strength.
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            {unseenPatterns.length === 0 ? (
              <Notice tone="accent">
                You have encountered every pattern in the bank at least once in a trainer session.
              </Notice>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {unseenPatterns.slice(0, 24).map((name) => (
                  <span
                    key={name}
                    className="rounded-full border px-2.5 py-1 text-[11px] text-text-muted"
                  >
                    {name}
                  </span>
                ))}
                {unseenPatterns.length > 24 ? (
                  <span className="px-1 py-1 text-[11px] text-text-subtle">
                    and {unseenPatterns.length - 24} more
                  </span>
                ) : null}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <Notice>
        <span className="font-medium">
          <Zap className="mr-1 inline h-3 w-3" />
          How recognition is graded.
        </span>{" "}
        You are shown the question and a shortlist of pattern names before you may answer. The
        clock up to that choice is recorded as recognition time, and the rest as solving time. A
        correct answer reached without recognising the pattern is graded lower by the spaced
        repetition scheduler than one where you named it first, because the first will not survive
        time pressure.
      </Notice>
    </div>
  );
}
