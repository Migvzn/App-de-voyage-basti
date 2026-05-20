export interface Trip {
  id: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: { total: number; spent: number; currency: string };
  status: "upcoming" | "ongoing" | "completed";
  days: TripDay[];
  budgetBreakdown: Record<string, number>;
}

export interface TripDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Activity {
  time: string;
  name: string;
  type: string;
  cost: number;
  location?: string;
  bookingUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNext: number;
  rank: string;
  tripsCount: number;
  countriesCount: number;
  daysAbroad: number;
  badges: string[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
