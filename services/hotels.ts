import { Hotel } from "@/types";
import { generateAffiliateLink } from "@/lib/affiliates";
import { generateId } from "@/lib/utils";
import { getDestinationCoords } from "@/lib/travel";

const HOTEL_NAMES = [
  "Grand Palais Hotel", "Villa Bella Vista", "The Urban Retreat",
  "Boutique Central", "Maison du Voyage", "Hotel Lumière",
  "Casa Bella", "The Nomad Suite", "Palazzo Elegante",
];

export async function searchHotels(
  destination: string,
  checkIn: string,
  checkOut: string,
  guests = 2
): Promise<Hotel[]> {
  void checkIn; void checkOut; void guests;
  await new Promise(r => setTimeout(r, 400));

  const coords = getDestinationCoords(destination);
  const basePrice = Math.floor(Math.random() * 100) + 60;

  return Array.from({ length: 6 }, (_, i) => ({
    id: generateId(),
    name: HOTEL_NAMES[i % HOTEL_NAMES.length],
    location: destination,
    coordinates: {
      lat: coords.lat + (Math.random() - 0.5) * 0.05,
      lng: coords.lng + (Math.random() - 0.5) * 0.05,
    },
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    pricePerNight: basePrice + i * 25,
    currency: "EUR",
    amenities: ["WiFi", "Breakfast", "AC", i > 3 ? "Pool" : "Bar"].filter(Boolean),
    images: [`https://images.unsplash.com/photo-${1566073771259 + i * 1000000}?w=800`],
    description: `A beautiful hotel in the heart of ${destination} offering premium comfort and local charm.`,
    bookingUrl: generateAffiliateLink("booking", `/hotel/${generateId()}`),
    affiliateId: "ilur_booking_001",
    category: (i < 2 ? "budget" : i < 4 ? "boutique" : "luxury") as "budget" | "boutique" | "luxury",
  }));
}
