"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Wand2 } from "lucide-react";
import {
  generateDigestAction,
  generateQuestionsAction,
  type DigestResult,
  type GenerateResult,
} from "./generate-actions";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Label,
  Notice,
  Select,
  buttonClass,
} from "@/components/ui";

export interface GeneratorSkill {
  id: string;
  name: string;
  section: string;
  accuracy: number;
  attempts: number;
  expectedGain: number;
}

export function TutorGenerator({
  enabled,
  skills,
  providerLabel,
}: {
  enabled: boolean;
  skills: GeneratorSkill[];
  providerLabel: string;
}) {
  const [skillId, setSkillId] = useState(skills[0]?.id ?? "");
  const [difficulty, setDifficulty] = useState(4);
  const [count, setCount] = useState(3);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);

  const [digestBusy, setDigestBusy] = useState(false);
  const [digest, setDigest] = useState<DigestResult | null>(null);

  async function generate() {
    if (!skillId || busy) return;
    setBusy(true);
    setResult(null);
    const response = await generateQuestionsAction({ skillId, difficulty, count });
    setResult(response);
    setBusy(false);
  }

  async function runDigest() {
    if (digestBusy) return;
    setDigestBusy(true);
    setDigest(null);
    const response = await generateDigestAction();
    setDigest(response);
    setDigestBusy(false);
  }

  const chosen = skills.find((s) => s.id === skillId);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Generate practice questions</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              New questions written into your bank, aimed at the patterns you keep missing in the
              chosen skill.
            </p>
          </div>
          <Wand2 className="h-4 w-4 shrink-0 text-text-subtle" />
        </CardHeader>
        <CardBody className="space-y-3 pt-3">
          <div className="space-y-1.5">
            <Label htmlFor="gen-skill">Skill</Label>
            <Select
              id="gen-skill"
              value={skillId}
              onChange={(event) => setSkillId(event.target.value)}
              disabled={!enabled}
            >
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                  {skill.attempts > 0
                    ? ` (${Math.round(skill.accuracy * 100)}% over ${skill.attempts})`
                    : " (not attempted)"}
                </option>
              ))}
            </Select>
            {chosen && chosen.expectedGain > 0 ? (
              <p className="text-[11px] text-text-subtle">
                Worth about {Math.round(chosen.expectedGain)} points against your target.
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="gen-difficulty">Difficulty</Label>
              <Select
                id="gen-difficulty"
                value={String(difficulty)}
                onChange={(event) => setDifficulty(Number(event.target.value))}
                disabled={!enabled}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                    {value === 5 ? " (hardest)" : ""}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gen-count">How many</Label>
              <Select
                id="gen-count"
                value={String(count)}
                onChange={(event) => setCount(Number(event.target.value))}
                disabled={!enabled}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <Button
            type="button"
            id="generate-questions"
            variant="primary"
            disabled={!enabled || busy || !skillId}
            onClick={() => void generate()}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {busy ? "Writing questions..." : "Generate into my bank"}
          </Button>

          {result ? (
            result.ok ? (
              <Notice tone="accent" role="status">
                <span className="font-medium">
                  {result.added} question{result.added === 1 ? "" : "s"} added to{" "}
                  {result.skillName}.
                </span>{" "}
                {result.rejected ? `${result.rejected} were rejected by validation. ` : ""}
                They are labelled AI generated with an unverified answer key, so check the
                reasoning the first time each one comes up.{" "}
                <Link href="/bank?source=ai_generated" className="font-medium underline">
                  See them in the bank
                </Link>
                .
              </Notice>
            ) : (
              <Notice tone="warning" role="alert">
                {result.error}
                {result.rejectionDetail && result.rejectionDetail.length > 0 ? (
                  <ul className="mt-1 list-inside list-disc">
                    {result.rejectionDetail.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                ) : null}
              </Notice>
            )
          ) : null}

          <Notice>
            Generated questions go through the same validation as an imported file: four options,
            exactly one correct, a rationale on every distractor. Anything that fails is discarded
            rather than stored. They are never marked verified automatically, because a model&apos;s
            answer key is a guess and a wrong key you trust teaches the wrong method.
          </Notice>
        </CardBody>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <div>
            <CardTitle>Mistake digest</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              A written analysis of what keeps going wrong, built from your classified error log
              and the weakness ranking.
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-3 pt-3">
          <Button
            type="button"
            id="generate-digest"
            variant="secondary"
            disabled={!enabled || digestBusy}
            onClick={() => void runDigest()}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {digestBusy ? "Reading your error log..." : "Write my digest"}
          </Button>

          {digest ? (
            digest.ok ? (
              <div className="rounded-[var(--radius-control)] border bg-bg-sunken px-3.5 py-3">
                <p className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-text-subtle">
                  Digest
                  <Badge tone="neutral">{providerLabel}</Badge>
                </p>
                <p className="whitespace-pre-wrap text-xs leading-relaxed text-text-base">
                  {digest.digest}
                </p>
                <Link href="/tutor" className={`${buttonClass("ghost", "sm")} mt-2`}>
                  Saved to your threads
                </Link>
              </div>
            ) : (
              <Notice tone="warning" role="alert">
                {digest.error}
              </Notice>
            )
          ) : null}

          {!enabled ? (
            <Notice tone="warning">
              Both of these need an AI provider configured. Everything else in the platform works
              without one.
            </Notice>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
