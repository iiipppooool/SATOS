"use client";

import { useActionState, useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import { importAction, type ImportState } from "./actions";
import { IMPORT_TEMPLATE_JSON } from "./template-data";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Notice,
  Select,
  Textarea,
} from "@/components/ui";

const INITIAL: ImportState = {};

export function ImportForm() {
  const [state, action, pending] = useActionState(importAction, INITIAL);
  const [payload, setPayload] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setPayload(text);
  }

  function downloadTemplate() {
    const blob = new Blob([IMPORT_TEMPLATE_JSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sat-os-import-template.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  const result = state.result;

  return (
    <div className="space-y-4">
      <form action={action} className="space-y-4">
        <input type="hidden" name="payload" value={payload} />

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Provenance</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                This travels with every question and is shown wherever it appears.
              </p>
            </div>
          </CardHeader>
          <CardBody className="space-y-3 pt-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Import name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Official Practice Test 4, Module 1"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="source">Source type</Label>
                <Select id="source" name="source" defaultValue="user_imported">
                  <option value="user_imported">Material I own a copy of</option>
                  <option value="official_practice">Official College Board practice</option>
                  <option value="third_party">Third-party prep material</option>
                  <option value="original_authored">Questions I wrote myself</option>
                  <option value="recalled_unverified">Recalled, unverified</option>
                </Select>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="sourceRef">Citation</Label>
                <Input
                  id="sourceRef"
                  name="sourceRef"
                  placeholder="Where exactly this came from"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="licenceNote">Licence note</Label>
                <Input
                  id="licenceNote"
                  name="licenceNote"
                  placeholder="e.g. Purchased copy, personal use only"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>The questions</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                JSON in the shape the template shows. Each row is validated independently, so one
                bad question does not reject the file.
              </p>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={downloadTemplate}>
              <Download className="h-3.5 w-3.5" />
              Template
            </Button>
          </CardHeader>
          <CardBody className="space-y-3 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="file">Choose a file</Label>
              <input
                ref={fileRef}
                id="file"
                type="file"
                accept="application/json,.json"
                onChange={(event) => void onFile(event)}
                className="block w-full text-xs text-text-muted file:mr-3 file:rounded-[var(--radius-control)] file:border file:border-[var(--border-strong)] file:bg-bg-elevated file:px-3 file:py-1.5 file:text-xs file:text-text-base hover:file:bg-surface-hover"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="payload-area">Or paste JSON</Label>
              <Textarea
                id="payload-area"
                rows={10}
                value={payload}
                onChange={(event) => setPayload(event.target.value)}
                placeholder='{ "questions": [ ... ] }'
                className="font-mono text-[11px]"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                name="confirmRights"
                className="mt-0.5 h-3.5 w-3.5 accent-[var(--accent)]"
              />
              <span className="text-xs leading-relaxed text-text-muted">
                I hold a licence to this material, or I wrote it myself. I am not importing content
                scraped from a source that forbids it.
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                name="dryRun"
                defaultChecked
                className="h-3.5 w-3.5 accent-[var(--accent)]"
              />
              <span className="text-xs text-text-muted">
                Validate only, do not write anything yet
              </span>
            </label>

            {state.error ? (
              <p role="alert" className="text-xs text-wrong">
                {state.error}
              </p>
            ) : null}

            <Button
              type="submit"
              id="run-import"
              variant="primary"
              disabled={pending || payload.trim().length === 0}
            >
              <Upload className="h-3.5 w-3.5" />
              {pending ? "Processing..." : "Run import"}
            </Button>
          </CardBody>
        </Card>
      </form>

      {result ? (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Result</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="space-y-3 pt-3">
            <div className="flex flex-wrap gap-4 text-xs">
              <span className="text-text-muted">
                Rows seen: <span className="numeric font-medium text-text-base">{result.seen}</span>
              </span>
              <span className="text-text-muted">
                Imported:{" "}
                <span className="numeric font-medium text-correct">{result.imported}</span>
              </span>
              <span className="text-text-muted">
                Rejected:{" "}
                <span className="numeric font-medium text-wrong">{result.rejected}</span>
              </span>
            </div>

            {result.imported === 0 && result.rejected === 0 ? (
              <Notice>Validation passed. Untick &ldquo;validate only&rdquo; to write them.</Notice>
            ) : null}

            {result.rowErrors.length > 0 ? (
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                  Rejected rows
                </p>
                <ul className="space-y-1.5">
                  {result.rowErrors.slice(0, 25).map((row) => (
                    <li
                      key={`${row.index}-${row.stem}`}
                      className="rounded-[var(--radius-control)] border border-[var(--wrong)]/30 bg-wrong-soft px-3 py-2"
                    >
                      <p className="text-[11px] font-medium text-text-base">
                        {row.index >= 0 ? `Row ${row.index + 1}` : "File"}
                        {row.stem ? `: ${row.stem}` : ""}
                      </p>
                      <ul className="mt-0.5 list-inside list-disc text-[11px] text-text-muted">
                        {row.errors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                {result.rowErrors.length > 25 ? (
                  <p className="mt-1.5 text-[11px] text-text-subtle">
                    and {result.rowErrors.length - 25} more
                  </p>
                ) : null}
              </div>
            ) : null}
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
