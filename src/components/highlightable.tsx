"use client";

import { useCallback, useRef, useState } from "react";
import { Highlighter, Eraser } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { looksTabular } from "@/components/stimulus";

/**
 * A passage the student can highlight, as in the real testing app.
 *
 * Highlighting is stored as character ranges over the passage text rather than
 * as DOM state, so it survives re-render and can be cleared precisely. It is
 * intentionally per-question and not persisted: the point is to support
 * reading now, not to accumulate annotations.
 */
interface Range {
  start: number;
  end: number;
}

function mergeRanges(ranges: Range[]): Range[] {
  if (ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: Range[] = [sorted[0]!];
  for (const range of sorted.slice(1)) {
    const last = merged[merged.length - 1]!;
    if (range.start <= last.end) last.end = Math.max(last.end, range.end);
    else merged.push({ ...range });
  }
  return merged;
}

export function HighlightablePassage({
  title,
  text,
  className,
}: {
  title?: string | null;
  text: string;
  className?: string;
}) {
  const [ranges, setRanges] = useState<Range[]>([]);
  const [active, setActive] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const tabular = looksTabular(text);

  const capture = useCallback(() => {
    if (!active) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !container.current) return;
    if (!container.current.contains(selection.anchorNode)) return;

    // Map the selection onto character offsets within the passage text. Using
    // offsets rather than DOM nodes means re-rendering the highlights does not
    // invalidate them.
    const full = container.current.textContent ?? "";
    const selected = selection.toString();
    if (!selected.trim()) return;

    const preRange = document.createRange();
    preRange.selectNodeContents(container.current);
    preRange.setEnd(selection.getRangeAt(0).startContainer, selection.getRangeAt(0).startOffset);
    const start = preRange.toString().length;
    const end = Math.min(full.length, start + selected.length);

    setRanges((current) => mergeRanges([...current, { start, end }]));
    selection.removeAllRanges();
  }, [active]);

  const segments: Array<{ text: string; highlighted: boolean }> = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start > cursor) {
      segments.push({ text: text.slice(cursor, range.start), highlighted: false });
    }
    segments.push({ text: text.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), highlighted: false });

  const body = segments.map((segment, index) =>
    segment.highlighted ? (
      <mark
        key={index}
        className="rounded-sm bg-warning-soft px-0.5 text-text-base"
        style={{ color: "var(--text)" }}
      >
        {segment.text}
      </mark>
    ) : (
      <span key={index}>{segment.text}</span>
    ),
  );

  return (
    <div className={cn("rounded-[var(--radius-control)] border bg-bg-sunken p-4", className)}>
      <div className="mb-2 flex items-start justify-between gap-3">
        {title ? (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
            {title}
          </p>
        ) : (
          <span />
        )}
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={active}
            onClick={() => setActive((value) => !value)}
            title={active ? "Stop highlighting" : "Highlight by selecting text"}
          >
            <Highlighter
              className={cn("h-3.5 w-3.5", active && "text-warning")}
            />
            {active ? "Highlighting" : "Highlight"}
          </Button>
          {ranges.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setRanges([])}
              title="Clear all highlights"
            >
              <Eraser className="h-3.5 w-3.5" />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      <div
        ref={container}
        onMouseUp={capture}
        onTouchEnd={capture}
        className={cn(active && "cursor-text")}
      >
        {tabular ? (
          <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-text-base">
            {body}
          </pre>
        ) : (
          <p className="passage text-[13px] text-text-base">{body}</p>
        )}
      </div>
    </div>
  );
}
