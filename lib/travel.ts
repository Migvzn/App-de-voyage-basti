import { BudgetBreakdown } from "@/types";

export function calculateBudgetBreakdown(
  flightCost: number,
  hotelCostPerNight: number,
  duration: number,
  travelers: number
): BudgetBreakdown {
  const accommodation = hotelCostPerNight * duration;
  const food = duration * 45 * travelers;
  const activities = duration * 35 * travelers;
  const transport = duration * 15 * travelers;
  const misc = Math.round((flightCost + accommodation + food + activities + transport) * 0.1);
  const total = flightCost + accommodation + food + activities + transport + misc;

  return {
    flights: flightCost,
    accommodation,
    food,
    activities,
    transport,
    misc,
    total,
    currency: "EUR",
    perDay: Math.round(total / duration),
    perPerson: Math.round(total / travelers),
  };
}

export function parseTravelIntent(message: string): {
  hasOrigin: boolean;
  hasDuration: boolean;
  hasBudget: boolean;
  hasDestination: boolean;
} {
  const lower = message.toLowerCase();
  return {
    hasOrigin: /from\s+\w+|departing|leaving\s+from/.test(lower),
    hasDuration: /\d+\s*(day|night|week)/.test(lower),
    hasBudget: /\d+\s*(€|euro|eur|\$|dollar|£|pound|budget)/.test(lower),
    hasDestination: /to\s+\w+|in\s+\w+|visit|trip\s+to/.test(lower),
  };
}

export const DESTINATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Rome": { lat: 41.9028, lng: 12.4964 },
  "Paris": { lat: 48.8566, lng: 2.3522 },
  "Barcelona": { lat: 41.3851, lng: 2.1734 },
  "Amsterdam": { lat: 52.3676, lng: 4.9041 },
  "Prague": { lat: 50.0755, lng: 14.4378 },
  "Lisbon": { lat: 38.7169, lng: -9.1399 },
  "Tokyo": { lat: 35.6762, lng: 139.6503 },
  "Bangkok": { lat: 13.7563, lng: 100.5018 },
  "Bali": { lat: -8.4095, lng: 115.1889 },
  "New York": { lat: 40.7128, lng: -74.006 },
  "Dubai": { lat: 25.2048, lng: 55.2708 },
  "London": { lat: 51.5074, lng: -0.1278 },
  "Santorini": { lat: 36.3932, lng: 25.4615 },
  "Marrakech": { lat: 31.6295, lng: -7.9811 },
  "Kyoto": { lat: 35.0116, lng: 135.7681 },
};

export function getDestinationCoords(name: string) {
  const key = Object.keys(DESTINATION_COORDINATES).find(k =>
    name.toLowerCase().includes(k.toLowerCase())
  );
  return key ? DESTINATION_COORDINATES[key] : { lat: 48.8566, lng: 2.3522 };
}
