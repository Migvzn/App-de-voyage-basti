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

const TABS = ["Overview", "Trips", "Achievements", "Wishlist"] as const;
type Tab = typeof TABS[number];

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  planning: { label: "Planning", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  completed: { label: "Completed", color: "text-green-400 bg-green-500/10 border-green-500/20" },
};

const WISHLIST = [
  { name: "Kyoto", country: "Japan", emoji: "⛩️", note: "Cherry blossom season" },
  { name: "Lisbon", country: "Portugal", emoji: "🚋", note: "Street art & fado music" },
  { name: "Iceland", country: "Iceland", emoji: "🌋", note: "Northern lights" },
  { name: "Maldives", country: "Maldives", emoji: "🏝️", note: "Ultimate relaxation" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const profile = MOCK_USER_PROFILE;
  const trips = MOCK_SAVED_TRIPS;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/25">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#f5f5f5]">Welcome back, {profile.name.split(" ")[0]}</h1>
              <p className="text-[#555555] text-sm mt-0.5">{profile.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-4 h-4" />
              New Trip
            </Link>
            <button className="p-2.5 bg-[#111111] border border-[#222222] text-[#888888] rounded-xl hover:text-[#f5f5f5] transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <QuickStat icon={<Globe className="w-5 h-5 text-indigo-400" />} value={profile.stats.countriesVisited} label="Countries" />
          <QuickStat icon={<MapPin className="w-5 h-5 text-purple-400" />} value={profile.stats.tripsPlanned} label="Trips Planned" />
          <QuickStat icon={<TrendingUp className="w-5 h-5 text-green-400" />} value={`${profile.stats.streak}d`} label="Current Streak" />
          <QuickStat icon={<History className="w-5 h-5 text-orange-400" />} value={`Lvl ${profile.stats.level}`} label={`${profile.stats.totalXP} XP`} />
        </div>

        {/* Tabs */}
        <div className="border-b border-[#1a1a1a] mb-8 flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 transition-all",
                activeTab === tab
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-[#555555] hover:text-[#888888]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "Overview" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-[#f5f5f5] mb-4">Recent Trips</h2>
              <div className="space-y-3">
                {trips.map(trip => (
                  <TripRow key={trip.id} trip={trip} />
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-[#f5f5f5] mb-4">Countries Visited</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.visitedCountries.map(country => (
                    <span key={country} className="px-3 py-1.5 bg-[#111111] border border-[#222222] rounded-lg text-sm text-[#888888]">
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

        {/* Trips */}
        {activeTab === "Trips" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-[#f5f5f5]">All Trips</h2>
              <Link
                href="/chat"
                className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Plan new trip
              </Link>
            </div>
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        {/* Achievements */}
        {activeTab === "Achievements" && (
          <DashboardStats profile={profile} />
        )}

        {/* Wishlist */}
        {activeTab === "Wishlist" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#f5f5f5]">Dream Destinations</h2>
              <Link
                href="/explore"
                className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Explore more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WISHLIST.map(item => (
                <Link
                  key={item.name}
                  href={`/chat?q=Plan a trip to ${item.name}, ${item.country}`}
                  className="group bg-[#111111] border border-[#222222] rounded-2xl p-5 hover:border-indigo-500/30 transition-all"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="font-semibold text-[#f5f5f5] group-hover:text-indigo-400 transition-colors">{item.name}</h3>
                  <p className="text-xs text-[#555555] mt-0.5 mb-2">{item.country}</p>
                  <p className="text-xs text-[#888888]">{item.note}</p>
                  <div className="mt-4 flex items-center text-xs text-indigo-400 gap-1">
                    <Bookmark className="w-3 h-3" />
                    Plan this trip
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
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-4">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold text-[#f5f5f5]">{value}</div>
      <div className="text-xs text-[#555555] mt-0.5">{label}</div>
    </div>
  );
}

function TripRow({ trip }: { trip: typeof MOCK_SAVED_TRIPS[0] }) {
  const status = STATUS_CONFIG[trip.status];
  return (
    <div className="flex items-center gap-4 p-4 bg-[#111111] border border-[#222222] rounded-xl hover:border-[#333333] transition-all group">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl flex items-center justify-center text-xl shrink-0">
        🗺️
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[#f5f5f5] text-sm">{trip.title}</div>
        <div className="flex items-center gap-2 text-xs text-[#555555] mt-0.5">
          <MapPin className="w-2.5 h-2.5" />
          {trip.destination}
          <Calendar className="w-2.5 h-2.5 ml-1" />
          {formatDate(trip.dates.start)}
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-end gap-1">
        <span className={cn("px-2 py-0.5 rounded-full text-xs border", status.color)}>{status.label}</span>
        <span className="text-xs text-[#555555]">{formatCurrency(trip.totalCost, trip.currency)}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-[#333333] group-hover:text-[#888888] transition-colors shrink-0" />
    </div>
  );
}

function TripCard({ trip }: { trip: typeof MOCK_SAVED_TRIPS[0] }) {
  const status = STATUS_CONFIG[trip.status];
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden hover:border-[#333333] transition-all">
      <div className="flex">
        <div className="w-32 sm:w-40 shrink-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 flex items-center justify-center">
          <span className="text-5xl opacity-30">🗺️</span>
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-semibold text-[#f5f5f5]">{trip.title}</h3>
              <div className="flex items-center gap-2 text-xs text-[#555555] mt-1">
                <MapPin className="w-3 h-3" />
                {trip.destination}
              </div>
            </div>
            <span className={cn("px-2 py-0.5 rounded-full text-xs border shrink-0", status.color)}>{status.label}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#555555]">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(trip.dates.start)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{trip.duration} days</span>
            <span className="font-medium text-[#888888]">{formatCurrency(trip.totalCost, trip.currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
