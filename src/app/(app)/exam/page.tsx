import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EXAM_BLUEPRINT, SECTION_BREAK_SEC, operationalCount } from "@/lib/domain/taxonomy";
import { moduleLabel, sprShareNote } from "@/lib/exam-service";
import { ExamLauncher } from "./launcher";
import { abandonExamAction } from "./actions";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  KeyValue,
  Notice,
  SectionHeading,
  Stat,
  buttonClass,
} from "@/components/ui";

export const metadata = { title: "Exam Simulator" };
export const dynamic = "force-dynamic";

export default async function ExamPage() {
  const user = await requireUser();

  const [open, history, questionCounts] = await Promise.all([
    prisma.examAttempt.findFirst({
      where: { userId: user.id, finishedAt: null, abandoned: false },
      select: { id: true, label: true, startedAt: true },
    }),
    prisma.examAttempt.findMany({
      where: { userId: user.id, finishedAt: { not: null }, abandoned: false },
      orderBy: { startedAt: "desc" },
      take: 10,
      include: { modules: { orderBy: { order: "asc" } } },
    }),
    prisma.question.groupBy({
      by: ["section"],
      where: { active: true },
      _count: { _all: true },
    }),
  ]);

  const rwAvailable = questionCounts.find((c) => c.section === "reading_writing")?._count._all ?? 0;
  const mathAvailable = questionCounts.find((c) => c.section === "math")?._count._all ?? 0;

  const rwNeeded = 54;
  const mathNeeded = 44;
  const thinBank = rwAvailable < rwNeeded || mathAvailable < mathNeeded;

  const best = history.reduce<number | null>(
    (max, exam) => (exam.total !== null && (max === null || exam.total > max) ? exam.total : max),
    null,
  );

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Digital SAT Exam Simulator"
        description="A faithful rehearsal of the real format: two Reading and Writing modules, two Maths modules, and the multistage routing that decides which second module you see. Most prep tools give you a linear mock, which does not prepare you for the moment the second module gets harder."
      />

      {open ? (
        <Card className="border-accent">
          <CardBody className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-text-base">You have an exam in progress</p>
              <p className="mt-0.5 text-[11px] text-text-subtle">
                Started{" "}
                {open.startedAt.toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/exam/${open.id}`} className={buttonClass("primary", "sm")}>
                Resume exam
              </Link>
              {/* Without this an abandoned sitting blocks every future exam. */}
              <form action={abandonExamAction.bind(null, open.id)}>
                <button type="submit" id="abandon-exam" className={buttonClass("ghost", "sm")}>
                  Abandon it
                </button>
              </form>
            </div>
          </CardBody>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat
              label="Exams completed"
              value={history.length}
              sub={history.length === 0 ? "None yet" : "Full and partial"}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Best simulated total"
              tone="accent"
              value={best ?? "--"}
              sub="Simulator estimate, not equated"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="R&W questions available"
              tone={rwAvailable < rwNeeded ? "warning" : "neutral"}
              value={rwAvailable}
              sub={`${rwNeeded} needed for a full section`}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Maths questions available"
              tone={mathAvailable < mathNeeded ? "warning" : "neutral"}
              value={mathAvailable}
              sub={`${mathNeeded} needed for a full section`}
            />
          </CardBody>
        </Card>
      </div>

      {thinBank ? (
        <Notice tone="warning">
          <span className="font-medium">The bank is too small for a full-length exam.</span> A
          real sitting needs 54 Reading and Writing questions and 44 Maths questions, and this
          instance has {rwAvailable} and {mathAvailable}. The simulator will still run, but
          modules will be short and some questions will repeat across modules. Import more
          material in the Question Bank for a realistic rehearsal, or run a single section
          instead.
        </Notice>
      ) : null}

      <ExamLauncher hasOpenExam={Boolean(open)} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>What the simulator reproduces</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            {EXAM_BLUEPRINT.map((module) => (
              <KeyValue key={module.slot} label={moduleLabel(module.slot)}>
                {module.questionCount} questions · {Math.round(module.durationSec / 60)} min
              </KeyValue>
            ))}
            <KeyValue label="Break between sections">
              {Math.round(SECTION_BREAK_SEC / 60)} minutes
            </KeyValue>
            <KeyValue label="Scored questions">
              {operationalCount("reading_writing")} R&W, {operationalCount("math")} Maths
            </KeyValue>
            <p className="mt-3 text-[11px] leading-relaxed text-text-subtle">
              {sprShareNote()} Module two&apos;s difficulty is chosen from your performance on
              module one, which is how the real multistage test works.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>What it cannot reproduce</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 pt-3 text-xs leading-relaxed text-text-muted">
            <p>
              <span className="font-medium text-text-base">Equating.</span> Real scores come from
              per-form conversion tables that College Board does not publish. The total here is a
              shaped estimate, and it is labelled as one everywhere it appears.
            </p>
            <p>
              <span className="font-medium text-text-base">The real item pool.</span> These are
              questions written for this platform, matched to the published blueprint. They are
              not retired exam questions, because those are not released.
            </p>
            <p>
              <span className="font-medium text-text-base">The routing cut score.</span> The
              threshold for the harder second module is not published. This uses two-thirds of the
              first module, which is the figure most published analyses converge on.
            </p>
          </CardBody>
        </Card>
      </div>

      {history.length > 0 ? (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Past exams</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <ul className="divide-y">
              {history.map((exam) => {
                const hardModules = exam.modules.filter((m) => m.tier === "hard").length;
                return (
                  <li key={exam.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-text-base">{exam.label}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-text-subtle">
                          {exam.startedAt.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {hardModules > 0 ? (
                          <Badge tone="accent">
                            Routed to the harder module {hardModules === 2 ? "twice" : "once"}
                          </Badge>
                        ) : (
                          <Badge tone="neutral">Easier second modules</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="numeric text-sm font-semibold text-text-base">
                          {exam.total ?? "--"}
                        </p>
                        <p className="text-[10px] text-text-subtle">
                          {exam.rwScaled ?? "--"} / {exam.mathScaled ?? "--"}
                        </p>
                      </div>
                      <Link href={`/exam/${exam.id}`} className={buttonClass("ghost", "sm")}>
                        Review
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
