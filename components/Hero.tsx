"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, MapPin, TrendingUp } from "lucide-react";
import { MOCK_DESTINATIONS } from "@/data/mock";

const TRENDING = MOCK_DESTINATIONS.filter(d => d.trending).slice(0, 5);

const PLACEHOLDER_QUERIES = [
  "Planifie-moi un weekend romantique à Lisbonne...",
  "Un road trip de 7 jours en Italie avec 1 200€...",
  "Meilleurs endroits à voir à Tokyo en 5 jours...",
  "Voyage en famille à Barcelone, 4 personnes, août...",
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Animated placeholder typewriter
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const current = PLACEHOLDER_QUERIES[placeholderIdx];
    if (isTyping) {
      if (displayedPlaceholder.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(current.slice(0, displayedPlaceholder.length + 1));
        }, 35);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayedPlaceholder.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(displayedPlaceholder.slice(0, -1));
        }, 15);
      } else {
        setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_QUERIES.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedPlaceholder, isTyping, placeholderIdx]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-sky-200/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-sky-100/30 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-sm text-sky-600 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>Propulsé par Claude AI — Votre agent de voyage personnel</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          Votre agent de voyage
          <br />
          <span className="bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            intelligent & personnel
          </span>
        </h1>

        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Planifiez votre voyage parfait en quelques secondes. voyageo.ai conçoit des itinéraires
          personnalisés, trouve les meilleures offres et pense comme un voyageur expert.
        </p>

        {/* Search box */}
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl opacity-20 group-focus-within:opacity-50 transition-opacity duration-300 blur-sm" />
            <div className="relative flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden group-focus-within:border-sky-400 transition-colors shadow-sm">
              <div className="pl-5 pr-3 text-slate-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={displayedPlaceholder || "Où voulez-vous aller ?"}
                className="flex-1 bg-transparent px-2 py-5 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none"
              />
              <button
                type="submit"
                className="m-2 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-lg transition-all text-sm whitespace-nowrap shadow-sm shadow-sky-200"
              >
                Planifier
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          <span className="text-xs text-slate-400">Essayez :</span>
          {["Rome 7 jours", "Tokyo solo", "Bali budget", "Paris lune de miel"].map(s => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-all shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Trending destinations */}
        <div className="mt-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-sky-500" />
            <span className="text-sm font-medium text-slate-600">Destinations tendance</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRENDING.map(dest => (
              <Link
                key={dest.id}
                href={`/chat?q=Planifie un voyage à ${dest.name}`}
                className="group flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center text-sm">
                  {dest.name.slice(0, 1)}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-slate-900 group-hover:text-sky-600 transition-colors">{dest.name}</div>
                  <div className="text-xs text-slate-400">{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "50 000+", label: "Voyages planifiés" },
            { value: "120+", label: "Destinations" },
            { value: "4,9★", label: "Note moyenne" },
            { value: "2 min", label: "Temps moyen" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
