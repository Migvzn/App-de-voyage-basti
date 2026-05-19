"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { Hotel, Flight, Activity, Restaurant } from "@/types";
import { Star, Clock, MapPin, Plane, ExternalLink, Users, Wifi } from "lucide-react";

interface HotelCardProps {
  hotel: Hotel;
  className?: string;
}

export function HotelCard({ hotel, className }: HotelCardProps) {
  return (
    <div className={cn(
      "bg-[#111111] border border-[#222222] rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-200 group",
      className
    )}>
      <div className="h-40 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">
          🏨
        </div>
        <div className="absolute top-3 right-3">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            hotel.category === "luxury" ? "bg-yellow-500/20 text-yellow-400" :
            hotel.category === "boutique" ? "bg-purple-500/20 text-purple-400" :
            "bg-green-500/20 text-green-400"
          )}>
            {hotel.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-[#f5f5f5] text-sm leading-tight">{hotel.name}</h3>
          <div className="flex items-center gap-1 ml-2 shrink-0">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-[#888888]">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#555555] mb-3">
          <MapPin className="w-3 h-3" />
          {hotel.location}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map(a => (
            <span key={a} className="flex items-center gap-1 px-2 py-0.5 bg-[#1a1a1a] rounded text-xs text-[#888888]">
              {a === "WiFi" && <Wifi className="w-2.5 h-2.5" />}
              {a}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#f5f5f5]">{formatCurrency(hotel.pricePerNight, hotel.currency)}</span>
            <span className="text-xs text-[#555555]">/night</span>
          </div>
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium rounded-lg hover:bg-indigo-500/20 transition-colors"
          >
            Book
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
    ? new Date(flight.departure).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : flight.departure;
  const arrivalTime = flight.arrival.includes("T")
    ? new Date(flight.arrival).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : flight.arrival;

  return (
    <div className={cn(
      "bg-[#111111] border border-[#222222] rounded-xl p-4 hover:border-indigo-500/30 transition-all duration-200",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
            <Plane className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#f5f5f5]">{flight.airline}</div>
            <div className="text-xs text-[#555555]">{flight.stops === 0 ? "Direct" : `${flight.stops} stop`}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-[#f5f5f5]">{formatCurrency(flight.price, flight.currency)}</div>
          <div className="text-xs text-[#555555]">per person</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-xl font-bold text-[#f5f5f5]">{departureTime}</div>
          <div className="text-xs text-[#555555]">{flight.origin}</div>
        </div>
        <div className="flex-1 mx-4 flex flex-col items-center gap-1">
          <div className="text-xs text-[#555555]">{flight.duration}</div>
          <div className="w-full flex items-center gap-1">
            <div className="flex-1 h-px bg-[#333333]" />
            <Plane className="w-3 h-3 text-[#555555] rotate-90" />
            <div className="flex-1 h-px bg-[#333333]" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-[#f5f5f5]">{arrivalTime}</div>
          <div className="text-xs text-[#555555]">{flight.destination}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <a
          href={flight.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium rounded-lg hover:bg-indigo-500/20 transition-colors"
        >
          Book Flight
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
    Culture: "text-blue-400 bg-blue-500/10",
    Food: "text-orange-400 bg-orange-500/10",
    Nature: "text-green-400 bg-green-500/10",
    Adventure: "text-red-400 bg-red-500/10",
    Experience: "text-purple-400 bg-purple-500/10",
  };

  return (
    <div className={cn(
      "bg-[#111111] border border-[#222222] rounded-xl p-4 hover:border-indigo-500/30 transition-all duration-200",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-[#f5f5f5] text-sm leading-tight mb-1">{activity.name}</h3>
          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", typeColors[activity.type] || "text-gray-400 bg-gray-500/10")}>
            {activity.type}
          </span>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-[#888888]">{activity.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-[#555555] mb-3">
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
          <span key={h} className="px-2 py-0.5 bg-[#1a1a1a] rounded text-xs text-[#888888]">{h}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-[#f5f5f5]">{formatCurrency(activity.price, activity.currency)}</span>
          <span className="text-xs text-[#555555]">/person</span>
        </div>
        <a
          href={activity.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium rounded-lg hover:bg-indigo-500/20 transition-colors"
        >
          Book
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
      "bg-[#111111] border border-[#222222] rounded-xl p-4 hover:border-indigo-500/30 transition-all duration-200",
      className
    )}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-[#f5f5f5] text-sm">{restaurant.name}</h3>
          <span className="text-xs text-[#888888]">{restaurant.cuisine}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-[#888888]">{restaurant.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-[#555555] mb-2">
        <MapPin className="w-3 h-3" />
        {restaurant.location}
        <span className="ml-2">{Array(restaurant.priceRange).fill("€").join("")}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {restaurant.mustTry.slice(0, 2).map(item => (
          <span key={item} className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded text-xs">{item}</span>
        ))}
      </div>

      <a
        href={restaurant.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#222222] text-[#888888] text-xs font-medium rounded-lg hover:text-[#f5f5f5] hover:border-[#333333] transition-colors"
      >
        <Users className="w-3 h-3" />
        Reserve Table
      </a>
    </div>
  );
}
