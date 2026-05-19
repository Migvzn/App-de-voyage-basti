"use client";

import { BudgetBreakdown as BudgetBreakdownType } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { PieChart, DollarSign, TrendingUp, Users } from "lucide-react";

interface BudgetBreakdownProps {
  budget: BudgetBreakdownType;
}

const CATEGORIES = [
  { key: "flights", label: "Flights", color: "#6366f1", emoji: "✈️" },
  { key: "accommodation", label: "Hotels", color: "#8b5cf6", emoji: "🏨" },
  { key: "food", label: "Food", color: "#f59e0b", emoji: "🍽️" },
  { key: "activities", label: "Activities", color: "#10b981", emoji: "🎯" },
  { key: "transport", label: "Transport", color: "#3b82f6", emoji: "🚌" },
  { key: "misc", label: "Misc", color: "#6b7280", emoji: "💼" },
] as const;

export default function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  const total = budget.total || 1;

  // Build SVG donut chart
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 60;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * r;

  let cumulativePercent = 0;

  const segments = CATEGORIES.map(cat => {
    const value = budget[cat.key as keyof BudgetBreakdownType] as number || 0;
    const percent = value / total;
    const dasharray = circumference;
    const dashoffset = circumference - percent * circumference;
    const offset = cumulativePercent * circumference;
    cumulativePercent += percent;
    return { ...cat, value, percent, dasharray, dashoffset, offset };
  }).filter(s => s.value > 0);

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-[#f5f5f5] mb-6 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-indigo-400" />
        Budget Breakdown
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Donut Chart */}
        <div className="relative shrink-0">
          <svg width={size} height={size} className="-rotate-90">
            {/* Background circle */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={strokeWidth}
            />
            {segments.map((seg, i) => (
              <circle
                key={seg.key}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${seg.percent * circumference} ${circumference}`}
                strokeDashoffset={-seg.offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.5s ease", transitionDelay: `${i * 0.1}s` }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs text-[#555555]">Total</div>
            <div className="text-lg font-bold text-[#f5f5f5]">{formatCurrency(budget.total, budget.currency)}</div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="flex-1 space-y-3 w-full">
          {CATEGORIES.map(cat => {
            const value = budget[cat.key as keyof BudgetBreakdownType] as number || 0;
            const percent = Math.round((value / total) * 100);
            return (
              <div key={cat.key} className="flex items-center gap-3">
                <span className="text-base w-6">{cat.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#888888]">{cat.label}</span>
                    <span className="text-[#f5f5f5] font-medium">{formatCurrency(value, budget.currency)}</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${percent}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
                <span className="text-xs text-[#555555] w-8 text-right">{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#222222]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-[#555555] text-xs mb-1">
            <DollarSign className="w-3 h-3" />
            Total Budget
          </div>
          <div className="text-xl font-bold text-[#f5f5f5]">{formatCurrency(budget.total, budget.currency)}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-[#555555] text-xs mb-1">
            <TrendingUp className="w-3 h-3" />
            Per Day
          </div>
          <div className="text-xl font-bold text-indigo-400">{formatCurrency(budget.perDay, budget.currency)}</div>
        </div>
        <div className="text-center col-span-2 sm:col-span-1">
          <div className="flex items-center justify-center gap-1 text-[#555555] text-xs mb-1">
            <Users className="w-3 h-3" />
            Per Person
          </div>
          <div className="text-xl font-bold text-purple-400">{formatCurrency(budget.perPerson, budget.currency)}</div>
        </div>
      </div>
    </div>
  );
}
