import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Globe, MapPin, Award } from "lucide-react";

const VISITED = [
  { country: "Portugal", flag: "🇵🇹", pct: 80, cities: ["Lisbonne", "Porto", "Faro"] },
  { country: "Japon", flag: "🇯🇵", pct: 45, cities: ["Tokyo", "Kyoto"] },
  { country: "Espagne", flag: "🇪🇸", pct: 60, cities: ["Barcelone", "Madrid", "Séville"] },
  { country: "Italie", flag: "🇮🇹", pct: 40, cities: ["Rome", "Florence"] },
  { country: "Maroc", flag: "🇲🇦", pct: 30, cities: ["Marrakech"] },
  { country: "Indonésie", flag: "🇮🇩", pct: 25, cities: ["Bali"] },
];

export default function MapPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Nav />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0A0A0A]">Ma carte du monde 🗺️</h1>
              <p className="text-gray-500 mt-1">Visualisez vos aventures et découvrez ce qui vous attend</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Pays visités", value: "6", icon: Globe, color: "text-[#FF5A3C]" },
              { label: "Villes", value: "14", icon: MapPin, color: "text-blue-500" },
              { label: "Jours voyagés", value: "47", icon: Award, color: "text-green-500" },
              { label: "Continents", value: "3", icon: Globe, color: "text-violet-500" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                <div className="text-3xl font-bold text-[#0A0A0A]">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="relative h-80 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🌍</div>
                <p className="text-gray-500 font-medium">Carte interactive Mapbox</p>
                <p className="text-gray-400 text-sm mt-1">Configurez NEXT_PUBLIC_MAPBOX_TOKEN pour activer</p>
                <Link href="/chat" className="inline-block mt-4 bg-[#FF5A3C] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#E8432A] transition-colors">
                  Planifier un nouveau voyage ✈️
                </Link>
              </div>
            </div>
          </div>

          {/* Countries visited */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-[#0A0A0A] mb-5">Pays explorés</h2>
            <div className="space-y-4">
              {VISITED.map((v) => (
                <div key={v.country}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="text-xl">{v.flag}</span>
                      {v.country}
                      <span className="text-xs text-gray-400 font-normal">· {v.cities.join(", ")}</span>
                    </span>
                    <span className="text-[#FF5A3C] font-bold">{v.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${v.pct}%`,
                        background: v.pct >= 60 ? "#FF5A3C" : v.pct >= 30 ? "#FB923C" : "#FED7AA",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              🔴 60%+ · 🟠 30–60% · 🟡 &lt; 30% exploration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
