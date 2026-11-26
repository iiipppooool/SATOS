import { cn } from "@/lib/cn";

/**
 * Renders a question's stimulus.
 *
 * Reading passages are prose and belong in the body typeface. Data stimuli are
 * column-aligned tables whose alignment only survives in a monospaced font, so
 * the two are detected and rendered differently rather than forcing everything
 * into one. The heuristic looks for runs of two or more spaces on several
 * lines, which is what a text table has and prose does not.
 */
export function looksTabular(text: string): boolean {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  if (lines.length < 2) return false;
  const aligned = lines.filter((line) => /\S {2,}\S/.test(line)).length;
  return aligned >= Math.max(2, Math.ceil(lines.length * 0.6));
}

export function Stimulus({
  title,
  text,
  className,
}: {
  title?: string | null;
  text: string;
  className?: string;
}) {
  const tabular = looksTabular(text);

  return (
    <div className={cn("rounded-[var(--radius-control)] border bg-bg-sunken p-4", className)}>
      {title ? (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
          {title}
        </p>
      ) : null}
      {tabular ? (
        <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-text-base">
          {text}
        </pre>
      ) : (
        <p className="passage text-[13px] text-text-base">{text}</p>
      )}
    </div>
  );
}
