"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Download } from "lucide-react";
import { exportDataAction, saveSettingsAction, type SettingsState } from "./actions";
import type { ProviderStatus } from "@/lib/ai";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Notice,
  Select,
} from "@/components/ui";

const INITIAL: SettingsState = {};

function toInputDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function SettingsForm({
  name,
  email,
  settings,
  providers,
}: {
  name: string | null;
  email: string;
  settings: {
    theme: string;
    targetScore: number;
    testDate: string | null;
    dailyMinutes: number;
    studyDaysPerWeek: number;
    timezone: string;
    aiProvider: string;
    aiModel: string | null;
    aiEnabled: boolean;
    recognitionTimeoutSec: number;
  };
  providers: ProviderStatus[];
}) {
  const [state, action, pending] = useActionState(saveSettingsAction, INITIAL);
  const router = useRouter();
  const [provider, setProvider] = useState(settings.aiProvider);
  const [aiEnabled, setAiEnabled] = useState(settings.aiEnabled);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (state.saved) router.refresh();
  }, [state.saved, router]);

  const selected = providers.find((p) => p.provider === provider);

  async function onExport() {
    setExporting(true);
    try {
      const json = await exportDataAction();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sat-os-export-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile and targets</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={name ?? ""} placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email-display">Email</Label>
              <Input id="email-display" value={email} disabled readOnly />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="targetScore">Target score</Label>
                <Select
                  id="targetScore"
                  name="targetScore"
                  defaultValue={String(settings.targetScore)}
                >
                  {[1400, 1450, 1500, 1520, 1550, 1570, 1600].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="testDate">Test date</Label>
                <Input
                  id="testDate"
                  name="testDate"
                  type="date"
                  defaultValue={toInputDate(settings.testDate)}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="dailyMinutes">Minutes a day</Label>
                <Select
                  id="dailyMinutes"
                  name="dailyMinutes"
                  defaultValue={String(settings.dailyMinutes)}
                >
                  {[30, 45, 60, 75, 90, 105, 120, 150, 180].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="studyDaysPerWeek">Study days a week</Label>
                <Select
                  id="studyDaysPerWeek"
                  name="studyDaysPerWeek"
                  defaultValue={String(settings.studyDaysPerWeek)}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timezone">Time zone</Label>
              <Input
                id="timezone"
                name="timezone"
                defaultValue={settings.timezone}
                placeholder="Europe/London"
              />
            </div>
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance and training</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3 pt-3">
              <div className="space-y-1.5">
                <Label htmlFor="theme">Theme</Label>
                <Select id="theme" name="theme" defaultValue={settings.theme}>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">Match system</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="recognitionTimeoutSec">
                  Recognition prompt timeout (seconds)
                </Label>
                <Input
                  id="recognitionTimeoutSec"
                  name="recognitionTimeoutSec"
                  type="number"
                  min={5}
                  max={120}
                  defaultValue={settings.recognitionTimeoutSec}
                />
                <p className="text-[11px] text-text-subtle">
                  How long you get to name the pattern in the trainer before it counts as a miss.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI provider</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3 pt-3">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  name="aiEnabled"
                  checked={aiEnabled}
                  onChange={(event) => setAiEnabled(event.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 accent-[var(--accent)]"
                />
                <span>
                  <span className="block text-xs font-medium text-text-base">
                    Enable the AI tutor
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-text-muted">
                    Everything else in the platform works with this switched off.
                  </span>
                </span>
              </label>

              <div className="space-y-1.5">
                <Label htmlFor="aiProvider">Provider</Label>
                <Select
                  id="aiProvider"
                  name="aiProvider"
                  value={provider}
                  onChange={(event) => setProvider(event.target.value)}
                >
                  {providers.map((status) => (
                    <option key={status.provider} value={status.provider}>
                      {status.label}
                      {status.provider !== "none" && !status.configured ? " (no API key)" : ""}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="aiModel">Model override</Label>
                <Input
                  id="aiModel"
                  name="aiModel"
                  defaultValue={settings.aiModel ?? ""}
                  placeholder={selected?.defaultModel || "Provider default"}
                />
                <p className="text-[11px] text-text-subtle">
                  Leave blank to use {selected?.defaultModel || "the provider default"}.
                </p>
              </div>

              {provider !== "none" ? (
                selected?.configured ? (
                  <Badge tone="correct">
                    <Check className="h-3 w-3" />
                    API key detected
                  </Badge>
                ) : (
                  <Notice tone="warning">
                    No API key found for {selected?.label}. Set{" "}
                    <code className="font-mono">
                      {provider === "anthropic" ? "ANTHROPIC_API_KEY" : "OPENAI_API_KEY"}
                    </code>{" "}
                    in your environment and restart.
                  </Notice>
                )
              ) : null}
            </CardBody>
          </Card>
        </div>
      </div>

      {state.error ? (
        <p role="alert" className="text-xs text-wrong">
          {state.error}
        </p>
      ) : null}
      {state.saved ? (
        <Notice tone="accent" role="status">
          Settings saved.
        </Notice>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" id="save-settings" variant="primary" disabled={pending}>
          {pending ? "Saving..." : "Save settings"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={exporting}
          onClick={() => void onExport()}
        >
          <Download className="h-3.5 w-3.5" />
          {exporting ? "Preparing..." : "Export all my data"}
        </Button>
        <span className="text-[11px] text-text-subtle">
          The export is a JSON file containing everything this instance holds about you.
        </span>
      </div>
    </form>
  );
}
