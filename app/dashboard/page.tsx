"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { MOCK_USER_PROFILE, MOCK_SAVED_TRIPS } from "@/data/mock";
import DashboardStats from "@/components/DashboardStats";
import {
  Globe, MapPin, Calendar, Clock, ChevronRight,
  Plus, Bookmark, History, Settings, TrendingUp,
  ArrowRight
} from "lucide-react";

const TABS = ["Aperçu", "Voyages", "Succès", "Liste de souhaits"] as const;
type Tab = typeof TABS[number];

const STATUS_CONFIG = {
  upcoming: { label: "À venir", color: "text-blue-600 bg-blue-50 border-blue-200" },
  planning: { label: "En cours", color: "text-amber-600 bg-amber-50 border-amber-200" },
  completed: { label: "Terminé", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
};

const WISHLIST = [
  { name: "Kyoto", country: "Japon", emoji: "⛩️", note: "Saison des cerisiers" },
  { name: "Lisbonne", country: "Portugal", emoji: "🚋", note: "Street art & musique fado" },
  { name: "Islande", country: "Islande", emoji: "🌋", note: "Aurores boréales" },
  { name: "Maldives", country: "Maldives", emoji: "🏝️", note: "Détente absolue" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Aperçu");
  const profile = MOCK_USER_PROFILE;
  const trips = MOCK_SAVED_TRIPS;

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-sky-200">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Bonjour, {profile.name.split(" ")[0]} 👋</h1>
              <p className="text-slate-400 text-sm mt-0.5">{profile.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all shadow-sm shadow-sky-200"
            >
              <Plus className="w-4 h-4" />
              Nouveau voyage
            </Link>
            <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:text-slate-900 transition-colors shadow-sm">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <QuickStat icon={<Globe className="w-5 h-5 text-sky-500" />} value={profile.stats.countriesVisited} label="Pays visités" />
          <QuickStat icon={<MapPin className="w-5 h-5 text-blue-500" />} value={profile.stats.tripsPlanned} label="Voyages planifiés" />
          <QuickStat icon={<TrendingUp className="w-5 h-5 text-emerald-500" />} value={`${profile.stats.streak}j`} label="Série actuelle" />
          <QuickStat icon={<History className="w-5 h-5 text-amber-500" />} value={`Niv. ${profile.stats.level}`} label={`${profile.stats.totalXP} XP`} />
        </div>

        {/* Onglets */}
        <div className="border-b border-slate-200 mb-8 flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 transition-all",
                activeTab === tab
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Aperçu */}
        {activeTab === "Aperçu" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Voyages récents</h2>
              <div className="space-y-3">
                {trips.map(trip => (
                  <TripRow key={trip.id} trip={trip} />
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Pays visités</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.visitedCountries.map(country => (
                    <span key={country} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <DashboardStats profile={profile} />
            </div>
          </div>
        )}

        {/* Voyages */}
        {activeTab === "Voyages" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-slate-900">Tous mes voyages</h2>
              <Link
                href="/chat"
                className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Planifier un voyage
              </Link>
            </div>
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        {/* Succès */}
        {activeTab === "Succès" && (
          <DashboardStats profile={profile} />
        )}

        {/* Liste de souhaits */}
        {activeTab === "Liste de souhaits" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Destinations de rêve</h2>
              <Link
                href="/explore"
                className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700 transition-colors"
              >
                Explorer plus
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WISHLIST.map(item => (
                <Link
                  key={item.name}
                  href={`/chat?q=Planifie un voyage à ${item.name}, ${item.country}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 mb-2">{item.country}</p>
                  <p className="text-xs text-slate-500">{item.note}</p>
                  <div className="mt-4 flex items-center text-xs text-sky-500 gap-1">
                    <Bookmark className="w-3 h-3" />
                    Planifier ce voyage
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickStat({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}

function TripRow({ trip }: { trip: typeof MOCK_SAVED_TRIPS[0] }) {
  const status = STATUS_CONFIG[trip.status];
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group">
      <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-50 rounded-xl flex items-center justify-center text-xl shrink-0">
        🗺️
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-slate-900 text-sm">{trip.title}</div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
          <MapPin className="w-2.5 h-2.5" />
          {trip.destination}
          <Calendar className="w-2.5 h-2.5 ml-1" />
          {formatDate(trip.dates.start)}
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-end gap-1">
        <span className={cn("px-2 py-0.5 rounded-full text-xs border", status.color)}>{status.label}</span>
        <span className="text-xs text-slate-400">{formatCurrency(trip.totalCost, trip.currency)}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
    </div>
  );
}

function TripCard({ trip }: { trip: typeof MOCK_SAVED_TRIPS[0] }) {
  const status = STATUS_CONFIG[trip.status];
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all">
      <div className="flex">
        <div className="w-32 sm:w-40 shrink-0 bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center">
          <span className="text-5xl opacity-40">🗺️</span>
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-semibold text-slate-900">{trip.title}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <MapPin className="w-3 h-3" />
                {trip.destination}
              </div>
            </div>
            <span className={cn("px-2 py-0.5 rounded-full text-xs border shrink-0", status.color)}>{status.label}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(trip.dates.start)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{trip.duration} jours</span>
            <span className="font-medium text-slate-600">{formatCurrency(trip.totalCost, trip.currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
