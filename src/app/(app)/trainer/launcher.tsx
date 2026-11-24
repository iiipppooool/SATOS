"use client";

import { useActionState, useState } from "react";
import { startSessionAction, type StartState } from "../practice/actions";
import { Button, Card, CardBody, CardHeader, CardTitle, Label, Select } from "@/components/ui";
import { cn } from "@/lib/cn";

const INITIAL: StartState = {};

export function TrainerLauncher({
  prioritySkills,
}: {
  prioritySkills: Array<{ id: string; name: string; section: string }>;
}) {
  const [state, action, pending] = useActionState(startSessionAction, INITIAL);
  const [section, setSection] = useState("both");
  const [count, setCount] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Start a recognition session</CardTitle>
          <p className="mt-1 text-xs text-text-muted">
            You will name the pattern before you are allowed to solve.
          </p>
        </div>
      </CardHeader>
      <CardBody className="pt-3">
        <form action={action} className="space-y-4">
          <input type="hidden" name="kind" value="pattern_trainer" />
          <input type="hidden" name="requirePatternGuess" value="on" />
          <input type="hidden" name="section" value={section} />
          <input type="hidden" name="count" value={count} />
          {selected.map((id) => (
            <input key={id} type="hidden" name="skillIds" value={id} />
          ))}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="trainer-section">Section</Label>
              <Select
                id="trainer-section"
                value={section}
                onChange={(event) => setSection(event.target.value)}
              >
                <option value="both">Both sections</option>
                <option value="reading_writing">Reading and Writing</option>
                <option value="math">Maths</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="trainer-count">Questions</Label>
              <Select
                id="trainer-count"
                value={String(count)}
                onChange={(event) => setCount(Number(event.target.value))}
              >
                {[6, 10, 15, 20].map((value) => (
                  <option key={value} value={value}>
                    {value} questions
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {prioritySkills.length > 0 ? (
            <div>
              <Label className="mb-2">
                Focus on a weak skill{" "}
                <span className="text-text-subtle">(optional)</span>
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {prioritySkills.map((skill) => {
                  const active = selected.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() =>
                        setSelected((current) =>
                          current.includes(skill.id)
                            ? current.filter((id) => id !== skill.id)
                            : [...current, skill.id],
                        )
                      }
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                        active
                          ? "border-accent bg-accent text-accent-contrast"
                          : "text-text-muted hover:bg-surface-hover hover:text-text-base",
                      )}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {state.error ? (
            <p role="alert" className="text-xs text-wrong">
              {state.error}
            </p>
          ) : null}

          <Button
            type="submit"
            id="start-trainer"
            variant="primary"
            size="lg"
            disabled={pending}
          >
            {pending ? "Building session..." : "Start recognition training"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
