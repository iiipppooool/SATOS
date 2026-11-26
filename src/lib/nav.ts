export interface NavItem {
  href: string;
  label: string;
  /** Lucide icon name, resolved in the sidebar component. */
  icon: string;
  description: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        href: "/dashboard",
        label: "Command Centre",
        icon: "gauge",
        description: "Where you stand, and what to do today",
      },
      {
        href: "/analytics",
        label: "Analytics",
        icon: "chart",
        description: "Accuracy, timing and trend over time",
      },
    ],
  },
  {
    label: "Practice",
    items: [
      {
        href: "/practice",
        label: "Practice",
        icon: "target",
        description: "Build a drill from any skill or difficulty",
      },
      {
        href: "/trainer",
        label: "Pattern Trainer",
        icon: "zap",
        description: "Name the pattern before you solve it",
      },
      {
        href: "/exam",
        label: "Exam Simulator",
        icon: "clock",
        description: "Full adaptive digital SAT under timed conditions",
      },
    ],
  },
  {
    label: "Diagnose",
    items: [
      {
        href: "/weaknesses",
        label: "Weakness Detector",
        icon: "crosshair",
        description: "Ranked by points recoverable, not by how weak",
      },
      {
        href: "/errors",
        label: "Error Log",
        icon: "alert",
        description: "Every mistake, classified by cause",
      },
    ],
  },
  {
    label: "Library",
    items: [
      {
        href: "/bank",
        label: "Question Bank",
        icon: "library",
        description: "Search, filter and collect questions",
      },
      {
        href: "/tutor",
        label: "AI Tutor",
        icon: "sparkles",
        description: "Explanations, variants and mistake analysis",
      },
      {
        href: "/plan",
        label: "Study Plan",
        icon: "calendar",
        description: "Your schedule between now and the test",
      },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV.flatMap((group) => group.items);

export function navItemFor(pathname: string): NavItem | undefined {
  // Longest match wins so /practice/session resolves to /practice.
  return [...ALL_NAV_ITEMS]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
}
