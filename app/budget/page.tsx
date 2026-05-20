import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DEMO_TRIPS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingDown, AlertCircle } from "lucide-react";

const CATEGORIES = [
  { key: "vols", label: "Vols", emoji: "✈️", color: "bg-blue-500" },
  { key: "hébergement", label: "Hébergement", emoji: "🏨", color: "bg-violet-500" },
  { key: "restaurants", label: "Restaurants", emoji: "🍽️", color: "bg-green-500" },
  { key: "activités", label: "Activités", emoji: "🎟️", color: "bg-yellow-500" },
  { key: "transport", label: "Transport", emoji: "🚆", color: "bg-orange-500" },
  { key: "divers", label: "Divers", emoji: "💼", color: "bg-gray-400" },
];

export default function BudgetPage() {
  const totalSpent = DEMO_TRIPS.reduce((s, t) => s + t.budget.spent, 0);
  const totalPlanned = DEMO_TRIPS.reduce((s, t) => s + t.budget.total, 0);
  const remaining = totalPlanned - totalSpent;

  // Aggregate breakdown
  const breakdown: Record<string, number> = {};
  DEMO_TRIPS.forEach(t => {
    Object.entries(t.budgetBreakdown).forEach(([k, v]) => {
      breakdown[k] = (breakdown[k] || 0) + v;
    });
  });
  const total = Object.values(breakdown).reduce((s, v) => s + v, 0);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Nav />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0A0A0A]">Budget global 💰</h1>
            <p className="text-gray-500 mt-1">Tous vos voyages · {new Date().getFullYear()}</p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total planifié", value: formatCurrency(totalPlanned), color: "text-[#0A0A0A]", bg: "bg-white" },
              { label: "Dépensé", value: formatCurrency(totalSpent), color: "text-[#FF5A3C]", bg: "bg-orange-50 border-orange-100" },
              { label: "Restant", value: formatCurrency(remaining), color: "text-green-600", bg: "bg-green-50 border-green-100" },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-5 border border-gray-100`}>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-[#0A0A0A]">Budget consommé</span>
              <span className="text-sm text-gray-500">{Math.round((totalSpent / totalPlanned) * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF5A3C] rounded-full transition-all"
                style={{ width: `${Math.min((totalSpent / totalPlanned) * 100, 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-sm text-green-600">
              <TrendingDown className="w-4 h-4" />
              Dans le budget — {formatCurrency(remaining)} restants
            </div>
          </div>

          {/* Categories breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
            <h2 className="font-bold text-[#0A0A0A] mb-5">Répartition par catégorie</h2>
            <div className="space-y-4">
              {CATEGORIES.map((cat) => {
                const amount = breakdown[cat.key] || 0;
                const pct = total > 0 ? Math.round((amount / total) * 100) : 0;
                return (
                  <div key={cat.key}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="flex items-center gap-2 font-medium text-gray-700">
                        <span>{cat.emoji}</span>
                        {cat.label}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{pct}%</span>
                        <span className="font-semibold text-[#0A0A0A]">{formatCurrency(amount)}</span>
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trips list */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-[#0A0A0A] mb-5">Détail par voyage</h2>
            <div className="space-y-3">
              {DEMO_TRIPS.map((trip) => (
                <div key={trip.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={trip.image} alt={trip.destination} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#0A0A0A] text-sm">{trip.title}</div>
                    <div className="text-xs text-gray-400">{trip.status === "upcoming" ? "À venir" : "Terminé"}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-[#0A0A0A]">{formatCurrency(trip.budget.total)}</div>
                    {trip.budget.spent > 0 && (
                      <div className="text-xs text-gray-400">{formatCurrency(trip.budget.spent)} dépensé</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#FF5A3C] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#0A0A0A] text-sm mb-1">Conseil budget</p>
                <p className="text-sm text-gray-600">Réservez vos vols 6–8 semaines à l&apos;avance pour économiser en moyenne 25%. Votre prochain voyage à Barcelone pourrait coûter 80€ de moins.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
