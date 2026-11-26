"use client";

import { useState, useTransition } from "react";
import { Check, Play } from "lucide-react";
import { startAssignmentAction, togglePlanDayAction } from "./actions";
import { Badge, Button, Card, CardBody } from "@/components/ui";
import { cn } from "@/lib/cn";

export interface PlanDayView {
  id: string;
  date: string;
  focus: string;
  focusLabel: string;
  theme: string | null;
  targetMinutes: number;
  status: string;
  weekIndex: number;
  isToday: boolean;
  isPast: boolean;
  assignments: Array<{
    id: string;
    title: string;
    kind: string;
    questionCount: number;
    targetMinutes: number;
    status: string;
    sessionId: string | null;
  }>;
}

export function PlanCalendar({ days }: { days: PlanDayView[] }) {
  const weeks = new Map<number, PlanDayView[]>();
  for (const day of days) {
    const bucket = weeks.get(day.weekIndex) ?? [];
    bucket.push(day);
    weeks.set(day.weekIndex, bucket);
  }

  // Open the week containing today by default.
  const todayWeek = days.find((day) => day.isToday)?.weekIndex ?? 0;
  const [openWeek, setOpenWeek] = useState<number>(todayWeek);

  return (
    <div className="space-y-2">
      {[...weeks.entries()].map(([weekIndex, weekDays]) => {
        const studyDays = weekDays.filter((d) => d.focus !== "rest");
        const done = studyDays.filter((d) => d.status === "done").length;
        const minutes = weekDays.reduce((sum, d) => sum + d.targetMinutes, 0);
        const open = openWeek === weekIndex;
        const containsToday = weekDays.some((d) => d.isToday);

        return (
          <Card key={weekIndex} className={cn(containsToday && "border-accent")}>
            <CardBody className="p-0">
              <button
                type="button"
                onClick={() => setOpenWeek(open ? -1 : weekIndex)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-base">
                    Week {weekIndex + 1}
                  </span>
                  {containsToday ? <Badge tone="accent">This week</Badge> : null}
                  <span className="text-[11px] text-text-subtle">
                    {new Date(weekDays[0]!.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-text-muted">
                  <span className="numeric">
                    {done}/{studyDays.length} days
                  </span>
                  <span className="numeric">{Math.round(minutes / 60)}h planned</span>
                </div>
              </button>

              {open ? (
                <div className="divide-y border-t">
                  {weekDays.map((day) => (
                    <PlanDayRow key={day.id} day={day} />
                  ))}
                </div>
              ) : null}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

function PlanDayRow({ day }: { day: PlanDayView }) {
  const [pending, startTransition] = useTransition();

  if (day.focus === "rest") {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 opacity-60">
        <span className="w-24 shrink-0 text-[11px] text-text-subtle">
          {new Date(day.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric" })}
        </span>
        <span className="text-xs text-text-subtle">Rest day</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "px-4 py-3",
        day.isToday && "bg-accent-soft/30",
        day.isPast && day.status !== "done" && "opacity-70",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-24 shrink-0 text-[11px] font-medium text-text-muted">
              {new Date(day.date).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
            <Badge tone={day.focus === "full_exam" ? "warning" : "neutral"}>
              {day.focusLabel}
            </Badge>
            {day.isToday ? <Badge tone="accent">Today</Badge> : null}
            {day.status === "done" ? <Badge tone="correct">Done</Badge> : null}
            <span className="text-[11px] text-text-subtle">{day.targetMinutes} min</span>
          </div>
          {day.theme ? (
            <p className="mt-1 pl-0 text-[11px] leading-relaxed text-text-muted sm:pl-[6.5rem]">
              {day.theme}
            </p>
          ) : null}

          <ul className="mt-2 space-y-1.5 sm:pl-[6.5rem]">
            {day.assignments.map((assignment) => (
              <li
                key={assignment.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-control)] border bg-bg-sunken px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-text-base">
                    {assignment.title}
                  </p>
                  <p className="text-[10px] text-text-subtle">
                    {assignment.questionCount} questions · {assignment.targetMinutes} min
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {assignment.status === "done" ? (
                    <Badge tone="correct">
                      <Check className="h-3 w-3" />
                      Done
                    </Badge>
                  ) : (
                    <form action={startAssignmentAction.bind(null, assignment.id)}>
                      <Button type="submit" variant="secondary" size="sm">
                        <Play className="h-3 w-3" />
                        Start
                      </Button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={pending}
          onClick={() => startTransition(() => void togglePlanDayAction(day.id))}
        >
          {day.status === "done" ? "Reopen" : "Mark day done"}
        </Button>
      </div>
    </div>
  );
}
