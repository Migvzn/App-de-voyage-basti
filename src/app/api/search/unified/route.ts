import { NextResponse } from "next/server";
import {
  findDestinationByText,
  getDestination,
  searchActivities,
  searchFlights,
  searchRestaurants,
  searchStays,
} from "@/lib/mock-data";

export const runtime = "nodejs";

/**
 * POST /api/search/unified
 * body: { destination, dateRange?, budget?, travelers?, mood? }
 *
 * Déclenche en parallèle vols / logements / restos / activités,
 * comme une vraie agrégation Skyscanner + Airbnb + TheFork + GetYourGuide.
 * Sans clés API : résultats mockés réalistes avec liens profonds.
 */
export async function POST(req: Request) {
  let body: { destination?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const query = (body.destination ?? "").trim();
  const dest =
    getDestination(query) ?? findDestinationByText(query) ?? undefined;

  if (!dest) {
    return NextResponse.json(
      { error: "destination introuvable", query },
      { status: 404 },
    );
  }

  const [flights, stays, restaurants, activities] = await Promise.all([
    Promise.resolve(searchFlights(dest.id)),
    Promise.resolve(searchStays(dest.id)),
    Promise.resolve(searchRestaurants(dest.id)),
    Promise.resolve(searchActivities(dest.id)),
  ]);

  return NextResponse.json({
    destination: {
      id: dest.id,
      city: dest.city,
      country: dest.country,
    },
    counts: {
      flights: flights.length,
      stays: stays.length,
      restaurants: restaurants.length,
      activities: activities.length,
    },
    flights,
    stays,
    restaurants,
    activities,
    source: "wanderly-mock",
    cachedFor: "30m",
  });
}
