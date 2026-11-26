import Link from "next/link";
import { Check, X } from "lucide-react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Notice,
  Stat,
  buttonClass,
} from "@/components/ui";

interface ReviewItem {
  id: string;
  order: number;
  stem: string;
  skillName: string;
  isCorrect: boolean | null;
  flagged: boolean;
  answered: boolean;
  questionId: string;
}

interface ReviewModule {
  id: string;
  slot: string;
  label: string;
  tier: string;
  rawCorrect: number;
  total: number;
  durationSec: number;
  items: ReviewItem[];
}

export function ExamReview({
  exam,
  modules,
}: {
  exam: {
    id: string;
    label: string;
    abandoned: boolean;
    total: number | null;
    rwScaled: number | null;
    mathScaled: number | null;
    rwRaw: number | null;
    mathRaw: number | null;
    startedAt: string;
    finishedAt: string;
  };
  modules: ReviewModule[];
}) {
  const totalItems = modules.reduce((sum, m) => sum + m.items.length, 0);
  const totalCorrect = modules.reduce((sum, m) => sum + m.rawCorrect, 0);
  const unanswered = modules.reduce(
    (sum, m) => sum + m.items.filter((item) => !item.answered).length,
    0,
  );
  const minutes = Math.round(
    (new Date(exam.finishedAt).getTime() - new Date(exam.startedAt).getTime()) / 60000,
  );

  const routedHard = modules.filter((m) => m.tier === "hard").length;
  const routedEasy = modules.filter((m) => m.tier === "easy").length;

  // Per-skill breakdown across the whole exam.
  const bySkill = new Map<string, { correct: number; total: number }>();
  for (const row of modules) {
    for (const item of row.items) {
      const bucket = bySkill.get(item.skillName) ?? { correct: 0, total: 0 };
      bucket.total += 1;
      if (item.isCorrect) bucket.correct += 1;
      bySkill.set(item.skillName, bucket);
    }
  }
  const weakest = [...bySkill.entries()]
    .filter(([, v]) => v.total >= 2)
    .map(([name, v]) => ({ name, rate: v.correct / v.total, total: v.total }))
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
            {exam.abandoned ? "Abandoned exam" : "Exam complete"}
          </p>
          <h1 className="text-lg font-semibold tracking-tight">{exam.label}</h1>
          <p className="mt-1 text-xs text-text-muted">
            {new Date(exam.startedAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            · {minutes} minutes
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/exam" className={buttonClass("secondary")}>
            Back to simulator
          </Link>
          <Link href="/errors" className={buttonClass("primary")}>
            Work through the errors
          </Link>
        </div>
      </div>

      {exam.abandoned ? (
        <Notice tone="warning">
          This exam was abandoned before it was finished, so no score was produced. Partially
          completed modules were not graded.
        </Notice>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardBody>
                <Stat
                  label="Simulated total"
                  tone="accent"
                  value={exam.total ?? "--"}
                  sub="Estimate, not an equated score"
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat
                  label="Reading and Writing"
                  value={exam.rwScaled ?? "--"}
                  sub={exam.rwRaw !== null ? `${exam.rwRaw} raw marks` : "Not attempted"}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat
                  label="Maths"
                  value={exam.mathScaled ?? "--"}
                  sub={exam.mathRaw !== null ? `${exam.mathRaw} raw marks` : "Not attempted"}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat
                  label="Accuracy"
                  value={totalItems > 0 ? `${Math.round((totalCorrect / totalItems) * 100)}%` : "--"}
                  sub={`${totalCorrect} of ${totalItems}${unanswered > 0 ? ` · ${unanswered} left blank` : ""}`}
                />
              </CardBody>
            </Card>
          </div>

          <Notice>
            <span className="font-medium">Read the routing, not just the number.</span>{" "}
            {routedHard > 0
              ? `You were routed to the harder second module ${routedHard === 2 ? "in both sections" : "once"}, which is what makes the top of the scale reachable. `
              : ""}
            {routedEasy > 0
              ? `You were routed to the easier second module ${routedEasy === 2 ? "in both sections" : "once"}, which caps that section however well you then did. The first module is where that is decided. `
              : ""}
            The total is a shaped estimate from raw marks and routing, not an equated score, so
            compare it with your own earlier simulator runs rather than treating it as a
            prediction.
          </Notice>

          {unanswered > 0 ? (
            <Notice tone="warning">
              {unanswered} question{unanswered === 1 ? " was" : "s were"} left blank. There is no
              penalty for a wrong answer on the SAT, so a blank is always worse than a guess. If
              these were time, that is a pacing problem worth drilling.
            </Notice>
          ) : null}
        </>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <div>
                <CardTitle>{module.label}</CardTitle>
                <p className="mt-1 text-xs text-text-muted">
                  {module.rawCorrect} of {module.items.length} correct
                </p>
              </div>
              <Badge tone={module.tier === "hard" ? "accent" : module.tier === "easy" ? "warning" : "neutral"}>
                {module.tier === "routing"
                  ? "Routing module"
                  : module.tier === "hard"
                    ? "Harder tier"
                    : "Easier tier"}
              </Badge>
            </CardHeader>
            <CardBody className="pt-3">
              <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
                {module.items.map((item) => (
                  <span
                    key={item.id}
                    title={`${item.order + 1}. ${item.skillName}`}
                    className={`flex h-7 items-center justify-center rounded border text-[10px] font-medium ${
                      item.isCorrect
                        ? "border-[var(--correct)]/40 bg-correct-soft text-correct"
                        : item.answered
                          ? "border-[var(--wrong)]/40 bg-wrong-soft text-wrong"
                          : "text-text-subtle"
                    }`}
                  >
                    {item.order + 1}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {weakest.length > 0 ? (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Weakest skills in this exam</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                Every question here has already been added to your error log and review schedule,
                so these will come back to you automatically.
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <ul className="space-y-2">
              {weakest.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] border bg-bg-sunken px-3 py-2"
                >
                  <span className="min-w-0 truncate text-xs text-text-base">{skill.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="numeric shrink-0 text-xs text-text-muted">
                      {Math.round(skill.rate * 100)}%
                      <span className="text-text-subtle"> of {skill.total}</span>
                    </span>
                    {skill.rate < 1 ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-wrong-soft text-wrong">
                        <X className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-correct-soft text-correct">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
