"use client";

import { UserProfile } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Flame, Globe, Star, Zap, Trophy, Map, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  profile: UserProfile;
}

const LEVEL_TITLES = ["Explorer", "Adventurer", "Voyager", "Navigator", "Globetrotter", "Legend"];

export default function DashboardStats({ profile }: DashboardStatsProps) {
  const { stats, achievements } = profile;
  const levelTitle = LEVEL_TITLES[Math.min(stats.level - 1, LEVEL_TITLES.length - 1)];
  const xpForNextLevel = stats.level * 1000;
  const xpProgress = (stats.totalXP % 1000) / 10;

  return (
    <div className="space-y-6">
      {/* Level & XP */}
      <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-sm text-indigo-400 font-medium mb-1">Level {stats.level} — {levelTitle}</div>
            <div className="text-3xl font-bold text-[#f5f5f5]">{stats.totalXP.toLocaleString()} XP</div>
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-2xl font-bold text-white">{stats.level}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-[#555555] mb-2">
            <span>Progress to Level {stats.level + 1}</span>
            <span>{Math.round(xpProgress)}%</span>
          </div>
          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={<Map className="w-5 h-5 text-indigo-400" />}
          value={stats.tripsPlanned}
          label="Trips Planned"
          color="indigo"
        />
        <StatCard
          icon={<Globe className="w-5 h-5 text-purple-400" />}
          value={stats.countriesVisited}
          label="Countries"
          color="purple"
        />
        <StatCard
          icon={<Flame className="w-5 h-5 text-orange-400" />}
          value={`${stats.streak}d`}
          label="Streak"
          color="orange"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-green-400" />}
          value={stats.totalXP}
          label="Total XP"
          color="green"
        />
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          Achievements
          <span className="ml-auto text-xs text-[#555555]">{achievements.filter(a => a.unlockedAt).length}/{achievements.length}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={cn(
                "border rounded-xl p-4 transition-all",
                achievement.unlockedAt
                  ? "bg-[#111111] border-[#333333] hover:border-yellow-500/30"
                  : "bg-[#0a0a0a] border-[#1a1a1a] opacity-40"
              )}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <div className="text-sm font-medium text-[#f5f5f5] mb-1">{achievement.name}</div>
              <div className="text-xs text-[#555555]">{achievement.description}</div>
              {achievement.unlockedAt && (
                <div className="mt-2 text-xs text-yellow-500/70">
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
  color: "indigo" | "purple" | "orange" | "green";
}) {
  const colorMap = {
    indigo: "border-indigo-500/20 bg-indigo-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
    orange: "border-orange-500/20 bg-orange-500/5",
    green: "border-green-500/20 bg-green-500/5",
  };

  return (
    <div className={cn("border rounded-xl p-4", colorMap[color])}>
      <div className="mb-3">{icon}</div>
      <div className="text-2xl font-bold text-[#f5f5f5]">{value}</div>
      <div className="text-xs text-[#555555] mt-0.5">{label}</div>
    </div>
  );
}
