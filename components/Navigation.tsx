"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Compass, MessageSquare, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/explore", label: "Explorer", icon: Compass },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === href
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-700 hover:text-sky-500 hover:bg-sky-50"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors">
            <LogIn className="w-4 h-4" />
            Connexion
          </button>
          <Link
            href="/chat"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 transition-all shadow-sm shadow-sky-200"
          >
            Planifier un voyage
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pb-4">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                pathname === href
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-700 hover:text-sky-500"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/chat"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-sky-500 to-sky-600 text-white"
          >
            Planifier un voyage
          </Link>
        </div>
      )}
    </header>
  );
}
