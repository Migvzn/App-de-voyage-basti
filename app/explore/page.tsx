"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MOCK_DESTINATIONS } from "@/data/mock";
import { Search, Filter, Star, MapPin, ArrowRight, Globe } from "lucide-react";
import Map from "@/components/Map";
import { getStaticDestinationImage } from "@/lib/unsplash";

const REGIONS = ["Tout", "Europe", "Asie", "Amériques", "Moyen-Orient", "Afrique"];
const STYLES = ["Tout", "Budget", "Confort", "Luxe"];
const FILTERS_BEST_FOR = ["Culture", "Gastronomie", "Plage", "Aventure", "Romantisme"];

const REGION_MAP_FR: Record<string, string[]> = {
  "Europe": ["Italy", "Spain", "France", "Greece", "Morocco", "Portugal"],
  "Asie": ["Japan", "Indonesia", "Thailand"],
  "Amériques": ["United States"],
  "Moyen-Orient": ["UAE"],
  "Afrique": ["Morocco"],
};

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Tout");
  const [style, setStyle] = useState("Tout");
  const [bestFor, setBestFor] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "map">("grid");

  const filtered = MOCK_DESTINATIONS.filter(dest => {
    const matchesSearch = !search ||
      dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.country.toLowerCase().includes(search.toLowerCase());

    const matchesRegion = region === "Tout" ||
      REGION_MAP_FR[region]?.includes(dest.country);

    const matchesBestFor = !bestFor ||
      dest.bestFor.some(b => b.toLowerCase().includes(bestFor.toLowerCase()));

    const matchesStyle = style === "Tout" || (() => {
      if (style === "Budget") return dest.avgBudgetPerDay < 80;
      if (style === "Confort") return dest.avgBudgetPerDay >= 80 && dest.avgBudgetPerDay <= 150;
      if (style === "Luxe") return dest.avgBudgetPerDay > 150;
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
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une destination..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>

            {/* Filtres */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-lg">
                {REGIONS.slice(0, 4).map(r => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={cn(
                      "px-3 py-1.5 rounded text-xs font-medium transition-all",
                      region === r ? "bg-sky-100 text-sky-600" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Bascule vue */}
              <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-lg">
                <button
                  onClick={() => setView("grid")}
                  className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all", view === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400")}
                >
                  Grille
                </button>
                <button
                  onClick={() => setView("map")}
                  className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all", view === "map" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400")}
                >
                  Carte
                </button>
              </div>
            </div>
          </div>

          {/* Filtres rapides */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            {FILTERS_BEST_FOR.map(f => (
              <button
                key={f}
                onClick={() => setBestFor(bestFor === f ? null : f)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-all border",
                  bestFor === f
                    ? "bg-sky-50 border-sky-300 text-sky-600"
                    : "bg-transparent border-slate-200 text-slate-500 hover:text-slate-700"
                )}
              >
                {f}
              </button>
            ))}
            {STYLES.slice(1).map(s => (
              <button
                key={s}
                onClick={() => setStyle(style === s ? "Tout" : s)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-all border",
                  style === s
                    ? "bg-blue-50 border-blue-300 text-blue-600"
                    : "bg-transparent border-slate-200 text-slate-500 hover:text-slate-700"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Compteur résultats */}
        <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
          <Globe className="w-4 h-4" />
          <span>{filtered.length} destination{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}</span>
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
                href={`/chat?q=Planifie un voyage détaillé à ${dest.name}, ${dest.country}`}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-sky-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="h-44 relative overflow-hidden bg-gradient-to-br from-sky-100 to-blue-50">
                  <Image
                    src={getStaticDestinationImage(dest.name, 400, 176)}
                    alt={dest.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
                  />
                  {dest.trending && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-sky-500/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white">
                      Tendance
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-yellow-500">
                    <Star className="w-2.5 h-2.5 fill-yellow-400" />
                    {dest.rating}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">{dest.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-2.5 h-2.5" />
                        {dest.country}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900">~{dest.avgBudgetPerDay}€</div>
                      <div className="text-xs text-slate-400">/jour</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 mb-3 line-clamp-2 leading-relaxed">{dest.tagline}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {dest.bestFor.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-500">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center text-xs text-sky-500 group-hover:gap-2 transition-all gap-1">
                    Planifier ce voyage
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <Globe className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <div className="text-slate-400 text-lg font-medium mb-2">Aucune destination trouvée</div>
            <div className="text-slate-300 text-sm">Essayez de modifier vos filtres</div>
          </div>
        )}
      </div>
    </div>
  );
}
