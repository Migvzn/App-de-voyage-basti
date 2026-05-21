export type Mood = "chill" | "adventure" | "culture" | "foodie";
export type Tier = "eco" | "balanced" | "premium";

export interface Destination {
  id: string;
  city: string;
  country: string;
  /** Must match the `name` property in public/world-110m.json */
  countryName: string;
  countryCode: string;
  continent: string;
  blurb: string;
  /** CSS linear-gradient used by the editorial poster cover. */
  image: string;
  iconKey: string;
  moods: Mood[];
  avgBudget5d: number;
  bestMonths: number[];
  rating: number;
  trending: boolean;
  dealPrice?: number;
}

export interface Flight {
  id: string;
  airline: string;
  fromCity: string;
  toCity: string;
  fromCode: string;
  toCode: string;
  depart: string;
  arrive: string;
  durationMin: number;
  stops: number;
  price: number;
  tier: Tier;
  deepLink: string;
}

export interface Stay {
  id: string;
  name: string;
  kind: "Appartement" | "Hôtel" | "Loft" | "Maison" | "Villa";
  area: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  tier: Tier;
  deepLink: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  area: string;
  rating: number;
  priceLevel: 1 | 2 | 3 | 4;
  avgPrice: number;
  image: string;
  deepLink: string;
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  durationH: number;
  rating: number;
  price: number;
  image: string;
  deepLink: string;
}

export type BudgetCategory =
  | "Vols"
  | "Hébergement"
  | "Restos"
  | "Activités"
  | "Transport"
  | "Shopping"
  | "Imprévus";

export interface Expense {
  id: string;
  label: string;
  category: BudgetCategory;
  amount: number;
  day: number;
  planned: boolean;
}

export type ItemKind = "flight" | "stay" | "restaurant" | "activity";

export interface TripItem {
  id: string;
  kind: ItemKind;
  refId: string;
  title: string;
  subtitle: string;
  day: number;
  time?: string;
  price: number;
  booked: boolean;
  image?: string;
}

export type TripStatus = "draft" | "planned" | "booked" | "completed";

export interface Trip {
  id: string;
  title: string;
  city: string;
  country: string;
  countryName: string;
  countryCode: string;
  startDate: string;
  endDate: string;
  days: number;
  travelers: number;
  budget: number;
  scenario: Tier;
  status: TripStatus;
  coverImage: string;
  items: TripItem[];
  expenses: Expense[];
}

export interface BadgeDef {
  id: string;
  name: string;
  desc: string;
  icon: string;
  xp: number;
}

export interface VisitedCountry {
  countryName: string;
  countryCode: string;
  citiesVisited: number;
  majorCities: number;
  daysSpent: number;
  activitiesValidated: number;
  trips: number;
}

export interface UserProfile {
  name: string;
  email: string;
  xp: number;
  plan: "free" | "explorer" | "globetrotter";
  points: number;
  moods: Mood[];
  typicalBudget: number;
  kmTravelled: number;
  unlockedBadges: string[];
}

export interface ChatCard {
  kind: ItemKind | "scenario";
  data: Flight | Stay | Restaurant | Activity | ScenarioCard;
}

export interface ScenarioCard {
  tier: Tier;
  label: string;
  city: string;
  total: number;
  breakdown: { category: BudgetCategory; amount: number }[];
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  cards?: ChatCard[];
  suggestions?: string[];
}
