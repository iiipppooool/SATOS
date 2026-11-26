"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui";

/**
 * The formula reference the digital SAT provides on every Maths question.
 *
 * It is included because practising without it trains the wrong habit: on the
 * real test you do not need to recall these, and students who memorise them
 * anyway waste revision time. Everything here is standard secondary-school
 * geometry, reproduced as plain text rather than copied from any source.
 */
const GROUPS: Array<{ title: string; items: string[] }> = [
  {
    title: "Circles",
    items: [
      "Area = pi r squared",
      "Circumference = 2 pi r",
      "Arc length = (theta / 360) x 2 pi r,  theta in degrees",
      "Sector area = (theta / 360) x pi r squared",
      "With theta in radians: arc = r theta,  sector = (1/2) r squared theta",
      "Equation: (x - h) squared + (y - k) squared = r squared",
      "A full circle is 360 degrees, or 2 pi radians",
    ],
  },
  {
    title: "Triangles",
    items: [
      "Area = (1/2) base x height",
      "Pythagoras: a squared + b squared = c squared",
      "Special right triangles: 30-60-90 sides are 1 : root 3 : 2",
      "Special right triangles: 45-45-90 sides are 1 : 1 : root 2",
      "Angles in a triangle sum to 180 degrees",
      "sin = opposite / hypotenuse,  cos = adjacent / hypotenuse,  tan = opposite / adjacent",
    ],
  },
  {
    title: "Rectangles and solids",
    items: [
      "Rectangle area = length x width",
      "Rectangular solid volume = length x width x height",
      "Cylinder volume = pi r squared h",
      "Sphere volume = (4/3) pi r cubed",
      "Cone volume = (1/3) pi r squared h",
      "Pyramid volume = (1/3) base area x height",
    ],
  },
  {
    title: "Worth knowing, not on the sheet",
    items: [
      "Slope = (change in y) / (change in x)",
      "Quadratic formula: x = (-b plus or minus root(b squared - 4ac)) / 2a",
      "Discriminant b squared - 4ac: positive gives two roots, zero gives one, negative gives none",
      "Sum of roots = -b/a,  product of roots = c/a",
      "Vertex of y = ax squared + bx + c is at x = -b / (2a)",
      "Percentage change multiplier: increase of p% is (1 + p/100)",
      "Exponential model: N(t) = N0 x b raised to (t / period)",
    ],
  },
];

export function ReferenceSheet({ onClose }: { onClose: () => void }) {
  // Escape closes, as it does in the real testing app.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Maths reference sheet"
        className="w-full max-w-3xl rounded-[var(--radius-card)] border bg-bg-elevated shadow-[var(--shadow-popover)]"
      >
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Reference</h2>
            <p className="mt-0.5 text-[11px] text-text-muted">
              The real test gives you the first three groups on every Maths question. The fourth is
              not provided, so it does need to be in your head.
            </p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                {group.title}
              </p>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-xs leading-relaxed text-text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t px-5 py-2.5">
          <p className="text-[11px] text-text-subtle">
            Press Escape or R to close. The real test also provides a built-in Desmos graphing
            calculator, which this simulator does not reproduce.
          </p>
        </div>
      </div>
    </div>
  );
}
