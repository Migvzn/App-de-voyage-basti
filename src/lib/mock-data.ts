import type {
  Activity,
  Destination,
  Flight,
  Restaurant,
  Stay,
  Tier,
  Trip,
  VisitedCountry,
} from "./types";
import { uid } from "./utils";

/* ─────────────────────────────────────────────────────────────
 *  DESTINATIONS
 *  `image` holds a CSS gradient — editorial poster covers that
 *  always render. Wire UNSPLASH_ACCESS_KEY to swap in photos.
 * ──────────────────────────────────────────────────────────── */

export const DESTINATIONS: Destination[] = [
  {
    id: "lisbon",
    city: "Lisbonne",
    country: "Portugal",
    countryName: "Portugal",
    countryCode: "PT",
    continent: "Europe",
    blurb: "Collines pastel, tramways jaunes et soleil d'Atlantique toute l'année.",
    image: "linear-gradient(135deg,#FFB463,#FF5A3C 70%,#C9325A)",
    iconKey: "waves",
    moods: ["chill", "culture", "foodie"],
    avgBudget5d: 760,
    bestMonths: [3, 4, 5, 9, 10],
    rating: 4.8,
    trending: true,
    dealPrice: 690,
  },
  {
    id: "rome",
    city: "Rome",
    country: "Italie",
    countryName: "Italy",
    countryCode: "IT",
    continent: "Europe",
    blurb: "2 700 ans d'histoire à ciel ouvert, et la meilleure cuisine de rue d'Europe.",
    image: "linear-gradient(135deg,#E8A87C,#C9325A 70%,#5B2A86)",
    iconKey: "landmark",
    moods: ["culture", "foodie"],
    avgBudget5d: 920,
    bestMonths: [4, 5, 6, 9, 10],
    rating: 4.9,
    trending: true,
  },
  {
    id: "barcelona",
    city: "Barcelone",
    country: "Espagne",
    countryName: "Spain",
    countryCode: "ES",
    continent: "Europe",
    blurb: "Gaudí, plage et tapas — la ville où l'on ne dort jamais avant minuit.",
    image: "linear-gradient(135deg,#FFC15E,#FF7A60 70%,#3D5A80)",
    iconKey: "utensils",
    moods: ["foodie", "culture", "chill"],
    avgBudget5d: 840,
    bestMonths: [4, 5, 6, 9, 10],
    rating: 4.7,
    trending: true,
    dealPrice: 740,
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japon",
    countryName: "Japan",
    countryCode: "JP",
    continent: "Asie",
    blurb: "Néons, temples silencieux et le meilleur ramen de la planète.",
    image: "linear-gradient(135deg,#5B2A86,#C9325A 70%,#FF5A3C)",
    iconKey: "building2",
    moods: ["adventure", "culture", "foodie"],
    avgBudget5d: 1680,
    bestMonths: [3, 4, 10, 11],
    rating: 4.9,
    trending: true,
  },
  {
    id: "bangkok",
    city: "Bangkok",
    country: "Thaïlande",
    countryName: "Thailand",
    countryCode: "TH",
    continent: "Asie",
    blurb: "Temples dorés, marchés flottants et street food à chaque coin de rue.",
    image: "linear-gradient(135deg,#FFD166,#FF8A5B 70%,#06A77D)",
    iconKey: "leaf",
    moods: ["adventure", "foodie", "chill"],
    avgBudget5d: 980,
    bestMonths: [11, 12, 1, 2],
    rating: 4.6,
    trending: false,
    dealPrice: 880,
  },
  {
    id: "marrakech",
    city: "Marrakech",
    country: "Maroc",
    countryName: "Morocco",
    countryCode: "MA",
    continent: "Afrique",
    blurb: "Souks labyrinthiques, riads frais et désert à une heure de route.",
    image: "linear-gradient(135deg,#FF8A5B,#C9325A 70%,#7A2E2E)",
    iconKey: "sun",
    moods: ["adventure", "culture", "chill"],
    avgBudget5d: 640,
    bestMonths: [3, 4, 5, 10, 11],
    rating: 4.5,
    trending: false,
    dealPrice: 540,
  },
  {
    id: "santorini",
    city: "Santorin",
    country: "Grèce",
    countryName: "Greece",
    countryCode: "GR",
    continent: "Europe",
    blurb: "Maisons blanches, dômes bleus et le plus beau coucher de soleil d'Europe.",
    image: "linear-gradient(135deg,#7EC8E3,#3D5A80 70%,#FF7A60)",
    iconKey: "ship",
    moods: ["chill", "culture"],
    avgBudget5d: 1240,
    bestMonths: [5, 6, 9, 10],
    rating: 4.8,
    trending: true,
  },
  {
    id: "reykjavik",
    city: "Reykjavik",
    country: "Islande",
    countryName: "Iceland",
    countryCode: "IS",
    continent: "Europe",
    blurb: "Aurores boréales, sources chaudes et paysages d'une autre planète.",
    image: "linear-gradient(135deg,#3D5A80,#5B2A86 70%,#06A77D)",
    iconKey: "snowflake",
    moods: ["adventure", "chill"],
    avgBudget5d: 1560,
    bestMonths: [2, 3, 9, 10, 11],
    rating: 4.7,
    trending: false,
  },
  {
    id: "mexico",
    city: "Mexico",
    country: "Mexique",
    countryName: "Mexico",
    countryCode: "MX",
    continent: "Amérique",
    blurb: "Pyramides aztèques, mezcal et la scène culinaire la plus excitante du moment.",
    image: "linear-gradient(135deg,#FF6B6B,#FFD166 70%,#06A77D)",
    iconKey: "utensils",
    moods: ["foodie", "culture", "adventure"],
    avgBudget5d: 1120,
    bestMonths: [3, 4, 10, 11],
    rating: 4.6,
    trending: true,
  },
  {
    id: "bali",
    city: "Ubud, Bali",
    country: "Indonésie",
    countryName: "Indonesia",
    countryCode: "ID",
    continent: "Asie",
    blurb: "Rizières en terrasses, temples dans la jungle et yoga au lever du jour.",
    image: "linear-gradient(135deg,#06A77D,#7EC8E3 70%,#FFD166)",
    iconKey: "leaf",
    moods: ["chill", "adventure"],
    avgBudget5d: 1080,
    bestMonths: [4, 5, 6, 9],
    rating: 4.7,
    trending: false,
    dealPrice: 960,
  },
  {
    id: "dubrovnik",
    city: "Dubrovnik",
    country: "Croatie",
    countryName: "Croatia",
    countryCode: "HR",
    continent: "Europe",
    blurb: "Remparts médiévaux plongeant dans une mer Adriatique turquoise.",
    image: "linear-gradient(135deg,#7EC8E3,#3D5A80 70%,#FF8A5B)",
    iconKey: "ship",
    moods: ["culture", "chill"],
    avgBudget5d: 900,
    bestMonths: [5, 6, 9, 10],
    rating: 4.6,
    trending: false,
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    country: "Pays-Bas",
    countryName: "Netherlands",
    countryCode: "NL",
    continent: "Europe",
    blurb: "Canaux, musées de classe mondiale et la ville la plus cyclable d'Europe.",
    image: "linear-gradient(135deg,#FF7A60,#C9325A 70%,#3D5A80)",
    iconKey: "bike",
    moods: ["culture", "chill"],
    avgBudget5d: 980,
    bestMonths: [4, 5, 6, 7, 8, 9],
    rating: 4.5,
    trending: false,
  },
];

export function getDestination(id: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.id === id);
}

function deburr(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function findDestinationByText(q: string): Destination | undefined {
  const norm = deburr(q);
  return DESTINATIONS.find(
    (d) =>
      norm.includes(deburr(d.city)) ||
      norm.includes(deburr(d.country)) ||
      deburr(d.city).includes(norm),
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Deterministic generators — flights / stays / restaurants / activities
 * ──────────────────────────────────────────────────────────── */

function seededRand(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const AIRLINES_EU = ["TAP Air", "Transavia", "Air France", "Vueling", "easyJet"];
const AIRLINES_LONG = ["Air France", "Lufthansa", "Qatar Airways", "Emirates", "ANA"];
const TIERS: Tier[] = ["eco", "balanced", "premium"];

function flightDuration(continent: string): number {
  if (continent === "Europe") return 130 + Math.round(Math.random() * 60);
  if (continent === "Afrique") return 195;
  if (continent === "Asie") return 720;
  return 660;
}

export function searchFlights(destId: string): Flight[] {
  const d = getDestination(destId);
  if (!d) return [];
  const rnd = seededRand(destId + "flight");
  const longHaul = d.continent === "Asie" || d.continent === "Amérique";
  const pool = longHaul ? AIRLINES_LONG : AIRLINES_EU;
  const baseDur = flightDuration(d.continent);
  return TIERS.map((tier, i) => {
    const mult = tier === "eco" ? 0.16 : tier === "balanced" ? 0.26 : 0.42;
    const stops = tier === "premium" ? 0 : tier === "balanced" ? (longHaul ? 1 : 0) : longHaul ? 1 : rnd() > 0.5 ? 1 : 0;
    const dur = baseDur + stops * 95 + Math.round(rnd() * 40);
    const departH = 6 + Math.floor(rnd() * 12);
    const arriveTotal = departH * 60 + 15 + dur;
    return {
      id: `fl_${destId}_${tier}`,
      airline: pool[Math.floor(rnd() * pool.length)],
      fromCity: "Paris",
      toCity: d.city,
      fromCode: "CDG",
      toCode: d.countryCode + (i + 1),
      depart: `${String(departH).padStart(2, "0")}:15`,
      arrive: `${String(Math.floor(arriveTotal / 60) % 24).padStart(2, "0")}:${String(arriveTotal % 60).padStart(2, "0")}`,
      durationMin: dur,
      stops,
      price: Math.round((d.avgBudget5d * mult) / 5) * 5,
      tier,
      deepLink: `https://www.skyscanner.fr/transport/vols/cdg/${d.countryCode.toLowerCase()}/`,
    };
  });
}

const STAY_KINDS: Stay["kind"][] = ["Appartement", "Loft", "Hôtel", "Villa"];
const AMENITIES = ["Wifi rapide", "Cuisine", "Clim", "Vue", "Balcon", "Petit-déj", "Piscine", "Centre-ville"];

export function searchStays(destId: string): Stay[] {
  const d = getDestination(destId);
  if (!d) return [];
  const rnd = seededRand(destId + "stay");
  const areas = ["Centre historique", "Quartier branché", "Bord de mer", "Vieille ville"];
  return TIERS.map((tier, i) => {
    const mult = tier === "eco" ? 0.12 : tier === "balanced" ? 0.2 : 0.34;
    return {
      id: `st_${destId}_${tier}`,
      name:
        tier === "eco"
          ? `Studio cosy ${d.city}`
          : tier === "balanced"
            ? `${d.city} Central Suites`
            : `Villa Mirador ${d.city}`,
      kind: STAY_KINDS[i],
      area: areas[Math.floor(rnd() * areas.length)],
      rating: Math.round((4.2 + rnd() * 0.7) * 10) / 10,
      reviews: 80 + Math.floor(rnd() * 900),
      pricePerNight: Math.round((d.avgBudget5d * mult) / 5),
      image: d.image,
      amenities: AMENITIES.slice(0, 3 + Math.floor(rnd() * 4)),
      tier,
      deepLink: `https://www.airbnb.fr/s/${encodeURIComponent(d.city)}/homes`,
    };
  });
}

const SIGNATURE_RESTOS: Record<string, { name: string; cuisine: string }> = {
  rome: { name: "Roscioli", cuisine: "Cucina romana" },
  lisbon: { name: "Time Out Market", cuisine: "Tapas portugaises" },
  barcelona: { name: "El Xampanyet", cuisine: "Tapas catalanes" },
  tokyo: { name: "Ichiran Ramen", cuisine: "Ramen tonkotsu" },
  bangkok: { name: "Jay Fai", cuisine: "Street food étoilée" },
  marrakech: { name: "Le Jardin", cuisine: "Cuisine marocaine" },
  mexico: { name: "Pujol", cuisine: "Cuisine mexicaine moderne" },
};

export function searchRestaurants(destId: string): Restaurant[] {
  const d = getDestination(destId);
  if (!d) return [];
  const rnd = seededRand(destId + "resto");
  const sig = SIGNATURE_RESTOS[destId];
  const names = [
    sig?.name ?? `Casa ${d.city}`,
    `Bistro du Marché`,
    `La Table d'Or`,
    `Comptoir ${d.city}`,
  ];
  const cuisines = [sig?.cuisine ?? "Cuisine locale", "Fusion", "Brasserie", "Cuisine de rue"];
  return names.map((name, i) => ({
    id: `re_${destId}_${i}`,
    name,
    cuisine: cuisines[i],
    area: i % 2 ? "Centre historique" : "Quartier branché",
    rating: Math.round((4.1 + rnd() * 0.8) * 10) / 10,
    priceLevel: ((i % 4) + 1) as 1 | 2 | 3 | 4,
    avgPrice: 18 + i * 14 + Math.floor(rnd() * 10),
    image: d.image,
    deepLink: `https://www.thefork.fr/restaurants/${encodeURIComponent(d.city.toLowerCase())}`,
  }));
}

const SIGNATURE_ACTIVITIES: Record<string, { name: string; category: string }> = {
  rome: { name: "Colisée — visite coupe-file", category: "Patrimoine" },
  lisbon: { name: "Tram 28 & belvédères", category: "Découverte" },
  barcelona: { name: "Sagrada Família coupe-file", category: "Patrimoine" },
  tokyo: { name: "teamLab Planets", category: "Art immersif" },
  bangkok: { name: "Marché flottant en longtail", category: "Aventure" },
  santorini: { name: "Croisière coucher de soleil caldera", category: "Mer" },
  reykjavik: { name: "Chasse aux aurores boréales", category: "Nature" },
  bali: { name: "Lever du soleil au mont Batur", category: "Randonnée" },
};

export function searchActivities(destId: string): Activity[] {
  const d = getDestination(destId);
  if (!d) return [];
  const rnd = seededRand(destId + "act");
  const sig = SIGNATURE_ACTIVITIES[destId];
  const items = [
    sig ?? { name: `Visite à pied de ${d.city}`, category: "Découverte" },
    { name: "Cours de cuisine locale", category: "Gastronomie" },
    { name: "Excursion nature d'une journée", category: "Aventure" },
    { name: "Musée d'art & quartier créatif", category: "Culture" },
    { name: "Coucher de soleil & rooftop", category: "Détente" },
  ];
  return items.map((it, i) => ({
    id: `ac_${destId}_${i}`,
    name: it.name,
    category: it.category,
    durationH: 2 + Math.floor(rnd() * 6),
    rating: Math.round((4.3 + rnd() * 0.6) * 10) / 10,
    price: 22 + i * 16 + Math.floor(rnd() * 12),
    image: d.image,
    deepLink: `https://www.getyourguide.fr/s/?q=${encodeURIComponent(d.city)}`,
  }));
}

/* ─────────────────────────────────────────────────────────────
 *  DEMO TRIPS — pré-remplis pour montrer le produit
 * ──────────────────────────────────────────────────────────── */

function buildTrip(
  id: string,
  destId: string,
  title: string,
  start: string,
  end: string,
  scenario: Tier,
  status: Trip["status"],
  travelers: number,
): Trip {
  const d = getDestination(destId)!;
  const days = Math.round((+new Date(end) - +new Date(start)) / 86400000);
  const fl = searchFlights(destId).find((f) => f.tier === scenario)!;
  const st = searchStays(destId).find((s) => s.tier === scenario)!;
  const res = searchRestaurants(destId);
  const acts = searchActivities(destId);
  const items: Trip["items"] = [
    {
      id: uid("it"),
      kind: "flight",
      refId: fl.id,
      title: `${fl.fromCity} → ${fl.toCity}`,
      subtitle: `${fl.airline} · ${fl.depart}`,
      day: 1,
      time: fl.depart,
      price: fl.price,
      booked: status !== "draft",
    },
    {
      id: uid("it"),
      kind: "stay",
      refId: st.id,
      title: st.name,
      subtitle: `${st.kind} · ${days} nuits`,
      day: 1,
      price: st.pricePerNight * days,
      booked: status !== "draft",
    },
  ];
  for (let day = 1; day <= days; day++) {
    const a = acts[(day - 1) % acts.length];
    items.push({
      id: uid("it"),
      kind: "activity",
      refId: a.id,
      title: a.name,
      subtitle: `${a.category} · ${a.durationH}h`,
      day,
      time: "10:00",
      price: a.price * travelers,
      booked: status !== "draft" && day <= 2,
    });
    const r = res[(day - 1) % res.length];
    items.push({
      id: uid("it"),
      kind: "restaurant",
      refId: r.id,
      title: r.name,
      subtitle: `${r.cuisine}`,
      day,
      time: "20:00",
      price: r.avgPrice * travelers,
      booked: false,
    });
  }
  const sum = (k: string) => items.filter((i) => i.kind === k).reduce((s, i) => s + i.price, 0);
  const expenses: Trip["expenses"] = [
    { id: uid("ex"), label: "Vol aller-retour", category: "Vols", amount: fl.price, day: 1, planned: true },
    { id: uid("ex"), label: st.name, category: "Hébergement", amount: st.pricePerNight * days, day: 1, planned: true },
    { id: uid("ex"), label: "Restaurants prévus", category: "Restos", amount: sum("restaurant"), day: 1, planned: true },
    { id: uid("ex"), label: "Activités prévues", category: "Activités", amount: sum("activity"), day: 1, planned: true },
    { id: uid("ex"), label: "Transports sur place", category: "Transport", amount: Math.round(d.avgBudget5d * 0.08), day: 1, planned: true },
    { id: uid("ex"), label: "Imprévus", category: "Imprévus", amount: Math.round(d.avgBudget5d * 0.07), day: 1, planned: true },
  ];
  if (status === "booked" || status === "completed") {
    expenses.push(
      { id: uid("ex"), label: "Café & pastéis", category: "Restos", amount: 14, day: 1, planned: false },
      { id: uid("ex"), label: "Taxi aéroport", category: "Transport", amount: 28, day: 1, planned: false },
      { id: uid("ex"), label: "Souvenirs marché", category: "Shopping", amount: 46, day: 2, planned: false },
    );
  }
  const budget =
    expenses.filter((e) => e.planned).reduce((s, e) => s + e.amount, 0) + Math.round(d.avgBudget5d * 0.05);
  return {
    id,
    title,
    city: d.city,
    country: d.country,
    countryName: d.countryName,
    countryCode: d.countryCode,
    startDate: start,
    endDate: end,
    days,
    travelers,
    budget: Math.round(budget / 10) * 10,
    scenario,
    status,
    coverImage: d.image,
    items,
    expenses,
  };
}

export const DEMO_TRIPS: Trip[] = [
  buildTrip("demo-lisbon", "lisbon", "Lisbonne au soleil de mars", "2026-03-12", "2026-03-17", "balanced", "booked", 2),
  buildTrip("demo-rome", "rome", "Rome en amoureux", "2026-05-28", "2026-06-01", "premium", "planned", 2),
  buildTrip("demo-tokyo", "tokyo", "Tokyo, première fois", "2026-10-04", "2026-10-13", "balanced", "draft", 1),
];

/** Crée un voyage à partir d'un scénario choisi dans le chat. */
export function createTrip(destId: string, tier: Tier, travelers = 2): Trip {
  const d = getDestination(destId);
  const start = new Date(Date.now() + 42 * 86400000);
  const end = new Date(start.getTime() + 5 * 86400000);
  const iso = (x: Date) => x.toISOString().slice(0, 10);
  return buildTrip(
    uid("trip"),
    destId,
    `${d?.city ?? "Voyage"} — escapade`,
    iso(start),
    iso(end),
    tier,
    "draft",
    travelers,
  );
}

/* ─────────────────────────────────────────────────────────────
 *  VISITED COUNTRIES — alimente la carte gamifiée
 * ──────────────────────────────────────────────────────────── */

export const VISITED_COUNTRIES: VisitedCountry[] = [
  { countryName: "France", countryCode: "FR", citiesVisited: 9, majorCities: 12, daysSpent: 210, activitiesValidated: 64, trips: 18 },
  { countryName: "Portugal", countryCode: "PT", citiesVisited: 5, majorCities: 8, daysSpent: 34, activitiesValidated: 22, trips: 4 },
  { countryName: "Spain", countryCode: "ES", citiesVisited: 6, majorCities: 12, daysSpent: 41, activitiesValidated: 28, trips: 5 },
  { countryName: "Italy", countryCode: "IT", citiesVisited: 4, majorCities: 14, daysSpent: 22, activitiesValidated: 17, trips: 3 },
  { countryName: "Greece", countryCode: "GR", citiesVisited: 2, majorCities: 10, daysSpent: 12, activitiesValidated: 8, trips: 2 },
  { countryName: "Croatia", countryCode: "HR", citiesVisited: 2, majorCities: 8, daysSpent: 9, activitiesValidated: 6, trips: 1 },
  { countryName: "Netherlands", countryCode: "NL", citiesVisited: 1, majorCities: 6, daysSpent: 4, activitiesValidated: 3, trips: 1 },
  { countryName: "Morocco", countryCode: "MA", citiesVisited: 3, majorCities: 9, daysSpent: 16, activitiesValidated: 11, trips: 2 },
  { countryName: "Japan", countryCode: "JP", citiesVisited: 3, majorCities: 14, daysSpent: 18, activitiesValidated: 14, trips: 1 },
  { countryName: "Thailand", countryCode: "TH", citiesVisited: 2, majorCities: 10, daysSpent: 13, activitiesValidated: 9, trips: 1 },
  { countryName: "Iceland", countryCode: "IS", citiesVisited: 1, majorCities: 4, daysSpent: 6, activitiesValidated: 5, trips: 1 },
];
