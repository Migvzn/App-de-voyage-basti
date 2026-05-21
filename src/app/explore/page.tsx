"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Tag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { DestinationCard } from "@/components/cards";
import { PosterCover } from "@/components/PosterCover";
import { Chip } from "@/components/ui/primitives";
import { DESTINATIONS } from "@/lib/mock-data";
import type { Mood } from "@/lib/types";
import { formatEUR } from "@/lib/utils";

const MOODS: { id: Mood | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "chill", label: "Chill" },
  { id: "adventure", label: "Aventure" },
  { id: "culture", label: "Culture" },
  { id: "foodie", label: "Foodie" },
];

export default function ExplorePage() {
  const [mood, setMood] = useState<Mood | "all">("all");
  const list =
    mood === "all"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.moods.includes(mood));
  const deals = DESTINATIONS.filter((d) => d.dealPrice);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <PageHeader
          eyebrow="Découvrir"
          title="Explorer le monde"
          subtitle="Destinations tendance, deals du jour et inspirations selon ton humeur."
        />

        {/* Deals du jour */}
        <div className="mt-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Tag className="h-4 w-4 text-success" /> Deals du jour
          </div>
          <div className="mt-3 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {deals.map((d) => (
              <Link
                key={d.id}
                href={`/chat?q=${encodeURIComponent(d.city)}`}
                className="group relative w-64 shrink-0"
              >
                <PosterCover
                  gradient={d.image}
                  iconKey={d.iconKey}
                  label={d.city}
                  sublabel={d.country}
                  className="h-36 transition-transform group-hover:scale-[1.02]"
                />
                <span className="absolute right-3 top-3 rounded-full bg-success px-2.5 py-1 text-[11px] font-semibold text-white">
                  −{Math.round((1 - d.dealPrice! / d.avgBudget5d) * 100)}% ·{" "}
                  {formatEUR(d.dealPrice!)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mood filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button key={m.id} onClick={() => setMood(m.id)}>
              <Chip active={mood === m.id} className="cursor-pointer px-4 py-1.5 text-sm">
                {m.label}
              </Chip>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
          <Flame className="h-4 w-4 text-brand" />
          {list.length} destination{list.length > 1 ? "s" : ""}
        </div>
        <motion.div layout className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </motion.div>
      </div>
    </AppShell>
  );
}
