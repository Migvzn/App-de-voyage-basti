import Link from "next/link";
import { Nav } from "@/components/Nav";
import { BADGES, DEMO_TRIPS } from "@/lib/mock-data";
import { Award, Star } from "lucide-react";

const USER = {
  name: "Basti",
  level: 7,
  xp: 3240,
  xpToNext: 5000,
  rank: "Explorer",
  tripsCount: 3,
  countriesCount: 6,
  daysAbroad: 47,
  unlockedBadges: ["first-trip", "foodie", "europe-lover"],
};

export default function ProfilePage() {
  const xpPct = Math.round((USER.xp / USER.xpToNext) * 100);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Nav />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile header */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#FF5A3C] rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-orange-200">
                🧑‍✈️
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#0A0A0A]">{USER.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-[#FF5A3C]/10 text-[#FF5A3C] text-sm font-bold px-3 py-1 rounded-full">
                    Niveau {USER.level} · {USER.rank}
                  </span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>{USER.xp} XP</span>
                    <span>{USER.xpToNext} XP pour Niveau {USER.level + 1}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF5A3C] rounded-full"
                      style={{ width: `${xpPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-50">
              {[
                { label: "Voyages", value: USER.tripsCount },
                { label: "Pays", value: USER.countriesCount },
                { label: "Jours en voyage", value: USER.daysAbroad },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold text-[#0A0A0A]">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
            <h2 className="font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF5A3C]" />
              Badges ({USER.unlockedBadges.length}/{BADGES.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BADGES.map((badge) => {
                const unlocked = USER.unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl p-4 text-center border transition-all ${
                      unlocked
                        ? "bg-orange-50 border-orange-100"
                        : "bg-gray-50 border-gray-100 opacity-40 grayscale"
                    }`}
                  >
                    <div className="text-3xl mb-2">{badge.emoji}</div>
                    <div className={`text-xs font-bold ${unlocked ? "text-[#0A0A0A]" : "text-gray-400"}`}>
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-tight">{badge.description}</div>
                    {unlocked && (
                      <div className="text-xs text-[#FF5A3C] font-semibold mt-1">+{badge.xp} XP</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent trips */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-[#0A0A0A] mb-4">Mes voyages</h2>
            <div className="space-y-3">
              {DEMO_TRIPS.map((trip) => (
                <div key={trip.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={trip.image} alt={trip.destination} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-[#0A0A0A]">{trip.title}</div>
                    <div className="text-xs text-gray-400">{trip.travelers} voyageur(s) · {trip.status === "upcoming" ? "À venir" : "Terminé"}</div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    trip.status === "upcoming"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}>
                    {trip.status === "upcoming" ? "Prévu" : "Terminé"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
