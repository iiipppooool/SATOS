import { notFound } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseStringList } from "@/lib/json-fields";
import { moduleLabel } from "@/lib/exam-service";
import { pace } from "@/lib/domain/exam";
import { ExamRunner, type ExamItemView } from "./runner";
import { ExamReview } from "./review";
import { Card, CardBody, Notice, buttonClass } from "@/components/ui";

export const metadata = { title: "Exam" };
export const dynamic = "force-dynamic";

export default async function ExamRunPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const user = await requireUser();

  const exam = await prisma.examAttempt.findFirst({
    where: { id: examId, userId: user.id },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          items: {
            orderBy: { order: "asc" },
            include: {
              question: {
                include: {
                  choices: { orderBy: { order: "asc" } },
                  skill: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!exam) notFound();

  // Finished: show the review instead of the runner.
  if (exam.finishedAt) {
    return (
      <ExamReview
        exam={{
          id: exam.id,
          label: exam.label,
          abandoned: exam.abandoned,
          total: exam.total,
          rwScaled: exam.rwScaled,
          mathScaled: exam.mathScaled,
          rwRaw: exam.rwRaw,
          mathRaw: exam.mathRaw,
          startedAt: exam.startedAt.toISOString(),
          finishedAt: exam.finishedAt.toISOString(),
        }}
        modules={exam.modules.map((module) => ({
          id: module.id,
          slot: module.slot,
          label: moduleLabel(module.slot),
          tier: module.tier,
          rawCorrect: module.rawCorrect,
          total: module.items.length,
          durationSec: module.durationSec,
          items: module.items.map((item) => ({
            id: item.id,
            order: item.order,
            stem: item.question.stem,
            skillName: item.question.skill.name,
            isCorrect: item.isCorrect,
            flagged: item.flagged,
            answered: Boolean(item.choiceId || item.answerText),
            questionId: item.questionId,
          })),
        }))}
      />
    );
  }

  // Find the first module that has not been submitted.
  const current = exam.modules.find((module) => !module.finishedAt);

  if (!current) {
    // Every module is graded but the exam was never finalised.
    return (
      <div className="space-y-4">
        <Notice tone="accent">
          All modules are submitted. Finish the exam to see your score and send every question
          into your error log and review schedule.
        </Notice>
        <form action={async () => {
          "use server";
          const { finishExamAction } = await import("../actions");
          await finishExamAction(examId);
        }}>
          <button type="submit" className={buttonClass("primary")}>
            Finish and score the exam
          </button>
        </form>
      </div>
    );
  }

  if (current.items.length === 0) {
    return (
      <Card>
        <CardBody className="space-y-3">
          <p className="text-sm text-text-base">
            This module could not be filled from the question bank.
          </p>
          <p className="text-xs text-text-muted">
            There were not enough active questions in this section. Import more material, then
            start a fresh exam.
          </p>
          <Link href="/bank/import" className={buttonClass("primary", "sm")}>
            Import questions
          </Link>
        </CardBody>
      </Card>
    );
  }

  const items: ExamItemView[] = current.items.map((item) => ({
    id: item.id,
    order: item.order,
    questionId: item.questionId,
    format: item.question.format === "spr" ? "spr" : "mcq",
    stimulus: item.question.stimulus,
    stimulusTitle: item.question.stimulusTitle,
    stem: item.question.stem,
    choices: item.question.choices.map((choice) => ({
      id: choice.id,
      label: choice.label,
      text: choice.text,
    })),
    acceptedAnswerHint: parseStringList(item.question.acceptedAnswers).length > 0,
    choiceId: item.choiceId,
    answerText: item.answerText,
    flagged: item.flagged,
  }));

  const moduleIndex = exam.modules.findIndex((m) => m.id === current.id);
  const previous = exam.modules
    .filter((m) => m.finishedAt)
    .map((m) => ({ label: moduleLabel(m.slot), tier: m.tier }));

  return (
    <ExamRunner
      examId={exam.id}
      moduleId={current.id}
      moduleLabel={moduleLabel(current.slot)}
      tier={current.tier}
      moduleNumber={moduleIndex + 1}
      moduleTotal={exam.modules.length}
      durationSec={current.durationSec}
      startedAtIso={current.startedAt ? current.startedAt.toISOString() : null}
      secondsPerQuestion={pace(items.length, current.durationSec)}
      items={items}
      previousModules={previous}
    />
  );
}
