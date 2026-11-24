import * as React from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ Card */

export function Card({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("text-sm font-semibold tracking-tight text-text-base", className)} {...props}>
      {children}
    </h2>
  );
}

export function CardDescription({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("mt-1 text-xs leading-relaxed text-text-muted", className)} {...props}>
      {children}
    </p>
  );
}

export function CardBody({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- Button */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "correct";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-control)] transition-colors disabled:opacity-50 disabled:pointer-events-none select-none";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary: "border border-border-strong bg-bg-elevated text-text-base hover:bg-surface-hover",
  ghost: "text-text-muted hover:text-text-base hover:bg-surface-hover",
  danger: "border border-[var(--wrong)] text-wrong hover:bg-wrong-soft",
  correct: "bg-correct text-accent-contrast hover:opacity-90",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: React.ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...props}
    />
  );
}

export function buttonClass(variant: ButtonVariant = "secondary", size: ButtonSize = "md") {
  return cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size]);
}

/* ----------------------------------------------------------------- Badge */

type BadgeTone = "neutral" | "accent" | "correct" | "wrong" | "warning";

const BADGE_TONES: Record<BadgeTone, string> = {
  neutral: "border-border-strong text-text-muted",
  accent: "border-transparent bg-accent-soft text-accent",
  correct: "border-transparent bg-correct-soft text-correct",
  wrong: "border-transparent bg-wrong-soft text-wrong",
  warning: "border-transparent bg-warning-soft text-warning",
};

export function Badge({
  className,
  tone = "neutral",
  children,
  ...props
}: React.ComponentProps<"span"> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none",
        BADGE_TONES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- Input */

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-[var(--radius-control)] border bg-bg-sunken px-3 text-sm text-text-base",
        "placeholder:text-text-subtle focus:border-accent focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-9 w-full rounded-[var(--radius-control)] border bg-bg-sunken px-3 text-sm text-text-base",
        "focus:border-accent focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full rounded-[var(--radius-control)] border bg-bg-sunken p-3 text-sm text-text-base",
        "placeholder:text-text-subtle focus:border-accent focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, children, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn("block text-xs font-medium text-text-muted", className)} {...props}>
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ Misc */

export function Stat({
  label,
  value,
  sub,
  tone = "neutral",
  className,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  const valueTone =
    tone === "accent"
      ? "text-accent"
      : tone === "correct"
        ? "text-correct"
        : tone === "wrong"
          ? "text-wrong"
          : tone === "warning"
            ? "text-warning"
            : "text-text-base";

  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-[11px] font-medium uppercase tracking-wider text-text-subtle">
        {label}
      </div>
      <div className={cn("numeric mt-1 text-2xl font-semibold tracking-tight", valueTone)}>
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-text-muted">{sub}</div> : null}
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  tone = "accent",
  className,
  label,
}: {
  value: number;
  max?: number;
  tone?: "accent" | "correct" | "wrong" | "warning";
  className?: string;
  label?: string;
}) {
  const safeMax = max > 0 ? max : 1;
  const pct = Math.min(100, Math.max(0, (value / safeMax) * 100));
  const colour =
    tone === "correct"
      ? "var(--correct)"
      : tone === "wrong"
        ? "var(--wrong)"
        : tone === "warning"
          ? "var(--warning)"
          : "var(--accent)";

  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-bg-sunken", className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${pct}%`, backgroundColor: colour }}
      />
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed px-6 py-12 text-center">
      {icon ? <div className="text-text-subtle">{icon}</div> : null}
      <div>
        <p className="text-sm font-medium text-text-base">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-text-muted">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

/**
 * A caveat the user cannot miss. Used wherever the platform reports an
 * estimate, an AI-generated item, or unverified provenance. These notices are
 * deliberately not dismissible.
 */
export function Notice({
  tone = "neutral",
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  tone?: "neutral" | "warning" | "accent";
}) {
  const tones = {
    neutral: "border-border-strong bg-bg-sunken text-text-muted",
    warning: "border-[var(--warning)]/40 bg-warning-soft text-warning",
    accent: "border-transparent bg-accent-soft text-accent",
  } as const;

  return (
    <div
      className={cn(
        "rounded-[var(--radius-control)] border px-3 py-2 text-xs leading-relaxed",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-text-base">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-text-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-[var(--border)]", className)} />;
}

export function KeyValue({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5 text-xs">
      <span className="shrink-0 text-text-subtle">{label}</span>
      <span className="text-right text-text-base">{children}</span>
    </div>
  );
}
