"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  Plane,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { Button, Card, Chip } from "@/components/ui/primitives";
import { PosterCover } from "@/components/PosterCover";
import { DynIcon } from "@/components/ui/icon";
import { CATEGORY_COLORS } from "@/lib/budget";
import type {
  Activity,
  Destination,
  Flight,
  Restaurant,
  ScenarioCard as ScenarioData,
  Stay,
} from "@/lib/types";
import { cn, formatDuration, formatEUR } from "@/lib/utils";

const TIER_LABEL: Record<string, string> = {
  eco: "Éco",
  balanced: "Équilibré",
  premium: "Premium",
};

function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <Star className="h-3.5 w-3.5 fill-brand text-brand" />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {reviews != null && <span>· {reviews} avis</span>}
    </span>
  );
}

function BookButton({
  href,
  label = "Réserver",
  onBook,
  size = "sm",
}: {
  href: string;
  label?: string;
  onBook?: () => void;
  size?: "sm" | "md";
}) {
  return (
    <Button
      size={size}
      onClick={() => {
        onBook?.();
        if (typeof window !== "undefined") window.open(href, "_blank", "noopener");
      }}
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </Button>
  );
}

/* ── Flight ────────────────────────────────────────────────── */

export function FlightCard({ flight, onBook }: { flight: Flight; onBook?: () => void }) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--elevated)] text-brand">
        <Plane className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-ink">{flight.airline}</span>
          <Chip>{TIER_LABEL[flight.tier]}</Chip>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 font-display text-base text-ink">
          {flight.fromCode}
          <ArrowRight className="h-3.5 w-3.5 text-muted" />
          {flight.toCode}
        </div>
        <div className="mt-0.5 text-xs text-muted">
          {flight.depart} – {flight.arrive} · {formatDuration(flight.durationMin)} ·{" "}
          {flight.stops === 0 ? "direct" : `${flight.stops} escale`}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="font-display text-lg font-semibold text-ink">
          {formatEUR(flight.price)}
        </div>
        <div className="mt-1">
          <BookButton href={flight.deepLink} onBook={onBook} />
        </div>
      </div>
    </Card>
  );
}

/* ── Stay ──────────────────────────────────────────────────── */

export function StayCard({ stay, onBook }: { stay: Stay; onBook?: () => void }) {
  return (
    <Card className="overflow-hidden">
      <PosterCover
        gradient={stay.image}
        iconKey="building2"
        rounded="rounded-none"
        className="h-28"
      />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-ink">{stay.name}</span>
          <Chip>{stay.kind}</Chip>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Rating value={stay.rating} reviews={stay.reviews} />
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5" /> {stay.area}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {stay.amenities.slice(0, 3).map((a) => (
            <Chip key={a}>{a}</Chip>
          ))}
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="font-display text-lg font-semibold text-ink">
              {formatEUR(stay.pricePerNight)}
            </span>
            <span className="text-xs text-muted"> / nuit</span>
          </div>
          <BookButton href={stay.deepLink} onBook={onBook} />
        </div>
      </div>
    </Card>
  );
}

/* ── Restaurant ────────────────────────────────────────────── */

export function RestaurantCard({
  restaurant,
  onBook,
}: {
  restaurant: Restaurant;
  onBook?: () => void;
}) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--elevated)] text-brand">
        <UtensilsCrossed className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-ink">{restaurant.name}</div>
        <div className="mt-0.5 text-xs text-muted">
          {restaurant.cuisine} · {restaurant.area}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Rating value={restaurant.rating} />
          <span className="text-xs font-medium text-success">
            {"€".repeat(restaurant.priceLevel)}
          </span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-xs text-muted">≈ {formatEUR(restaurant.avgPrice)}/pers.</div>
        <div className="mt-1">
          <BookButton href={restaurant.deepLink} onBook={onBook} />
        </div>
      </div>
    </Card>
  );
}

/* ── Activity ──────────────────────────────────────────────── */

export function ActivityCard({
  activity,
  onBook,
}: {
  activity: Activity;
  onBook?: () => void;
}) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <PosterCover
        gradient={activity.image}
        rounded="rounded-2xl"
        className="h-16 w-16 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-ink">{activity.name}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
          <Chip>{activity.category}</Chip>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {activity.durationH}h
          </span>
        </div>
        <div className="mt-1">
          <Rating value={activity.rating} />
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="font-display text-base font-semibold text-ink">
          {formatEUR(activity.price)}
        </div>
        <div className="mt-1">
          <BookButton href={activity.deepLink} onBook={onBook} />
        </div>
      </div>
    </Card>
  );
}

/* ── Scenario ──────────────────────────────────────────────── */

export function ScenarioCard({
  scenario,
  onChoose,
  highlight,
}: {
  scenario: ScenarioData;
  onChoose?: () => void;
  highlight?: boolean;
}) {
  const max = Math.max(...scenario.breakdown.map((b) => b.amount));
  return (
    <Card
      className={cn(
        "p-5 transition-shadow",
        highlight && "ring-2 ring-brand",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
          {scenario.label}
        </span>
        {highlight && <Chip active>Recommandé</Chip>}
      </div>
      <div className="mt-1 font-display text-3xl font-semibold text-ink">
        {formatEUR(scenario.total)}
      </div>
      <div className="text-xs text-muted">5 jours · 2 voyageurs · tout compris</div>

      <div className="mt-4 space-y-1.5">
        {scenario.breakdown.map((b) => (
          <div key={b.category} className="flex items-center gap-2">
            <span className="w-24 shrink-0 text-xs text-muted">{b.category}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(b.amount / max) * 100}%`,
                  background: CATEGORY_COLORS[b.category],
                }}
              />
            </div>
            <span className="w-12 shrink-0 text-right text-xs font-medium text-ink">
              {formatEUR(b.amount)}
            </span>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-1 text-xs text-muted">
        {scenario.highlights.map((h) => (
          <li key={h} className="flex items-start gap-1.5">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand" />
            {h}
          </li>
        ))}
      </ul>

      <Button className="mt-4 w-full" variant={highlight ? "primary" : "secondary"} onClick={onChoose}>
        Choisir ce scénario
      </Button>
    </Card>
  );
}

/* ── Destination ───────────────────────────────────────────── */

export function DestinationCard({
  destination,
  index = 0,
}: {
  destination: Destination;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6 }}
    >
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lift">
        <div className="relative">
          <PosterCover
            gradient={destination.image}
            iconKey={destination.iconKey}
            label={destination.city}
            sublabel={destination.country}
            rounded="rounded-none"
            className="h-44 transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {destination.trending && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-dark">
              Tendance
            </span>
          )}
          {destination.dealPrice && (
            <span className="absolute right-3 top-3 rounded-full bg-success px-2.5 py-1 text-[11px] font-semibold text-white">
              Deal {formatEUR(destination.dealPrice)}
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed text-muted">{destination.blurb}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Rating value={destination.rating} />
            <span className="text-xs text-muted">
              · {formatEUR(destination.avgBudget5d)} / 5 j
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {destination.moods.map((m) => (
              <Chip key={m}>{m}</Chip>
            ))}
          </div>
          <Link
            href={`/chat?q=${encodeURIComponent(destination.city)}`}
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Planifier ce voyage
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

/* ── Generic chat-card dispatcher ──────────────────────────── */

export function MiniBadge({ icon }: { icon: string }) {
  return <DynIcon name={icon} className="h-5 w-5" />;
}
