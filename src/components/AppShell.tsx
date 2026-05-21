"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Globe2,
  MessageCircle,
  PieChart,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { XpToast } from "@/components/XpToast";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { levelProgress } from "@/lib/gamification";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "nav.chat", href: "/chat", icon: MessageCircle },
  { key: "nav.explore", href: "/explore", icon: Compass },
  { key: "nav.map", href: "/map", icon: Globe2 },
  { key: "nav.budget", href: "/budget", icon: PieChart },
  { key: "nav.community", href: "/community", icon: Users },
  { key: "nav.pricing", href: "/pricing", icon: Sparkles },
];

const MOBILE_NAV = [
  { key: "nav.chat", href: "/chat", icon: MessageCircle },
  { key: "nav.explore", href: "/explore", icon: Compass },
  { key: "nav.map", href: "/map", icon: Globe2 },
  { key: "nav.budget", href: "/budget", icon: PieChart },
  { key: "nav.profile", href: "/profile", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useT();
  const { profile, language, setLanguage } = useApp();
  const lvl = levelProgress(profile.xp);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="min-h-screen lg:flex">
      {/* ── Desktop sidebar ── */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-[var(--surface)] p-5 lg:flex">
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand text-white shadow-soft"
                    : "text-muted hover:bg-[var(--elevated)] hover:text-ink",
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="h-10 flex-1 rounded-2xl border border-line bg-[var(--elevated)] text-sm font-medium uppercase text-muted transition-colors hover:border-brand/40 hover:text-ink"
            >
              {language}
            </button>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-2xl border border-line bg-[var(--elevated)] p-3 transition-colors hover:border-brand/40"
          >
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold text-white"
              style={{ background: lvl.color }}
            >
              {profile.name.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-ink">
                {profile.name}
              </div>
              <div className="truncate text-xs text-muted">
                {lvl.name} · niv. {lvl.level}
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* ── Main column ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-[var(--surface)]/90 px-4 py-3 backdrop-blur lg:hidden">
          <Logo />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="h-10 w-10 rounded-2xl border border-line bg-[var(--elevated)] text-sm font-medium uppercase text-muted"
            >
              {language}
            </button>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-[var(--surface)]/95 backdrop-blur lg:hidden">
        {MOBILE_NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-brand" : "text-muted",
              )}
            >
              <item.icon className="h-5 w-5" strokeWidth={active ? 2.3 : 1.8} />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>

      <XpToast />
    </div>
  );
}
