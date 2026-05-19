import { Activity } from "@/types";
import { generateAffiliateLink } from "@/lib/affiliates";
import { generateId } from "@/lib/utils";
import { getDestinationCoords } from "@/lib/travel";

export async function searchActivities(destination: string): Promise<Activity[]> {
  await new Promise(r => setTimeout(r, 300));
  const coords = getDestinationCoords(destination);

  const activities = [
    { name: "Old City Walking Tour", type: "Culture", duration: "3h", price: 25 },
    { name: "Cooking Class", type: "Food", duration: "4h", price: 65 },
    { name: "Day Trip to Countryside", type: "Nature", duration: "8h", price: 55 },
    { name: "Sunset Boat Tour", type: "Experience", duration: "2h", price: 45 },
    { name: "Museum Pass", type: "Culture", duration: "4h", price: 20 },
    { name: "Street Food Tour", type: "Food", duration: "3h", price: 35 },
    { name: "Bike Rental Day", type: "Adventure", duration: "6h", price: 20 },
    { name: "Wine Tasting", type: "Food", duration: "2h", price: 50 },
  ];

  return activities.map(a => ({
    id: generateId(),
    name: `${destination} ${a.name}`,
    type: a.type,
    location: destination,
    coordinates: {
      lat: coords.lat + (Math.random() - 0.5) * 0.04,
      lng: coords.lng + (Math.random() - 0.5) * 0.04,
    },
    duration: a.duration,
    price: a.price,
    currency: "EUR",
    rating: Math.round((4.2 + Math.random() * 0.8) * 10) / 10,
    description: `Experience the best of ${destination} with this curated ${a.type.toLowerCase()} activity.`,
    highlights: ["Expert guide", "Small group", "Includes equipment"],
    bookingUrl: generateAffiliateLink("getyourguide", `/activity-${generateId()}`),
    affiliateId: "ilur_gyg_001",
  }));
}
