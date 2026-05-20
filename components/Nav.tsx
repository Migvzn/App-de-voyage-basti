"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plane, Map, LayoutDashboard, MessageSquare, Compass, Menu, X } from "lucide-react";

const links = [
  { href: "/explore", label: "Explorer", icon: Compass },
  { href: "/chat", label: "Planifier", icon: MessageSquare },
  { href: "/map", label: "Ma carte", icon: Map },
  { href: "/budget", label: "Budget", icon: LayoutDashboard },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-[#FF5A3C] rounded-xl flex items-center justify-center">
            <Plane className="w-4 h-4 text-white" />
          </div>
          <span className="text-[#0A0A0A]">Wanderly</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                pathname === href
                  ? "bg-[#FF5A3C]/10 text-[#FF5A3C]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/profile" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all">
            Mon profil
          </Link>
          <Link href="/chat" className="bg-[#FF5A3C] hover:bg-[#E8432A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-orange-200 hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5">
            Planifier un voyage ✈️
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link href="/chat" className="block text-center bg-[#FF5A3C] text-white text-sm font-semibold px-5 py-3 rounded-xl" onClick={() => setMobileOpen(false)}>
              Planifier un voyage ✈️
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
