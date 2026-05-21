"use client";

import { motion } from "framer-motion";
import { Globe2, MapPin, Plane, Sun } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { WorldMap } from "@/components/WorldMap";
import { Card, Progress, Stat } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import { VISITED_COUNTRIES } from "@/lib/mock-data";
import {
  EXPLORE_COLORS,
  exploreTier,
  explorationPct,
} from "@/lib/gamification";
import { formatNumber } from "@/lib/utils";

const CONTINENT: Record<string, string> = {
  France: "Europe",
  Portugal: "Europe",
  Spain: "Europe",
  Italy: "Europe",
  Greece: "Europe",
  Croatia: "Europe",
  Netherlands: "Europe",
  Iceland: "Europe",
  Morocco: "Afrique",
  Japan: "Asie",
  Thailand: "Asie",
};

const LEGEND = [
  { tier: "none", label: "Non visité" },
  { tier: "low", label: "Capitale (10–30%)" },
  { tier: "mid", label: "3+ villes (30–60%)" },
  { tier: "high", label: "Régions (60–85%)" },
  { tier: "max", label: "Maîtrisé (85%+)" },
] as const;

export default function MapPage() {
  const { profile } = useApp();
  const totalDays = VISITED_COUNTRIES.reduce((s, c) => s + c.daysSpent, 0);
  const continents = new Set(
    VISITED_COUNTRIES.map((c) => CONTINENT[c.countryName]).filter(Boolean),
  ).size;
  const ranked = [...VISITED_COUNTRIES].sort(
    (a, b) => explorationPct(b) - explorationPct(a),
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <PageHeader
          eyebrow="Ta collection"
          title="Carte du monde"
          subtitle="Chaque pays se colore selon ton niveau d'exploration. Objectif : les 195."
        />

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: MapPin, label: "Pays visités", value: `${VISITED_COUNTRIES.length} / 195` },
            { icon: Globe2, label: "Continents", value: `${continents} / 6` },
            { icon: Plane, label: "Km parcourus", value: formatNumber(profile.kmTravelled) },
            { icon: Sun, label: "Jours en voyage", value: formatNumber(totalDays) },
          ].map((s) => (
            <Card key={s.label} className="flex items-center gap-3 p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--elevated)] text-brand">
                <s.icon className="h-5 w-5" />
              </div>
              <Stat label={s.label} value={s.value} />
            </Card>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <WorldMap />
        </motion.div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4">
          {LEGEND.map((l) => (
            <div key={l.tier} className="flex items-center gap-2 text-xs text-muted">
              <span
                className="h-3.5 w-3.5 rounded-[4px]"
                style={{ background: EXPLORE_COLORS[l.tier] }}
              />
              {l.label}
            </div>
          ))}
        </div>

        {/* Country list */}
        <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
          Pays explorés
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ranked.map((c, i) => {
            const pct = explorationPct(c);
            return (
              <motion.div
                key={c.countryName}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ink">{c.countryName}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: EXPLORE_COLORS[exploreTier(pct)] }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <Progress
                    value={pct}
                    className="mt-2"
                    color={EXPLORE_COLORS[exploreTier(pct)]}
                  />
                  <div className="mt-2 text-xs text-muted">
                    {c.citiesVisited} villes · {c.daysSpent} jours ·{" "}
                    {c.activitiesValidated} activités · {c.trips} séjour
                    {c.trips > 1 ? "s" : ""}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
