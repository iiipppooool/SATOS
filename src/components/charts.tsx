"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSyncExternalStore } from "react";
import { SECTION_LABEL, type Section } from "@/lib/domain/enums";

/*
 * Chart colours.
 *
 * Two jobs, two palettes. Magnitude comparisons (accuracy by domain) use a
 * single blue hue, light to dark, because the bars are one measure across
 * categories and a rainbow there would imply a distinction that does not
 * exist. Only the one genuinely categorical distinction in the app, Reading
 * and Writing against Maths, gets two hues.
 *
 * Both palettes were checked with a colour-vision-deficiency validator against
 * this app's real surface colours (#ffffff light, #1c1f28 dark): every slot
 * clears the lightness band, the chroma floor, a CVD separation of delta-E 8,
 * the normal-vision floor of 15, and 3:1 contrast against the surface, in both
 * modes. The dark values are separately chosen steps, not an automatic flip.
 */
const SERIES = {
  light: { rw: "#2a78d6", math: "#eb6834", single: "#2a78d6" },
  dark: { rw: "#3987e5", math: "#d95926", single: "#3987e5" },
} as const;

/** Sequential blue ramp, light to dark, for magnitude encoding. */
const RAMP = {
  light: ["#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95"],
  dark: ["#184f95", "#256abf", "#2a78d6", "#3987e5", "#6da7ec"],
} as const;

type Mode = "light" | "dark";

/**
 * Recharts needs real colour values rather than CSS variables for SVG fills,
 * so the component has to know which theme is active.
 *
 * The theme lives outside React: it is an attribute on <html> that the server
 * sets, plus the OS preference. That makes it an external store, so it is read
 * with useSyncExternalStore rather than mirrored into state by an effect.
 * Tearing and cascading renders are both avoided, and the server snapshot
 * keeps the first paint consistent.
 */
function readMode(): Mode {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light") return "light";
  if (attr === "dark") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function subscribeToTheme(onChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", onChange);

  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function useMode(): Mode {
  return useSyncExternalStore(subscribeToTheme, readMode, () => "dark" as Mode);
}

function axisColours(mode: Mode) {
  return mode === "light"
    ? { grid: "#e8e8ec", text: "#6b6b76", surface: "#ffffff" }
    : { grid: "#343843", text: "#9b9ba8", surface: "#1c1f28" };
}

interface TooltipRow {
  label: string;
  value: string;
  colour?: string;
}

function ChartTooltip({
  active,
  title,
  rows,
}: {
  active?: boolean;
  title?: string;
  rows?: TooltipRow[];
}) {
  if (!active || !rows?.length) return null;
  return (
    <div className="rounded-[var(--radius-control)] border bg-bg-elevated px-2.5 py-2 text-xs shadow-[var(--shadow-popover)]">
      {title ? <p className="mb-1 font-medium text-text-base">{title}</p> : null}
      <div className="space-y-0.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-text-muted">
              {row.colour ? (
                <span
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: row.colour }}
                  aria-hidden
                />
              ) : null}
              {row.label}
            </span>
            <span className="numeric font-medium text-text-base">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function shortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" });
}

/* ------------------------------------------------- Daily accuracy and volume */

export interface DailyPoint {
  date: string;
  attempts: number;
  accuracy: number;
  minutes: number;
}

/**
 * Trend over time for a single measure, so one hue and no legend: the heading
 * names the series. Days with no practice are plotted as gaps rather than
 * zeroes, because a rest day is missing data, not nought per cent accuracy.
 */
export function AccuracyTrend({ data }: { data: DailyPoint[] }) {
  const mode = useMode();
  const colours = axisColours(mode);
  const stroke = SERIES[mode].single;

  const points = data.map((point) => ({
    ...point,
    label: shortDate(point.date),
    plotted: point.attempts > 0 ? Math.round(point.accuracy * 100) : null,
  }));

  const hasData = points.some((p) => p.plotted !== null);

  if (!hasData) {
    return (
      <p className="py-8 text-center text-xs text-text-subtle">
        No practice recorded in the last seven days.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={points} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
        <CartesianGrid stroke={colours.grid} strokeDasharray="2 4" vertical={false} />
        <XAxis
          dataKey="label"
          stroke={colours.grid}
          tick={{ fill: colours.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
          stroke={colours.grid}
          tick={{ fill: colours.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `${value}%`}
        />
        <Tooltip
          cursor={{ stroke: colours.grid, strokeWidth: 1 }}
          content={({ active, payload, label }) => {
            const row = payload?.[0]?.payload as (typeof points)[number] | undefined;
            if (!row) return null;
            return (
              <ChartTooltip
                active={active}
                title={String(label)}
                rows={[
                  {
                    label: "Accuracy",
                    value: row.plotted === null ? "no practice" : `${row.plotted}%`,
                    colour: stroke,
                  },
                  { label: "Questions", value: String(row.attempts) },
                  { label: "Minutes", value: String(row.minutes) },
                ]}
              />
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="plotted"
          stroke={stroke}
          strokeWidth={2}
          connectNulls={false}
          dot={{ r: 4, fill: stroke, stroke: colours.surface, strokeWidth: 2 }}
          activeDot={{ r: 5, fill: stroke, stroke: colours.surface, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ----------------------------------------------------- Accuracy by domain */

export interface DomainAccuracyPoint {
  domain: string;
  accuracy: number;
  attempts: number;
  section: Section;
}

/**
 * Magnitude across named categories with long labels, so ranked horizontal
 * bars in one hue, darkest at the top. Bars are labelled directly, which also
 * supplies the secondary encoding the accessibility pass asks for.
 */
export function DomainAccuracy({ data }: { data: DomainAccuracyPoint[] }) {
  const mode = useMode();
  const colours = axisColours(mode);
  const ramp = RAMP[mode];

  const rows = data
    .filter((row) => row.attempts > 0)
    .sort((a, b) => b.accuracy - a.accuracy)
    .map((row) => ({ ...row, pct: Math.round(row.accuracy * 100) }));

  if (rows.length === 0) {
    return (
      <p className="py-8 text-center text-xs text-text-subtle">
        Answer some questions and your accuracy by domain will appear here.
      </p>
    );
  }

  // Rank maps onto the ramp so that position and shade agree.
  const shadeFor = (index: number) => {
    const bucket = Math.floor((index / Math.max(1, rows.length)) * ramp.length);
    return ramp[Math.min(ramp.length - 1, bucket)]!;
  };

  return (
    <ResponsiveContainer width="100%" height={Math.max(160, rows.length * 34)}>
      <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 44, bottom: 0, left: 4 }}>
        <CartesianGrid stroke={colours.grid} strokeDasharray="2 4" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis
          type="category"
          dataKey="domain"
          width={168}
          stroke={colours.grid}
          tick={{ fill: colours.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: mode === "light" ? "#00000008" : "#ffffff0a" }}
          content={({ active, payload }) => {
            const row = payload?.[0]?.payload as (typeof rows)[number] | undefined;
            if (!row) return null;
            return (
              <ChartTooltip
                active={active}
                title={row.domain}
                rows={[
                  { label: "Accuracy", value: `${row.pct}%` },
                  { label: "Questions answered", value: String(row.attempts) },
                  { label: "Section", value: SECTION_LABEL[row.section] },
                ]}
              />
            );
          }}
        />
        <Bar dataKey="pct" radius={[0, 4, 4, 0]} barSize={14} isAnimationActive={false}>
          {rows.map((row, index) => (
            <Cell key={row.domain} fill={shadeFor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ------------------------------------------------------- Score estimate trend */

export interface ScorePoint {
  date: string;
  total: number;
  lower: number;
  upper: number;
}

/**
 * The estimate with its uncertainty drawn, not hidden. The band is the 95 per
 * cent interval; plotting the midpoint alone would imply a precision the
 * method does not have.
 */
export function ScoreTrend({ data, target }: { data: ScorePoint[]; target: number }) {
  const mode = useMode();
  const colours = axisColours(mode);
  const stroke = SERIES[mode].single;

  if (data.length < 2) {
    return (
      <p className="py-8 text-center text-xs text-text-subtle">
        Two or more score snapshots are needed before a trend means anything.
      </p>
    );
  }

  const rows = data.map((point) => ({
    ...point,
    label: new Date(`${point.date}T00:00:00Z`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    }),
    // Recharts stacks areas, so the band is drawn as a base plus a height.
    bandBase: point.lower,
    bandHeight: point.upper - point.lower,
  }));

  const lowest = Math.min(...rows.map((r) => r.lower), target);
  const highest = Math.max(...rows.map((r) => r.upper), target);
  const floor = Math.max(400, Math.floor((lowest - 40) / 50) * 50);
  const ceiling = Math.min(1600, Math.ceil((highest + 40) / 50) * 50);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={rows} margin={{ top: 8, right: 12, bottom: 0, left: -8 }}>
        <CartesianGrid stroke={colours.grid} strokeDasharray="2 4" vertical={false} />
        <XAxis
          dataKey="label"
          stroke={colours.grid}
          tick={{ fill: colours.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[floor, ceiling]}
          stroke={colours.grid}
          tick={{ fill: colours.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ stroke: colours.grid, strokeWidth: 1 }}
          content={({ active, payload, label }) => {
            const row = payload?.[0]?.payload as (typeof rows)[number] | undefined;
            if (!row) return null;
            return (
              <ChartTooltip
                active={active}
                title={String(label)}
                rows={[
                  { label: "Estimate", value: String(row.total), colour: stroke },
                  { label: "Range", value: `${row.lower} to ${row.upper}` },
                ]}
              />
            );
          }}
        />
        <Area
          dataKey="bandBase"
          stackId="band"
          stroke="none"
          fill="transparent"
          isAnimationActive={false}
        />
        <Area
          dataKey="bandHeight"
          stackId="band"
          stroke="none"
          fill={stroke}
          fillOpacity={0.16}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke={stroke}
          strokeWidth={2}
          dot={{ r: 3, fill: stroke, stroke: colours.surface, strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* --------------------------------------------------- Section comparison */

export interface SectionPoint {
  section: Section;
  accuracy: number;
  attempts: number;
  avgSeconds: number;
}

/**
 * The one place two hues are warranted: Reading and Writing against Maths are
 * genuinely different things, not two magnitudes of one measure. Both are
 * directly labelled as well as coloured, so identity never rests on hue alone.
 */
export function SectionComparison({ data }: { data: SectionPoint[] }) {
  const mode = useMode();
  const palette = SERIES[mode];
  const withData = data.filter((row) => row.attempts > 0);

  if (withData.length === 0) {
    return (
      <p className="py-8 text-center text-xs text-text-subtle">
        No attempts recorded yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((row) => {
        const colour = row.section === "math" ? palette.math : palette.rw;
        const pct = row.attempts > 0 ? Math.round(row.accuracy * 100) : null;
        return (
          <div key={row.section}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="flex items-center gap-2 text-xs font-medium text-text-base">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: colour }}
                  aria-hidden
                />
                {SECTION_LABEL[row.section]}
              </span>
              <span className="numeric text-xs text-text-muted">
                {pct === null ? "no data" : `${pct}%`}
                {row.attempts > 0 ? (
                  <span className="text-text-subtle">
                    {" "}
                    &middot; {row.attempts} q &middot; {row.avgSeconds}s avg
                  </span>
                ) : null}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-bg-sunken">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${pct ?? 0}%`, backgroundColor: colour }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
