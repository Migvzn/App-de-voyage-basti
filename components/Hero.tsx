"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, MapPin, TrendingUp } from "lucide-react";
import { MOCK_DESTINATIONS } from "@/data/mock";

const TRENDING = MOCK_DESTINATIONS.filter(d => d.trending).slice(0, 5);

const PLACEHOLDER_QUERIES = [
  "Plan a 7-day trip to Rome for 2 people on €2000 budget...",
  "I want to visit Tokyo for 10 days in November, solo trip...",
  "Budget honeymoon in Santorini, 5 nights, what's possible?",
  "Best 2-week itinerary for Southeast Asia under $1500...",
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#222222] text-sm text-[#888888] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Powered by Claude AI — Your Personal Travel Agent</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f5f5f5] mb-6 leading-[1.1]">
          Your AI Travel
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
            Agent & Concierge
          </span>
        </h1>

        <p className="text-xl text-[#888888] mb-12 max-w-2xl mx-auto leading-relaxed">
          Plan your perfect trip in seconds. ILUR crafts personalized itineraries,
          finds the best deals, and thinks like a seasoned traveler who has been everywhere.
        </p>

        {/* Search box */}
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-focus-within:opacity-60 transition-opacity duration-300 blur-sm" />
            <div className="relative flex items-center bg-[#111111] border border-[#222222] rounded-xl overflow-hidden group-focus-within:border-indigo-500/50 transition-colors">
              <div className="pl-5 pr-3 text-[#555555]">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={displayedPlaceholder || "Where do you want to go?"}
                className="flex-1 bg-transparent px-2 py-5 text-[#f5f5f5] placeholder:text-[#555555] text-base focus:outline-none"
              />
              <button
                type="submit"
                className="m-2 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
              >
                Plan Trip
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          <span className="text-xs text-[#555555]">Try:</span>
          {["Rome 7 days", "Tokyo solo trip", "Bali budget", "Paris honeymoon"].map(s => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="px-3 py-1.5 rounded-full bg-[#111111] border border-[#222222] text-xs text-[#888888] hover:text-[#f5f5f5] hover:border-[#333333] transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Trending destinations */}
        <div className="mt-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-[#888888]">Trending destinations</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRENDING.map(dest => (
              <Link
                key={dest.id}
                href={`/chat?q=Plan a trip to ${dest.name}`}
                className="group flex items-center gap-3 px-4 py-3 bg-[#111111] border border-[#222222] rounded-xl hover:border-indigo-500/30 hover:bg-[#131320] transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center text-sm">
                  {dest.name.slice(0, 1)}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-[#f5f5f5] group-hover:text-indigo-400 transition-colors">{dest.name}</div>
                  <div className="text-xs text-[#555555]">{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full border-t border-[#111111] bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "50K+", label: "Trips Planned" },
            { value: "120+", label: "Destinations" },
            { value: "4.9★", label: "Avg Rating" },
            { value: "2 min", label: "Avg Plan Time" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-[#f5f5f5]">{stat.value}</div>
              <div className="text-sm text-[#555555]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
