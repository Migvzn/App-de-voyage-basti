import type { BadgeDef, VisitedCountry } from "./types";
import { clamp } from "./utils";

/* ── Niveaux & XP ──────────────────────────────────────────── */

export const LEVEL_BANDS = [
  { min: 1, max: 10, name: "Backpacker", color: "#10B981" },
  { min: 11, max: 25, name: "Explorer", color: "#3D5A80" },
  { min: 26, max: 50, name: "Wanderer", color: "#FF5A3C" },
  { min: 51, max: 99, name: "Globetrotter", color: "#C9325A" },
  { min: 100, max: Infinity, name: "Legend", color: "#5B2A86" },
] as const;

/** Cumulative XP required to *reach* a given level. */
export function xpForLevel(level: number): number {
  let total = 0;
  for (let l = 1; l < level; l++) total += 240 + (l - 1) * 90;
  return total;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  return level;
}

export function levelName(level: number): string {
  return (LEVEL_BANDS.find((b) => level >= b.min && level <= b.max) ?? LEVEL_BANDS[0]).name;
}

export function levelColor(level: number): string {
  return (LEVEL_BANDS.find((b) => level >= b.min && level <= b.max) ?? LEVEL_BANDS[0]).color;
}

export interface LevelProgress {
  level: number;
  name: string;
  color: string;
  current: number;
  intoLevel: number;
  levelSpan: number;
  pct: number;
  nextAt: number;
}

export function levelProgress(xp: number): LevelProgress {
  const level = levelFromXp(xp);
  const floor = xpForLevel(level);
  const ceil = xpForLevel(level + 1);
  const span = ceil - floor;
  const into = xp - floor;
  return {
    level,
    name: levelName(level),
    color: levelColor(level),
    current: xp,
    intoLevel: into,
    levelSpan: span,
    pct: clamp(Math.round((into / span) * 100), 0, 100),
    nextAt: ceil,
  };
}

export const XP_EVENTS = {
  nightNewCountry: 100,
  activityValidated: 50,
  reviewWithPhotos: 200,
  continentUnlocked: 500,
  tripBooked: 150,
  tripPlanned: 60,
} as const;

/* ── Exploration d'un pays (carte gamifiée) ────────────────── */

export function explorationPct(c: VisitedCountry): number {
  const cityScore = clamp(c.citiesVisited / c.majorCities, 0, 1) * 0.5;
  const dayScore = clamp(c.daysSpent / 45, 0, 1) * 0.3;
  const actScore = clamp(c.activitiesValidated / 30, 0, 1) * 0.2;
  return Math.round((cityScore + dayScore + actScore) * 100);
}

export type ExploreTier = "none" | "low" | "mid" | "high" | "max";

export function exploreTier(pct: number): ExploreTier {
  if (pct <= 0) return "none";
  if (pct < 10) return "none";
  if (pct < 30) return "low";
  if (pct < 60) return "mid";
  return pct < 85 ? "high" : "max";
}

export const EXPLORE_COLORS: Record<ExploreTier, string> = {
  none: "#E4E4DF",
  low: "#FBE7A1",
  mid: "#FFB463",
  high: "#FF5A3C",
  max: "#C9325A",
};

/* ── Badges (~30, extensible jusqu'à 80) ───────────────────── */

export const BADGES: BadgeDef[] = [
  { id: "first-trip", name: "Premier envol", desc: "Réserver son tout premier voyage", icon: "Plane", xp: 100 },
  { id: "foodie", name: "Foodie", desc: "Valider 50 restaurants", icon: "UtensilsCrossed", xp: 300 },
  { id: "mountain-goat", name: "Chèvre de montagne", desc: "10 randos au-dessus de 1000 m", icon: "Mountain", xp: 300 },
  { id: "night-owl", name: "Oiseau de nuit", desc: "5 nuits blanches en voyage", icon: "Moon", xp: 200 },
  { id: "local", name: "Local", desc: "Un mois entier dans la même ville", icon: "Home", xp: 400 },
  { id: "continent-eu", name: "Europe débloquée", desc: "Visiter 10 pays européens", icon: "Castle", xp: 500 },
  { id: "continent-asia", name: "Asie débloquée", desc: "Visiter 5 pays d'Asie", icon: "Building", xp: 500 },
  { id: "sun-chaser", name: "Chasseur de soleil", desc: "5 voyages plage", icon: "Sun", xp: 200 },
  { id: "aurora", name: "Aurore", desc: "Voir une aurore boréale", icon: "Sparkles", xp: 250 },
  { id: "island-hopper", name: "Île en île", desc: "Visiter 10 îles différentes", icon: "TreePalm", xp: 300 },
  { id: "city-breaker", name: "City-breaker", desc: "20 city-breaks de week-end", icon: "Building2", xp: 300 },
  { id: "budget-master", name: "Maître du budget", desc: "Terminer 5 voyages sous le budget", icon: "PiggyBank", xp: 250 },
  { id: "reviewer", name: "Plume de voyage", desc: "Écrire 25 avis avec photos", icon: "PenLine", xp: 300 },
  { id: "early-bird", name: "Lève-tôt", desc: "10 levers de soleil validés", icon: "Sunrise", xp: 150 },
  { id: "polyglot", name: "Polyglotte", desc: "Voyager dans 8 zones linguistiques", icon: "Languages", xp: 200 },
  { id: "road-tripper", name: "Road-tripper", desc: "Parcourir 5000 km en voiture", icon: "Car", xp: 250 },
  { id: "scommelier", name: "Sommelier", desc: "Visiter 10 vignobles", icon: "Wine", xp: 200 },
  { id: "diver", name: "Plongeur", desc: "10 plongées en mer", icon: "Waves", xp: 250 },
  { id: "festivalier", name: "Festivalier", desc: "Assister à 5 festivals locaux", icon: "PartyPopper", xp: 200 },
  { id: "solo", name: "Esprit libre", desc: "3 voyages en solo", icon: "User", xp: 200 },
  { id: "duo", name: "En duo", desc: "5 voyages à deux", icon: "Users", xp: 150 },
  { id: "tribe", name: "La tribu", desc: "Organiser un voyage à 6+", icon: "UsersRound", xp: 200 },
  { id: "marathoner", name: "Marathonien", desc: "Un voyage de plus de 30 jours", icon: "Footprints", xp: 350 },
  { id: "globetrotter", name: "Tour du monde", desc: "Visiter les 6 continents", icon: "Globe", xp: 1000 },
  { id: "deal-hunter", name: "Chasseur de deals", desc: "10 réservations sur une alerte prix", icon: "Tag", xp: 200 },
  { id: "photographer", name: "Œil de voyage", desc: "Publier 100 photos géolocalisées", icon: "Camera", xp: 300 },
  { id: "streak", name: "Régulier", desc: "Un voyage par mois pendant un an", icon: "Flame", xp: 500 },
  { id: "off-grid", name: "Hors des sentiers", desc: "Visiter 5 lieux peu touristiques", icon: "Compass", xp: 250 },
  { id: "winter", name: "Cœur de l'hiver", desc: "3 voyages sous la neige", icon: "Snowflake", xp: 200 },
  { id: "ambassador", name: "Ambassadeur", desc: "Parrainer 10 voyageurs", icon: "Handshake", xp: 400 },
];

export function badgeById(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}
