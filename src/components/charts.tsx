"use client";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatEUR } from "@/lib/utils";

export interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

export function BudgetDonut({
  data,
  total,
}: {
  data: DonutDatum[];
  total: number;
}) {
  return (
    <div className="relative h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="64%"
            outerRadius="100%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v, n) => [formatEUR(Number(v)), String(n)]}
            contentStyle={{
              borderRadius: 14,
              border: "1px solid var(--line)",
              background: "var(--surface)",
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs text-muted">Budget total</span>
        <span className="font-display text-2xl font-semibold text-ink">
          {formatEUR(total)}
        </span>
      </div>
    </div>
  );
}

export function BudgetTimeline({
  data,
}: {
  data: { day: number; planned: number; actual: number }[];
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <defs>
            <linearGradient id="gPlanned" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3D5A80" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3D5A80" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5A3C" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FF5A3C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            tickFormatter={(d) => `J${d}`}
            tick={{ fontSize: 11, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(v, n) => [
              formatEUR(Number(v)),
              n === "planned" ? "Prévu" : "Réel",
            ]}
            labelFormatter={(d) => `Jour ${d}`}
            contentStyle={{
              borderRadius: 14,
              border: "1px solid var(--line)",
              background: "var(--surface)",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="planned"
            stroke="#3D5A80"
            strokeWidth={2}
            fill="url(#gPlanned)"
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#FF5A3C"
            strokeWidth={2}
            fill="url(#gActual)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
