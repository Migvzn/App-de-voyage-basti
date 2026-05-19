import { Restaurant } from "@/types";
import { generateAffiliateLink } from "@/lib/affiliates";
import { generateId } from "@/lib/utils";
import { getDestinationCoords } from "@/lib/travel";

export async function searchRestaurants(destination: string): Promise<Restaurant[]> {
  await new Promise(r => setTimeout(r, 300));
  const coords = getDestinationCoords(destination);

  const cuisines = ["Local Traditional", "Mediterranean", "Street Food", "Fine Dining", "Seafood", "Vegetarian"];
  const names = [
    "Trattoria della Nonna", "Le Petit Bistro", "Mercado Central",
    "The Hidden Kitchen", "Casa de Sabores", "Ristorante Il Sole",
    "Maison Gourmande", "The Local Table"
  ];

  return Array.from({ length: 8 }, (_, i) => ({
    id: generateId(),
    name: names[i % names.length],
    cuisine: cuisines[i % cuisines.length],
    location: destination,
    coordinates: {
      lat: coords.lat + (Math.random() - 0.5) * 0.04,
      lng: coords.lng + (Math.random() - 0.5) * 0.04,
    },
    rating: Math.round((4 + Math.random()) * 10) / 10,
    priceRange: (Math.min(4, 1 + Math.floor(i / 2))) as 1 | 2 | 3 | 4,
    description: `One of the best spots in ${destination} for authentic local cuisine.`,
    mustTry: ["Signature dish", "Chef's special", "Local dessert"],
    bookingUrl: generateAffiliateLink("viator", `/restaurant-${generateId()}`),
    affiliateId: "ilur_viator_001",
  }));
}
