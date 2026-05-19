export interface TravelRequest {
  origin: string;
  destination: string;
  duration: number;
  budget: number;
  currency: string;
  travelers: number;
  style: 'budget' | 'comfort' | 'luxury';
  interests: string[];
  dates?: { start: string; end: string };
}

export interface Flight {
  id: string;
  airline: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  currency: string;
  class: 'economy' | 'business' | 'first';
  stops: number;
  bookingUrl: string;
  affiliateId: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  images: string[];
  description: string;
  bookingUrl: string;
  affiliateId: string;
  category: 'budget' | 'boutique' | 'luxury';
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  priceRange: 1 | 2 | 3 | 4;
  description: string;
  mustTry: string[];
  bookingUrl: string;
  affiliateId: string;
}

export interface Activity {
  id: string;
  name: string;
  type: string;
  location: string;
  coordinates: { lat: number; lng: number };
  duration: string;
  price: number;
  currency: string;
  rating: number;
  description: string;
  highlights: string[];
  bookingUrl: string;
  affiliateId: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  title: string;
  theme: string;
  morning: ItinerarySlot;
  afternoon: ItinerarySlot;
  evening: ItinerarySlot;
  accommodation: Hotel;
  estimatedCost: number;
}

export interface ItinerarySlot {
  time: string;
  activity: string;
  location: string;
  duration: string;
  cost: number;
  tips: string;
  coordinates?: { lat: number; lng: number };
}

export interface BudgetBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  misc: number;
  total: number;
  currency: string;
  perDay: number;
  perPerson: number;
}

export interface TravelItinerary {
  id: string;
  title: string;
  destination: string;
  origin: string;
  duration: number;
  travelers: number;
  summary: string;
  highlights: string[];
  flights: Flight[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  activities: Activity[];
  days: DayItinerary[];
  budget: BudgetBreakdown;
  mapRoute: { lat: number; lng: number }[];
  hiddenGems: string[];
  safetyTips: string[];
  bestTimeToVisit: string;
  weather: string;
  transportOptions: TransportOption[];
  createdAt: string;
}

export interface TransportOption {
  type: 'train' | 'bus' | 'taxi' | 'rental' | 'metro' | 'ferry';
  name: string;
  route: string;
  duration: string;
  price: number;
  currency: string;
  bookingUrl: string;
  affiliateId: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    travelStyle: 'budget' | 'comfort' | 'luxury';
    interests: string[];
    budgetRange: { min: number; max: number };
    preferredCurrency: string;
  };
  stats: {
    tripsPlanned: number;
    countriesVisited: number;
    totalXP: number;
    streak: number;
    level: number;
  };
  achievements: Achievement[];
  savedTrips: string[];
  visitedCountries: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  itinerary?: TravelItinerary;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  coordinates: { lat: number; lng: number };
  tagline: string;
  description: string;
  highlights: string[];
  bestFor: string[];
  avgBudgetPerDay: number;
  currency: string;
  images: string[];
  rating: number;
  trending: boolean;
}
