"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MOCK_DESTINATIONS } from "@/data/mock";
import { Search, Filter, Star, MapPin, ArrowRight, Globe } from "lucide-react";
import Map from "@/components/Map";

const REGIONS = ["All", "Europe", "Asia", "Americas", "Middle East", "Africa"];
const STYLES = ["All", "Budget", "Comfort", "Luxury"];
const FILTERS_BEST_FOR = ["Culture", "Food", "Beach", "Adventure", "Romance"];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [style, setStyle] = useState("All");
  const [bestFor, setBestFor] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "map">("grid");

  const REGION_MAP: Record<string, string[]> = {
    "Europe": ["Italy", "Spain", "France", "Greece", "Morocco", "Portugal"],
    "Asia": ["Japan", "Indonesia", "Thailand"],
    "Americas": ["United States"],
    "Middle East": ["UAE"],
    "Africa": ["Morocco"],
  };

  const filtered = MOCK_DESTINATIONS.filter(dest => {
    const matchesSearch = !search ||
      dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.country.toLowerCase().includes(search.toLowerCase());

    const matchesRegion = region === "All" ||
      REGION_MAP[region]?.includes(dest.country);

    const matchesBestFor = !bestFor ||
      dest.bestFor.some(b => b.toLowerCase().includes(bestFor.toLowerCase()));

    const matchesStyle = style === "All" || (() => {
      if (style === "Budget") return dest.avgBudgetPerDay < 80;
      if (style === "Comfort") return dest.avgBudgetPerDay >= 80 && dest.avgBudgetPerDay <= 150;
      if (style === "Luxury") return dest.avgBudgetPerDay > 150;
      return true;
    })();

    return matchesSearch && matchesRegion && matchesBestFor && matchesStyle;
  });

  const mapPins = filtered.map(d => ({
    lat: d.coordinates.lat,
    lng: d.coordinates.lng,
    label: d.name,
    type: "destination" as const,
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      {/* Header */}
      <div className="border-b border-[#111111] bg-[#0a0a0a] sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555555]" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f5f5f5] placeholder:text-[#444444] focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-[#111111] border border-[#222222] rounded-lg">
                {REGIONS.slice(0, 4).map(r => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={cn(
                      "px-3 py-1.5 rounded text-xs font-medium transition-all",
                      region === r ? "bg-indigo-500/20 text-indigo-400" : "text-[#555555] hover:text-[#888888]"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#111111] border border-[#222222] rounded-lg">
                <button
                  onClick={() => setView("grid")}
                  className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all", view === "grid" ? "bg-[#1a1a1a] text-[#f5f5f5]" : "text-[#555555]")}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("map")}
                  className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all", view === "map" ? "bg-[#1a1a1a] text-[#f5f5f5]" : "text-[#555555]")}
                >
                  Map
                </button>
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-[#555555]" />
            {FILTERS_BEST_FOR.map(f => (
              <button
                key={f}
                onClick={() => setBestFor(bestFor === f ? null : f)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-all border",
                  bestFor === f
                    ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-400"
                    : "bg-transparent border-[#222222] text-[#555555] hover:text-[#888888]"
                )}
              >
                {f}
              </button>
            ))}
            {STYLES.slice(1).map(s => (
              <button
                key={s}
                onClick={() => setStyle(style === s ? "All" : s)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-all border",
                  style === s
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-400"
                    : "bg-transparent border-[#222222] text-[#555555] hover:text-[#888888]"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Results count */}
        <div className="flex items-center gap-2 mb-6 text-sm text-[#555555]">
          <Globe className="w-4 h-4" />
          <span>{filtered.length} destinations found</span>
        </div>

        {view === "map" ? (
          <Map
            pins={mapPins}
            center={{ lat: 30, lng: 15 }}
            zoom={2}
            className="h-[600px] rounded-2xl"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(dest => (
              <Link
                key={dest.id}
                href={`/chat?q=Plan a detailed trip to ${dest.name}, ${dest.country}`}
                className="group bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image area */}
                <div className="h-44 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-25">
                      {dest.name === "Rome" ? "🏛️" :
                       dest.name === "Tokyo" ? "🗼" :
                       dest.name === "Barcelona" ? "🏖️" :
                       dest.name === "Bali" ? "🌴" :
                       dest.name === "Paris" ? "🗼" :
                       dest.name === "Marrakech" ? "🕌" :
                       dest.name === "Santorini" ? "⛵" :
                       dest.name === "Dubai" ? "🏙️" : "🌍"}
                    </span>
                  </div>
                  {dest.trending && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-indigo-500/80 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white">
                      Trending
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-[#0a0a0a]/70 backdrop-blur-sm rounded-full text-xs text-yellow-400">
                    <Star className="w-2.5 h-2.5 fill-yellow-400" />
                    {dest.rating}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-[#f5f5f5] group-hover:text-indigo-400 transition-colors">{dest.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-[#555555]">
                        <MapPin className="w-2.5 h-2.5" />
                        {dest.country}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#f5f5f5]">~€{dest.avgBudgetPerDay}</div>
                      <div className="text-xs text-[#555555]">/day</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#888888] mt-2 mb-3 line-clamp-2 leading-relaxed">{dest.tagline}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {dest.bestFor.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-[#1a1a1a] rounded text-[10px] text-[#555555]">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center text-xs text-indigo-400 group-hover:gap-2 transition-all gap-1">
                    Plan this trip
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <Globe className="w-16 h-16 text-[#222222] mx-auto mb-4" />
            <div className="text-[#555555] text-lg font-medium mb-2">No destinations found</div>
            <div className="text-[#444444] text-sm">Try adjusting your filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
