"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  MapPin,
  Plane,
  Sparkles,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PosterCover } from "@/components/PosterCover";
import { Button, Card, Chip, Progress } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import { actualTotal, plannedTotal, rollupByCategory } from "@/lib/budget";
import { XP_EVENTS } from "@/lib/gamification";
import { formatDateRange, formatEUR } from "@/lib/utils";
import type { ItemKind } from "@/lib/types";

const STATUS: Record<string, { label: string; cls: string }> = {
  draft: { label: "Brouillon", cls: "bg-[var(--elevated)] text-muted" },
  planned: { label: "Planifié", cls: "bg-[#3D5A80] text-white" },
  booked: { label: "Réservé", cls: "bg-brand text-white" },
  completed: { label: "Terminé", cls: "bg-success text-white" },
};

const KIND_ICON: Record<ItemKind, typeof Plane> = {
  flight: Plane,
  stay: MapPin,
  restaurant: UtensilsCrossed,
  activity: Sparkles,
};

export default function TripPage({ params }: { params: { id: string } }) {
  const { trips, toggleBooked, addXp } = useApp();
  const trip = trips.find((t) => t.id === params.id);

  if (!trip) {
    return (
      <AppShell>
        <div className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Voyage introuvable
          </h1>
          <p className="mt-2 text-sm text-muted">
            Ce voyage n'existe pas ou a expiré.
          </p>
          <Link href="/explore" className="mt-4 inline-block">
            <Button>Explorer des destinations</Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  const planned = plannedTotal(trip.expenses);
  const actual = actualTotal(trip.expenses);
  const rollup = rollupByCategory(trip.expenses);
  const bookedCount = trip.items.filter((i) => i.booked).length;
  const st = STATUS[trip.status];

  function onToggle(itemId: string, wasBooked: boolean) {
    toggleBooked(trip!.id, itemId);
    if (!wasBooked) addXp(XP_EVENTS.activityValidated);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl">
          <PosterCover
            gradient={trip.coverImage}
            rounded="rounded-3xl"
            className="h-52 md:h-64"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-6">
            <span
              className={`mb-2 w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${st.cls}`}
            >
              {st.label}
            </span>
            <h1 className="font-display text-3xl font-semibold text-white md:text-4xl">
              {trip.title}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {trip.city}, {trip.country}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatDateRange(trip.startDate, trip.endDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {trip.travelers} voyageur
                {trip.travelers > 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-4">
          {[
            { label: "Budget", value: formatEUR(trip.budget) },
            { label: "Durée", value: `${trip.days} jours` },
            { label: "Réservé", value: `${bookedCount}/${trip.items.length}` },
          ].map((s) => (
            <Card key={s.label} className="p-4 text-center">
              <div className="text-xs uppercase tracking-wide text-muted">
                {s.label}
              </div>
              <div className="mt-1 font-display text-xl font-semibold text-ink">
                {s.value}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
          {/* Timeline */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Itinéraire jour par jour
            </h2>
            <div className="mt-4 space-y-6">
              {Array.from({ length: trip.days }).map((_, idx) => {
                const day = idx + 1;
                const items = trip.items
                  .filter((i) => i.day === day)
                  .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
                return (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand font-display text-sm font-semibold text-white">
                        {day}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        Jour {day}
                      </span>
                      <span className="h-px flex-1 bg-line" />
                    </div>
                    <div className="ml-4 mt-3 space-y-2.5 border-l border-line pl-6">
                      {items.length === 0 && (
                        <p className="text-sm text-muted">Journée libre.</p>
                      )}
                      {items.map((item) => {
                        const Icon = KIND_ICON[item.kind];
                        return (
                          <div
                            key={item.id}
                            className="relative flex items-center gap-3 rounded-2xl border border-line bg-[var(--surface)] p-3"
                          >
                            <span className="absolute -left-[1.95rem] grid h-6 w-6 place-items-center rounded-full border border-line bg-[var(--canvas)] text-brand">
                              <Icon className="h-3 w-3" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                {item.time && (
                                  <span className="text-xs font-semibold text-brand">
                                    {item.time}
                                  </span>
                                )}
                                <span className="truncate text-sm font-semibold text-ink">
                                  {item.title}
                                </span>
                              </div>
                              <div className="truncate text-xs text-muted">
                                {item.subtitle} · {formatEUR(item.price)}
                              </div>
                            </div>
                            <button
                              onClick={() => onToggle(item.id, item.booked)}
                              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                                item.booked
                                  ? "bg-success text-white"
                                  : "border border-line text-muted hover:border-brand/40"
                              }`}
                            >
                              {item.booked ? (
                                <>
                                  <Check className="h-3.5 w-3.5" /> Réservé
                                </>
                              ) : (
                                "Réserver"
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <Card className="p-5">
              <h3 className="font-display text-lg font-semibold text-ink">
                Budget en temps réel
              </h3>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Dépensé</span>
                  <span className="font-semibold text-brand">
                    {formatEUR(actual)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Prévu</span>
                  <span className="font-semibold text-ink">
                    {formatEUR(planned)}
                  </span>
                </div>
              </div>
              <Progress
                value={trip.budget ? (actual / trip.budget) * 100 : 0}
                className="mt-3"
              />
              <p className="mt-2 text-xs text-muted">
                {formatEUR(Math.max(0, trip.budget - actual))} restants sur ton
                budget.
              </p>
              <div className="mt-4 space-y-2">
                {rollup.map((r) => (
                  <div key={r.category} className="flex items-center gap-2 text-xs">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: r.color }}
                    />
                    <span className="text-muted">{r.category}</span>
                    <span className="ml-auto font-medium text-ink">
                      {formatEUR(r.planned || r.actual)}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/budget" className="mt-4 block">
                <Button variant="secondary" className="w-full">
                  Ouvrir le dashboard budget
                </Button>
              </Link>
            </Card>

            <Card className="overflow-hidden">
              <PosterCover
                gradient={trip.coverImage}
                label={trip.country}
                sublabel="Destination"
                rounded="rounded-none"
                className="h-32"
              />
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5">
                  <Chip>{trip.scenario === "eco" ? "Éco" : trip.scenario === "premium" ? "Premium" : "Équilibré"}</Chip>
                  <Chip>{trip.days} jours</Chip>
                  <Chip>{trip.travelers} pers.</Chip>
                </div>
                <Link href="/chat" className="mt-3 block">
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4" /> Affiner avec l'assistant
                  </Button>
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
