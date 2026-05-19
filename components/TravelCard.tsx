"use client";

import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import { Hotel, Flight, Activity, Restaurant } from "@/types";
import { Star, Clock, MapPin, Plane, ExternalLink, Users, Wifi } from "lucide-react";
import { getStaticDestinationImage } from "@/lib/unsplash";

interface HotelCardProps {
  hotel: Hotel;
  className?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  luxury: "Luxe",
  boutique: "Boutique",
  budget: "Économique",
};

export function HotelCard({ hotel, className }: HotelCardProps) {
  const imageUrl = getStaticDestinationImage(hotel.name, 800, 320);

  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-sky-200 hover:shadow-md transition-all duration-200 group",
      className
    )}>
      <div className="h-40 relative overflow-hidden bg-gradient-to-br from-sky-100 to-blue-50">
        <Image
          src={imageUrl}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 400px"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
        />
        <div className="absolute top-3 right-3">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            hotel.category === "luxury" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
            hotel.category === "boutique" ? "bg-purple-100 text-purple-700 border border-purple-200" :
            "bg-green-100 text-green-700 border border-green-200"
          )}>
            {CATEGORY_LABELS[hotel.category] || hotel.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-slate-900 text-sm leading-tight">{hotel.name}</h3>
          <div className="flex items-center gap-1 ml-2 shrink-0">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-slate-500">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
          <MapPin className="w-3 h-3" />
          {hotel.location}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map(a => (
            <span key={a} className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500">
              {a === "WiFi" && <Wifi className="w-2.5 h-2.5" />}
              {a}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900">{formatCurrency(hotel.pricePerNight, hotel.currency)}</span>
            <span className="text-xs text-slate-400">/nuit</span>
          </div>
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200 text-sky-600 text-xs font-medium rounded-lg hover:bg-sky-100 transition-colors"
          >
            Réserver
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

interface FlightCardProps {
  flight: Flight;
  className?: string;
}

export function FlightCard({ flight, className }: FlightCardProps) {
  const departureTime = flight.departure.includes("T")
    ? new Date(flight.departure).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    : flight.departure;
  const arrivalTime = flight.arrival.includes("T")
    ? new Date(flight.arrival).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    : flight.arrival;

  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-200 hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center">
            <Plane className="w-4 h-4 text-sky-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{flight.airline}</div>
            <div className="text-xs text-slate-400">{flight.stops === 0 ? "Direct" : `${flight.stops} escale`}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-slate-900">{formatCurrency(flight.price, flight.currency)}</div>
          <div className="text-xs text-slate-400">par personne</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-xl font-bold text-slate-900">{departureTime}</div>
          <div className="text-xs text-slate-400">{flight.origin}</div>
        </div>
        <div className="flex-1 mx-4 flex flex-col items-center gap-1">
          <div className="text-xs text-slate-400">{flight.duration}</div>
          <div className="w-full flex items-center gap-1">
            <div className="flex-1 h-px bg-slate-200" />
            <Plane className="w-3 h-3 text-slate-400 rotate-90" />
            <div className="flex-1 h-px bg-slate-200" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-slate-900">{arrivalTime}</div>
          <div className="text-xs text-slate-400">{flight.destination}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <a
          href={flight.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200 text-sky-600 text-xs font-medium rounded-lg hover:bg-sky-100 transition-colors"
        >
          Réserver le vol
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

export function ActivityCard({ activity, className }: ActivityCardProps) {
  const typeColors: Record<string, string> = {
    Culture: "text-blue-600 bg-blue-50 border border-blue-100",
    Food: "text-orange-600 bg-orange-50 border border-orange-100",
    Nature: "text-green-600 bg-green-50 border border-green-100",
    Adventure: "text-red-600 bg-red-50 border border-red-100",
    Experience: "text-purple-600 bg-purple-50 border border-purple-100",
  };

  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-200 hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1">{activity.name}</h3>
          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", typeColors[activity.type] || "text-slate-500 bg-slate-50")}>
            {activity.type}
          </span>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-slate-500">{activity.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {activity.duration}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {activity.location}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {activity.highlights.map(h => (
          <span key={h} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500">{h}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-slate-900">{formatCurrency(activity.price, activity.currency)}</span>
          <span className="text-xs text-slate-400">/personne</span>
        </div>
        <a
          href={activity.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200 text-sky-600 text-xs font-medium rounded-lg hover:bg-sky-100 transition-colors"
        >
          Réserver
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-200 hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">{restaurant.name}</h3>
          <span className="text-xs text-slate-500">{restaurant.cuisine}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-slate-500">{restaurant.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <MapPin className="w-3 h-3" />
        {restaurant.location}
        <span className="ml-2 text-amber-500">{Array(restaurant.priceRange).fill("€").join("")}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {restaurant.mustTry.slice(0, 2).map(item => (
          <span key={item} className="px-2 py-0.5 bg-orange-50 border border-orange-100 text-orange-600 rounded text-xs">{item}</span>
        ))}
      </div>

      <a
        href={restaurant.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:text-sky-600 hover:border-sky-200 transition-colors"
      >
        <Users className="w-3 h-3" />
        Réserver une table
      </a>
    </div>
  );
}
