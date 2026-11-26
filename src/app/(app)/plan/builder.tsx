"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { generatePlanAction, type PlanState } from "./actions";
import { Button, Card, CardBody, CardHeader, CardTitle, Input, Label, Select } from "@/components/ui";

const INITIAL: PlanState = {};

function toInputDate(date: Date | null | undefined): string {
  if (!date) return "";
  const copy = new Date(date);
  return `${copy.getFullYear()}-${String(copy.getMonth() + 1).padStart(2, "0")}-${String(copy.getDate()).padStart(2, "0")}`;
}

export function PlanBuilder({
  defaultTestDate,
  defaultDaysPerWeek,
  defaultMinutes,
  defaultTarget,
  compact = false,
}: {
  defaultTestDate: Date | null;
  defaultDaysPerWeek: number;
  defaultMinutes: number;
  defaultTarget: number;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState(generatePlanAction, INITIAL);
  const router = useRouter();

  useEffect(() => {
    if (state.ok) router.refresh();
  }, [state.ok, router]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const form = (
    <form action={action} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor="testDate">Test date</Label>
          <Input
            id="testDate"
            name="testDate"
            type="date"
            required
            min={toInputDate(tomorrow)}
            defaultValue={toInputDate(defaultTestDate)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="daysPerWeek">Study days a week</Label>
          <Select id="daysPerWeek" name="daysPerWeek" defaultValue={String(defaultDaysPerWeek)}>
            {[3, 4, 5, 6, 7].map((value) => (
              <option key={value} value={value}>
                {value} days
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="minutesPerDay">Minutes a day</Label>
          <Select id="minutesPerDay" name="minutesPerDay" defaultValue={String(defaultMinutes)}>
            {[45, 60, 75, 90, 105, 120, 150, 180].map((value) => (
              <option key={value} value={value}>
                {value} minutes
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="targetScore">Target score</Label>
          <Select id="targetScore" name="targetScore" defaultValue={String(defaultTarget)}>
            {[1400, 1450, 1500, 1520, 1550, 1570, 1600].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {state.error ? (
        <p role="alert" className="text-xs text-wrong">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" id="generate-plan" variant="primary" disabled={pending}>
        {pending ? "Building plan..." : compact ? "Replace plan" : "Generate plan"}
      </Button>
    </form>
  );

  if (compact) return form;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Build your plan</CardTitle>
          <p className="mt-1 text-xs text-text-muted">
            The generator works backwards from your test date and allocates phases to fit.
          </p>
        </div>
      </CardHeader>
      <CardBody className="pt-3">{form}</CardBody>
    </Card>
  );
}
