/**
 * Logique du concierge Wanderly — déterministe, sans clé requise.
 * Réutilisée côté serveur par /api/chat. Si ANTHROPIC_API_KEY est
 * présent, la route bascule sur Claude ; sinon ce moteur répond.
 */
import {
  DESTINATIONS,
  findDestinationByText,
  searchActivities,
  searchFlights,
  searchRestaurants,
  searchStays,
} from "./mock-data";
import type {
  ChatCard,
  Destination,
  ScenarioCard,
  Tier,
} from "./types";

export interface ConciergeInput {
  role: "user" | "assistant";
  text: string;
}

export interface ConciergeReply {
  text: string;
  cards: ChatCard[];
  suggestions: string[];
}

const TIER_LABEL: Record<Tier, string> = {
  eco: "Économique",
  balanced: "Équilibré",
  premium: "Premium",
};

function detectBudget(text: string): number | null {
  const m = text
    .replace(/\s/g, "")
    .match(/(\d{2,5})(?:€|euros?|eur)/i);
  if (m) return parseInt(m[1], 10);
  const b = text.match(/budget\D{0,4}(\d{2,5})/i);
  return b ? parseInt(b[1], 10) : null;
}

function detectTier(text: string): Tier | null {
  const t = text.toLowerCase();
  if (/premium|luxe|confort/.test(t)) return "premium";
  if (/[ée]co|pas cher|petit budget|serr[ée]/.test(t)) return "eco";
  if (/[ée]quilibr|balanced|standard/.test(t)) return "balanced";
  return null;
}

function detectMood(text: string): Destination["moods"][number] | null {
  const t = text.toLowerCase();
  if (/soleil|plage|chill|détente|detente|repos|calme/.test(t)) return "chill";
  if (/aventure|rando|adrénaline|adrenaline|sport|trek/.test(t)) return "adventure";
  if (/culture|musée|musee|histoire|monument/.test(t)) return "culture";
  if (/food|cuisine|resto|gastronomie|manger/.test(t)) return "foodie";
  return null;
}

export function computeScenario(
  d: Destination,
  tier: Tier,
  nights: number,
  travelers: number,
): ScenarioCard {
  const flight = searchFlights(d.id).find((f) => f.tier === tier)!;
  const stay = searchStays(d.id).find((s) => s.tier === tier)!;
  const restos = searchRestaurants(d.id);
  const acts = searchActivities(d.id);
  const restoBudget = Math.round(
    restos.slice(0, tier === "eco" ? 2 : tier === "balanced" ? 3 : 4)
      .reduce((s, r) => s + r.avgPrice, 0) *
      travelers *
      (nights / 5),
  );
  const actBudget = Math.round(
    acts.slice(0, tier === "eco" ? 2 : tier === "balanced" ? 3 : 4)
      .reduce((s, a) => s + a.price, 0) * travelers,
  );
  const breakdown: ScenarioCard["breakdown"] = [
    { category: "Vols", amount: flight.price * travelers },
    { category: "Hébergement", amount: stay.pricePerNight * nights },
    { category: "Restos", amount: restoBudget },
    { category: "Activités", amount: actBudget },
    { category: "Transport", amount: Math.round(d.avgBudget5d * 0.08 * travelers) },
    { category: "Imprévus", amount: Math.round(d.avgBudget5d * 0.07) },
  ];
  const total = breakdown.reduce((s, b) => s + b.amount, 0);
  return {
    tier,
    label: TIER_LABEL[tier],
    city: d.city,
    total,
    breakdown,
    highlights: [
      `Vol ${flight.airline} · ${flight.stops === 0 ? "direct" : flight.stops + " escale"}`,
      `${stay.name} (${stay.kind})`,
      acts[0].name,
      restos[0].name,
    ],
  };
}

export function runConcierge(messages: ConciergeInput[]): ConciergeReply {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.text)
    .join(" ");
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const last = lastUser?.text ?? "";

  const dest = findDestinationByText(userText);
  const budget = detectBudget(userText);
  const tier = detectTier(last);
  const mood = detectMood(userText);
  const nights = 5;
  const travelers = 2;

  /* — Aucune destination détectée : 1 question de cadrage — */
  if (!dest) {
    const pool = mood
      ? DESTINATIONS.filter((d) => d.moods.includes(mood))
      : DESTINATIONS.filter((d) => d.trending);
    const picks = (pool.length ? pool : DESTINATIONS).slice(0, 3);
    return {
      text: mood
        ? `Une envie ${mood === "chill" ? "de soleil et de calme" : mood === "adventure" ? "d'aventure" : mood === "foodie" ? "gourmande" : "culturelle"}, j'adore. Voici trois pistes qui collent — dis-moi laquelle te tente (ou donne-moi une ville et un budget) :`
        : "Salut, je suis Wanderly, ton concierge de voyage. Une seule question pour démarrer : **où veux-tu aller — ou décris-moi juste l'ambiance** (soleil, aventure, culture, food) ?",
      cards: [],
      suggestions: picks.map((d) => `${d.city} en ${nights} jours`),
    };
  }

  /* — Destination connue : on propose les 3 scénarios — */
  const scenarios: Tier[] = ["eco", "balanced", "premium"];
  const cards: ChatCard[] = scenarios.map((t) => ({
    kind: "scenario",
    data: computeScenario(dest, t, nights, travelers),
  }));

  const focus: Tier = tier ?? "balanced";
  const flight = searchFlights(dest.id).find((f) => f.tier === focus)!;
  const stay = searchStays(dest.id).find((s) => s.tier === focus)!;
  const resto = searchRestaurants(dest.id)[0];
  const activity = searchActivities(dest.id)[0];
  cards.push(
    { kind: "flight", data: flight },
    { kind: "stay", data: stay },
    { kind: "restaurant", data: resto },
    { kind: "activity", data: activity },
  );

  const balanced = computeScenario(dest, focus, nights, travelers);
  const budgetLine = budget
    ? budget >= balanced.total
      ? `Ton budget de ${budget} € passe large sur le scénario équilibré — il reste même de la marge pour un dîner en plus.`
      : `Avec ${budget} €, je te recommande le scénario économique : ${dest.city} reste accessible, je serre surtout sur l'hébergement.`
    : `Pour ${nights} jours à ${dest.city}, compte autour de ${balanced.total} € à deux en formule équilibrée.`;

  return {
    text:
      `Parfait — **${dest.city}**, excellent choix. ${budgetLine}\n\n` +
      `J'ai déjà tout pré-chargé : vol, logement, restos et activités. Petit coup d'avance — je te bloque **${activity.name}** le matin du 2ᵉ jour et une table chez **${resto.name}** le soir, tu pourras décaler si besoin.\n\n` +
      `Voici tes trois scénarios complets, chacun réservable en un clic :`,
    cards,
    suggestions: [
      `Passe en premium`,
      `Réserve le scénario équilibré`,
      `Ajoute une journée`,
    ],
  };
}

/** Outils exposés à Claude en function calling (route /api/chat). */
export const CONCIERGE_TOOLS = [
  "search_flights",
  "search_stays",
  "search_restaurants",
  "search_activities",
  "compute_budget",
  "add_to_trip",
  "book_item",
] as const;
