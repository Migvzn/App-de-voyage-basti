"use client";

import { TravelItinerary } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import { HotelCard, FlightCard, ActivityCard } from "./TravelCard";
import BudgetBreakdown from "./BudgetBreakdown";
import { Calendar, Sun, Coffee, Moon, MapPin, Star, Shield, Clock, Lightbulb } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ItineraryDisplayProps {
  itinerary: TravelItinerary;
}

const TABS = ["Overview", "Itinerary", "Flights", "Hotels", "Budget"] as const;
type Tab = typeof TABS[number];

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="bg-[#0f0f0f] border border-[#222222] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-b border-[#222222] p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-1">{itinerary.title}</h2>
            <div className="flex items-center gap-3 text-sm text-[#888888]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {itinerary.origin} → {itinerary.destination}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {itinerary.duration} days
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#f5f5f5]">{formatCurrency(itinerary.budget.total, itinerary.budget.currency)}</div>
            <div className="text-xs text-[#555555]">total budget</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#888888] leading-relaxed">{itinerary.summary}</p>

        {/* Highlights */}
        <div className="mt-4 flex flex-wrap gap-2">
          {itinerary.highlights.map(h => (
            <span key={h} className="flex items-center gap-1 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-300">
              <Star className="w-2.5 h-2.5" />
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#222222] px-6 flex gap-1 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              activeTab === tab
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-[#555555] hover:text-[#888888]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Overview */}
        {activeTab === "Overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={<Calendar className="w-4 h-4 text-indigo-400" />}
                title="Best Time to Visit"
                content={itinerary.bestTimeToVisit}
              />
              <InfoCard
                icon={<Sun className="w-4 h-4 text-yellow-400" />}
                title="Weather"
                content={itinerary.weather}
              />
            </div>

            {itinerary.hiddenGems.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  Hidden Gems
                </h3>
                <div className="grid gap-2">
                  {itinerary.hiddenGems.map((gem, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#888888]">
                      <span className="text-yellow-400 mt-0.5">✦</span>
                      {gem}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {itinerary.safetyTips.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  Safety Tips
                </h3>
                <div className="grid gap-2">
                  {itinerary.safetyTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#888888]">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Itinerary */}
        {activeTab === "Itinerary" && (
          <div className="space-y-6">
            {itinerary.days.length > 0 ? (
              itinerary.days.map(day => (
                <div key={day.day} className="border border-[#222222] rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 px-5 py-4 border-b border-[#222222]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-indigo-400 font-medium mb-0.5">Day {day.day}</div>
                        <h3 className="font-semibold text-[#f5f5f5]">{day.title}</h3>
                        <div className="text-xs text-[#555555] mt-0.5">{day.theme}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-[#f5f5f5]">{formatCurrency(day.estimatedCost, "EUR")}</div>
                        <div className="text-xs text-[#555555]">est. cost</div>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-[#1a1a1a]">
                    <TimeSlot icon={<Coffee className="w-3.5 h-3.5" />} label="Morning" slot={day.morning} />
                    <TimeSlot icon={<Sun className="w-3.5 h-3.5" />} label="Afternoon" slot={day.afternoon} />
                    <TimeSlot icon={<Moon className="w-3.5 h-3.5" />} label="Evening" slot={day.evening} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-[#555555]">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No day-by-day itinerary available</p>
              </div>
            )}
          </div>
        )}

        {/* Flights */}
        {activeTab === "Flights" && (
          <div className="grid gap-4">
            {itinerary.flights.length > 0 ? (
              itinerary.flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <div className="text-center py-12 text-[#555555]">No flights data available</div>
            )}
          </div>
        )}

        {/* Hotels */}
        {activeTab === "Hotels" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.hotels.length > 0 ? (
              itinerary.hotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <div className="text-center py-12 text-[#555555]">No hotels data available</div>
            )}
          </div>
        )}

        {/* Budget */}
        {activeTab === "Budget" && (
          <BudgetBreakdown budget={itinerary.budget} />
        )}

        {/* Activities shown on all tabs at bottom */}
        {activeTab === "Overview" && itinerary.activities.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-indigo-400" />
              Top Activities
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {itinerary.activities.slice(0, 4).map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-medium text-[#888888] uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-sm text-[#f5f5f5]">{content}</p>
    </div>
  );
}

function TimeSlot({ icon, label, slot }: {
  icon: React.ReactNode;
  label: string;
  slot: { time: string; activity: string; location: string; cost: number; tips: string; duration: string };
}) {
  return (
    <div className="p-4 flex gap-4">
      <div className="flex flex-col items-center gap-1 w-20 shrink-0">
        <div className="flex items-center gap-1 text-[#555555]">
          {icon}
          <span className="text-xs">{label}</span>
        </div>
        <div className="text-xs text-[#444444]">{slot.time}</div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-[#f5f5f5] mb-1">{slot.activity}</div>
        <div className="flex items-center gap-3 text-xs text-[#555555] mb-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />
            {slot.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {slot.duration}
          </span>
          <span className="text-indigo-400">{formatCurrency(slot.cost, "EUR")}</span>
        </div>
        {slot.tips && (
          <div className="text-xs text-[#555555] italic">💡 {slot.tips}</div>
        )}
      </div>
    </div>
  );
}
