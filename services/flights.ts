import { Flight } from "@/types";
import { generateAffiliateLink } from "@/lib/affiliates";
import { generateId } from "@/lib/utils";

const AIRLINES = ["Air France", "Ryanair", "easyJet", "Lufthansa", "British Airways", "Iberia", "KLM", "Vueling"];

export async function searchFlights(
  origin: string,
  destination: string,
  date: string,
  passengers = 1
): Promise<Flight[]> {
  // Mock adapter - replace with Skyscanner/Amadeus API
  await new Promise(r => setTimeout(r, 500));

  const basePrice = Math.floor(Math.random() * 200) + 50;

  return Array.from({ length: 4 }, (_, i) => ({
    id: generateId(),
    airline: AIRLINES[Math.floor(Math.random() * AIRLINES.length)],
    origin,
    destination,
    departure: `${date}T${String(6 + i * 3).padStart(2, '0')}:00:00`,
    arrival: `${date}T${String(9 + i * 3).padStart(2, '0')}:30:00`,
    duration: "2h 30m",
    price: (basePrice + i * 30) * passengers,
    currency: "EUR",
    class: "economy" as const,
    stops: i > 2 ? 1 : 0,
    bookingUrl: generateAffiliateLink("skyscanner", `/transport/flights/${origin.toLowerCase()}-${destination.toLowerCase()}`),
    affiliateId: "ilur_sky_001",
  }));
}
