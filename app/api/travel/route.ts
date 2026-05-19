import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/services/flights";
import { searchHotels } from "@/services/hotels";
import { searchRestaurants } from "@/services/restaurants";
import { searchActivities } from "@/services/activities";

export async function POST(req: NextRequest) {
  const { destination, origin, checkIn, checkOut, guests } = await req.json();

  const [flights, hotels, restaurants, activities] = await Promise.all([
    searchFlights(origin, destination, checkIn, guests),
    searchHotels(destination, checkIn, checkOut, guests),
    searchRestaurants(destination),
    searchActivities(destination),
  ]);

  return NextResponse.json({ flights, hotels, restaurants, activities });
}
