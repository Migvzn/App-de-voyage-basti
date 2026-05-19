"use client";

import { UserProfile } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Flame, Globe, Trophy, Map, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  profile: UserProfile;
}

const LEVEL_TITLES = ["Explorateur", "Aventurier", "Voyageur", "Navigateur", "Globe-Trotteur", "Légende"];

export default function DashboardStats({ profile }: DashboardStatsProps) {
  const { stats, achievements } = profile;
  const levelTitle = LEVEL_TITLES[Math.min(stats.level - 1, LEVEL_TITLES.length - 1)];
  const xpProgress = (stats.totalXP % 1000) / 10;

  return (
    <div className="space-y-6">
      {/* Level & XP */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-sm text-sky-600 font-medium mb-1">Niveau {stats.level} — {levelTitle}</div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalXP.toLocaleString('fr-FR')} XP</div>
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200">
            <span className="text-2xl font-bold text-white">{stats.level}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Progression vers le niveau {stats.level + 1}</span>
            <span>{Math.round(xpProgress)}%</span>
          </div>
          <div className="h-2 bg-sky-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full transition-all duration-1000"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={<Map className="w-5 h-5 text-sky-500" />}
          value={stats.tripsPlanned}
          label="Voyages planifiés"
          color="sky"
        />
        <StatCard
          icon={<Globe className="w-5 h-5 text-blue-500" />}
          value={stats.countriesVisited}
          label="Pays visités"
          color="blue"
        />
        <StatCard
          icon={<Flame className="w-5 h-5 text-orange-400" />}
          value={`${stats.streak}j`}
          label="Série"
          color="orange"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          value={stats.totalXP}
          label="Total XP"
          color="emerald"
        />
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          Succès débloqués
          <span className="ml-auto text-xs text-slate-400">{achievements.filter(a => a.unlockedAt).length}/{achievements.length}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={cn(
                "border rounded-xl p-4 transition-all",
                achievement.unlockedAt
                  ? "bg-white border-slate-200 hover:border-yellow-200 shadow-sm"
                  : "bg-slate-50 border-slate-100 opacity-40"
              )}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <div className="text-sm font-medium text-slate-900 mb-1">{achievement.name}</div>
              <div className="text-xs text-slate-500">{achievement.description}</div>
              {achievement.unlockedAt && (
                <div className="mt-2 text-xs text-yellow-600">
                  {formatDate(achievement.unlockedAt)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  color: "sky" | "blue" | "orange" | "emerald";
}) {
  const colorMap = {
    sky: "border-sky-200 bg-sky-50",
    blue: "border-blue-200 bg-blue-50",
    orange: "border-orange-200 bg-orange-50",
    emerald: "border-emerald-200 bg-emerald-50",
  };

  return (
    <div className={cn("border rounded-xl p-4", colorMap[color])}>
      <div className="mb-3">{icon}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

