"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  Clock,
  Crosshair,
  Gauge,
  Library,
  Menu,
  Settings,
  Sparkles,
  Target,
  X,
  Zap,
  LogOut,
} from "lucide-react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { logoutAction } from "@/app/(auth)/actions";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  gauge: Gauge,
  chart: BarChart3,
  target: Target,
  zap: Zap,
  clock: Clock,
  crosshair: Crosshair,
  alert: AlertTriangle,
  library: Library,
  sparkles: Sparkles,
  calendar: CalendarDays,
};

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
      {NAV.map((group) => (
        <div key={group.label}>
          <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-subtle">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = ICONS[item.icon] ?? Gauge;
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[var(--radius-control)] px-2 py-2 text-sm transition-colors",
                      active
                        ? "bg-accent-soft font-medium text-accent"
                        : "text-text-muted hover:bg-surface-hover hover:text-text-base",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter({ email, name }: { email: string; name: string | null }) {
  const pathname = usePathname();
  const settingsActive = pathname.startsWith("/settings");

  return (
    <div className="border-t px-3 py-3">
      <Link
        href="/settings"
        className={cn(
          "flex items-center gap-2.5 rounded-[var(--radius-control)] px-2 py-2 text-sm transition-colors",
          settingsActive
            ? "bg-accent-soft font-medium text-accent"
            : "text-text-muted hover:bg-surface-hover hover:text-text-base",
        )}
      >
        <Settings className="h-4 w-4 shrink-0" />
        Settings
      </Link>

      <div className="mt-2 flex items-center gap-2 px-2 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-hover text-[11px] font-semibold uppercase text-text-muted">
          {(name ?? email).slice(0, 1)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-text-base">{name ?? "Signed in"}</p>
          <p className="truncate text-[11px] text-text-subtle">{email}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            id="sign-out"
            data-testid="sign-out"
            aria-label="Sign out"
            title="Sign out"
            className="rounded p-1.5 text-text-subtle transition-colors hover:bg-surface-hover hover:text-text-base"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function Sidebar({ email, name }: { email: string; name: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-bg-elevated/95 px-4 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="rounded p-1.5 text-text-muted hover:bg-surface-hover hover:text-text-base"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-accent text-[11px] font-bold text-accent-contrast">
            S
          </div>
          <span className="text-sm font-semibold tracking-tight">SAT OS</span>
        </div>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-bg-elevated shadow-[var(--shadow-popover)]">
            <div className="flex h-14 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-accent text-[11px] font-bold text-accent-contrast">
                  S
                </div>
                <span className="text-sm font-semibold tracking-tight">SAT OS</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded p-1.5 text-text-muted hover:bg-surface-hover"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
            <SidebarFooter email={email} name={name} />
          </div>
        </div>
      ) : null}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r bg-bg-elevated lg:flex">
        <div className="flex h-14 items-center gap-2.5 border-b px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-contrast">
            S
          </div>
          <span className="text-sm font-semibold tracking-tight">SAT OS</span>
        </div>
        <NavLinks />
        <SidebarFooter email={email} name={name} />
      </aside>
    </>
  );
}
