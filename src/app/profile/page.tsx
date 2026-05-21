"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, Gift, Lock, Plane, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { DynIcon } from "@/components/ui/icon";
import { Button, Card, Chip, Progress } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import { BADGES, levelProgress } from "@/lib/gamification";
import { VISITED_COUNTRIES } from "@/lib/mock-data";
import { formatEUR, formatNumber } from "@/lib/utils";

const PLAN_LABEL: Record<string, string> = {
  free: "Free",
  explorer: "Explorer",
  globetrotter: "Globetrotter",
};

export default function ProfilePage() {
  const { profile, trips, addXp } = useApp();
  const lvl = levelProgress(profile.xp);
  const totalDays = VISITED_COUNTRIES.reduce((s, c) => s + c.daysSpent, 0);
  const unlocked = profile.unlockedBadges;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-5 py-8">
        <PageHeader eyebrow="Toi" title="Profil voyageur" />

        {/* Identity + level */}
        <Card className="mt-6 overflow-hidden">
          <div
            className="h-24 poster-grain"
            style={{
              background: `linear-gradient(120deg, ${lvl.color}, #FF5A3C)`,
            }}
          />
          <div className="px-6 pb-6">
            <div
              className="-mt-10 grid h-20 w-20 place-items-center rounded-3xl border-4 border-[var(--surface)] font-display text-2xl font-semibold text-white"
              style={{ background: lvl.color }}
            >
              {profile.name.slice(0, 1)}
            </div>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {profile.name}
                </h2>
                <p className="text-sm text-muted">{profile.email}</p>
              </div>
              <Chip active className="px-3 py-1.5">
                {lvl.name} · Niveau {lvl.level}
              </Chip>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted">
                <span>{formatNumber(lvl.intoLevel)} XP dans ce niveau</span>
                <span>
                  Niveau {lvl.level + 1} à {formatNumber(lvl.nextAt)} XP
                </span>
              </div>
              <Progress value={lvl.pct} color={lvl.color} className="mt-1.5" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {profile.moods.map((m) => (
                <Chip key={m}>{m}</Chip>
              ))}
            </div>

            <Button
              className="mt-4"
              variant="secondary"
              onClick={() => addXp(250)}
            >
              <Gift className="h-4 w-4" /> Réclamer mon bonus du jour (+250 XP)
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "XP total", value: formatNumber(profile.xp) },
            { label: "Pays visités", value: `${VISITED_COUNTRIES.length}/195` },
            { label: "Km parcourus", value: formatNumber(profile.kmTravelled) },
            { label: "Jours en voyage", value: formatNumber(totalDays) },
          ].map((s) => (
            <Card key={s.label} className="p-4">
              <div className="text-xs uppercase tracking-wide text-muted">
                {s.label}
              </div>
              <div className="mt-1 font-display text-2xl font-semibold text-ink">
                {s.value}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Points */}
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-brand" />
              <h3 className="font-display text-lg font-semibold text-ink">
                Mes points
              </h3>
            </div>
            <div className="mt-2 font-display text-3xl font-semibold text-ink">
              {profile.points} pts
            </div>
            <p className="mt-1 text-sm text-muted">
              Soit {formatEUR(profile.points * 0.1)} de cashback sur ta prochaine
              réservation. 1 pt = 0,10 €.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-muted">
              <li>· Réservation confirmée — jusqu'à 5% en points</li>
              <li>· Parrainage d'un ami — 100 pts</li>
              <li>· Avis qualifié avec photos — 25 pts</li>
            </ul>
          </Card>

          {/* Subscription */}
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand" />
              <h3 className="font-display text-lg font-semibold text-ink">
                Abonnement
              </h3>
            </div>
            <div className="mt-2 font-display text-3xl font-semibold text-ink">
              {PLAN_LABEL[profile.plan]}
            </div>
            <p className="mt-1 text-sm text-muted">
              {profile.plan === "free"
                ? "3 voyages IA par mois."
                : profile.plan === "explorer"
                  ? "Voyages IA illimités, alertes prix, 50 pts/mois."
                  : "Concierge prioritaire Opus, réservations sans frais, 200 pts/mois."}
            </p>
            <Link href="/pricing" className="mt-3 inline-block">
              <Button variant="secondary">Gérer mon abonnement</Button>
            </Link>
          </Card>
        </div>

        {/* Badges */}
        <div className="mt-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">Badges</h2>
          <span className="text-sm text-muted">
            {unlocked.length} / {BADGES.length} débloqués
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES.map((b, i) => {
            const has = unlocked.includes(b.id);
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
              >
                <Card
                  className={`relative p-4 text-center ${
                    has ? "" : "opacity-60"
                  }`}
                >
                  <div
                    className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${
                      has ? "bg-brand text-white" : "bg-[var(--elevated)] text-muted"
                    }`}
                  >
                    {has ? (
                      <DynIcon name={b.icon} className="h-6 w-6" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-ink">
                    {b.name}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted">
                    {b.desc}
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium text-brand">
                    +{b.xp} XP
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* History */}
        <h2 className="mt-8 font-display text-2xl font-semibold text-ink">
          Historique de voyages
        </h2>
        <div className="mt-4 space-y-2">
          {trips.map((t) => (
            <Link key={t.id} href={`/trip/${t.id}`}>
              <Card className="flex items-center gap-3 p-4 transition-colors hover:border-brand/40">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--elevated)] text-brand">
                  <Plane className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">
                    {t.title}
                  </div>
                  <div className="text-xs text-muted">
                    {t.city}, {t.country} · {t.days} jours
                  </div>
                </div>
                <span className="text-sm font-semibold text-ink">
                  {formatEUR(t.budget)}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
