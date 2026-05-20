import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DESTINATIONS } from "@/lib/mock-data";
import { Star, TrendingUp, ArrowRight } from "lucide-react";

const CONTINENTS = ["Tous", "Europe", "Asie", "Amérique", "Afrique", "Océanie"];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Nav />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#0A0A0A] mb-3">Explorer le monde 🌍</h1>
            <p className="text-gray-500 text-lg">Cliquez sur une destination — l&apos;IA planifie votre voyage instantanément</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CONTINENTS.map((c) => (
              <button key={c} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${c === "Tous" ? "bg-[#FF5A3C] text-white border-[#FF5A3C]" : "bg-white border-gray-200 text-gray-600 hover:border-[#FF5A3C]/40 hover:text-[#FF5A3C]"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.id}
                href={`/chat?q=Planifie-moi un voyage de 5 jours à ${dest.name}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {dest.trending && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#FF5A3C] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      Tendance
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-current text-yellow-400" />
                    {dest.rating}
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-3xl">{dest.emoji}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-[#0A0A0A] text-lg leading-none">{dest.name}</h3>
                      <p className="text-gray-400 text-sm mt-0.5">{dest.country} · {dest.continent}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#FF5A3C] font-bold text-sm">{dest.budgetPerDay.min}–{dest.budgetPerDay.max}€</div>
                      <div className="text-gray-400 text-xs">par jour</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{dest.tagline}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[#FF5A3C] text-sm font-semibold group-hover:gap-2 transition-all">
                    Planifier ce voyage <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
