import { requireUser } from "@/lib/auth";
import { getActivePlan, daysUntil } from "@/lib/queries";
import { classifyInterval, daysBetween } from "@/lib/domain/plan";
import { PLAN_FOCUS_LABEL, type PlanFocus } from "@/lib/domain/enums";
import { PlanBuilder } from "./builder";
import { PlanCalendar, type PlanDayView } from "./calendar";
import { Card, CardBody, Notice, SectionHeading, Stat } from "@/components/ui";

export const metadata = { title: "Study Plan" };
export const dynamic = "force-dynamic";

const SHAPE_NOTE: Record<string, string> = {
  sprint:
    "With under a fortnight left there is no time to rebuild foundations. This plan is almost entirely timed practice and error repair, which protects the score you already have and sharpens execution. Expect to gain marks from pacing and fewer careless errors, not from new content.",
  short:
    "Four or five weeks is enough to fix two or three high-impact weaknesses properly and then drill them under time. Large score jumps usually need longer than this, so prioritise ruthlessly.",
  standard:
    "This is a realistic window for a meaningful gain, provided the weakness work actually gets done rather than quietly replaced with comfortable practice on things you are already good at.",
  long: "Long enough to rebuild foundations before drilling. Over an interval this long the risk is drift, not capacity, so the weekly review matters more than the daily volume.",
};

export default async function PlanPage() {
  const user = await requireUser();
  const plan = await getActivePlan(user.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!plan) {
    return (
      <div className="space-y-6">
        <SectionHeading
          title="Study Plan"
          description="The plan is built from the time you actually have, not a fixed twelve-week template. Tell it your test date and how much you can do, and it chooses a phase structure that fits: a short run drops the foundation work rather than pretending to compress it."
        />
        <PlanBuilder
          defaultTestDate={user.settings.testDate}
          defaultDaysPerWeek={user.settings.studyDaysPerWeek}
          defaultMinutes={user.settings.dailyMinutes}
          defaultTarget={user.settings.targetScore}
        />
      </div>
    );
  }

  const totalDays = daysBetween(plan.startDate, plan.testDate);
  const shape = classifyInterval(totalDays);
  const remaining = daysUntil(plan.testDate) ?? 0;

  const studyDays = plan.days.filter((day) => day.focus !== "rest");
  const doneDays = studyDays.filter((day) => day.status === "done").length;
  const fullExams = plan.days.filter((day) => day.focus === "full_exam").length;

  const days: PlanDayView[] = plan.days.map((day) => ({
    id: day.id,
    date: day.date.toISOString(),
    focus: day.focus,
    focusLabel: PLAN_FOCUS_LABEL[day.focus as PlanFocus] ?? day.focus,
    theme: day.theme,
    targetMinutes: day.targetMinutes,
    status: day.status,
    weekIndex: day.weekIndex,
    isToday: day.date.toDateString() === today.toDateString(),
    isPast: day.date.getTime() < today.getTime(),
    assignments: day.assignments.map((assignment) => ({
      id: assignment.id,
      title: assignment.title,
      kind: assignment.kind,
      questionCount: assignment.questionCount,
      targetMinutes: assignment.targetMinutes,
      status: assignment.status,
      sessionId: assignment.sessionId,
    })),
  }));

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Study Plan"
        description={`${plan.name}. Built on ${plan.startDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} for a ${plan.targetScore} target.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat
              label="Days remaining"
              tone={remaining <= 14 ? "warning" : "neutral"}
              value={remaining < 0 ? "past" : remaining}
              sub={plan.testDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Study days done"
              value={`${doneDays}/${studyDays.length}`}
              sub={`${plan.daysPerWeek} days a week, ${plan.minutesPerDay} minutes`}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat label="Full exams" value={fullExams} sub="Timed, adaptive, full length" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Plan shape"
              value={shape}
              sub={`${totalDays} days from start to test`}
            />
          </CardBody>
        </Card>
      </div>

      <Notice tone={shape === "sprint" ? "warning" : "neutral"}>
        <span className="font-medium">What this plan can realistically do.</span>{" "}
        {SHAPE_NOTE[shape]}
      </Notice>

      <PlanCalendar days={days} />

      <Card>
        <CardBody>
          <p className="text-xs leading-relaxed text-text-muted">
            Want to change the schedule? Generating a new plan replaces this one. Your completion
            history, error log and spaced repetition state are untouched.
          </p>
          <div className="mt-4">
            <PlanBuilder
              compact
              defaultTestDate={plan.testDate}
              defaultDaysPerWeek={plan.daysPerWeek}
              defaultMinutes={plan.minutesPerDay}
              defaultTarget={plan.targetScore}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
