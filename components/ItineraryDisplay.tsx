"use client";

import { TravelItinerary } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { HotelCard, FlightCard, ActivityCard } from "./TravelCard";
import BudgetBreakdown from "./BudgetBreakdown";
import { Calendar, Sun, Coffee, Moon, MapPin, Star, Shield, Clock, Lightbulb } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ItineraryDisplayProps {
  itinerary: TravelItinerary;
}

const TABS = ["Aperçu", "Itinéraire", "Vols", "Hôtels", "Budget"] as const;
type Tab = typeof TABS[number];

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Aperçu");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{itinerary.title}</h2>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {itinerary.origin} → {itinerary.destination}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {itinerary.duration} jours
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(itinerary.budget.total, itinerary.budget.currency)}</div>
            <div className="text-xs text-slate-400">budget total</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600 leading-relaxed">{itinerary.summary}</p>

        {/* Highlights */}
        <div className="mt-4 flex flex-wrap gap-2">
          {itinerary.highlights.map(h => (
            <span key={h} className="flex items-center gap-1 px-3 py-1 bg-sky-100 border border-sky-200 rounded-full text-xs text-sky-700">
              <Star className="w-2.5 h-2.5" />
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 px-6 flex gap-1 overflow-x-auto bg-white">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              activeTab === tab
                ? "border-sky-500 text-sky-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 bg-slate-50">
        {/* Aperçu */}
        {activeTab === "Aperçu" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={<Calendar className="w-4 h-4 text-sky-500" />}
                title="Meilleure période"
                content={itinerary.bestTimeToVisit}
              />
              <InfoCard
                icon={<Sun className="w-4 h-4 text-yellow-500" />}
                title="Météo"
                content={itinerary.weather}
              />
            </div>

            {itinerary.hiddenGems.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Pépites locales
                </h3>
                <div className="grid gap-2">
                  {itinerary.hiddenGems.map((gem, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-yellow-500 mt-0.5">✦</span>
                      {gem}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {itinerary.safetyTips.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Conseils de sécurité
                </h3>
                <div className="grid gap-2">
                  {itinerary.safetyTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Itinéraire */}
        {activeTab === "Itinéraire" && (
          <div className="space-y-6">
            {itinerary.days.length > 0 ? (
              itinerary.days.map(day => (
                <div key={day.day} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-5 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-sky-600 font-medium mb-0.5">Jour {day.day}</div>
                        <h3 className="font-semibold text-slate-900">{day.title}</h3>
                        <div className="text-xs text-slate-400 mt-0.5">{day.theme}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{formatCurrency(day.estimatedCost, "EUR")}</div>
                        <div className="text-xs text-slate-400">coût estimé</div>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <TimeSlot icon={<Coffee className="w-3.5 h-3.5" />} label="Matin" slot={day.morning} />
                    <TimeSlot icon={<Sun className="w-3.5 h-3.5" />} label="Après-midi" slot={day.afternoon} />
                    <TimeSlot icon={<Moon className="w-3.5 h-3.5" />} label="Soirée" slot={day.evening} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Aucun itinéraire jour par jour disponible</p>
              </div>
            )}
          </div>
        )}

        {/* Vols */}
        {activeTab === "Vols" && (
          <div className="grid gap-4">
            {itinerary.flights.length > 0 ? (
              itinerary.flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">Aucune donnée de vol disponible</div>
            )}
          </div>
        )}

        {/* Hôtels */}
        {activeTab === "Hôtels" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.hotels.length > 0 ? (
              itinerary.hotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">Aucune donnée d&apos;hôtel disponible</div>
            )}
          </div>
        )}

        {/* Budget */}
        {activeTab === "Budget" && (
          <BudgetBreakdown budget={itinerary.budget} />
        )}

        {/* Activités en aperçu */}
        {activeTab === "Aperçu" && itinerary.activities.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-sky-500" />
              Meilleures activités
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
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-sm text-slate-900">{content}</p>
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
        <div className="flex items-center gap-1 text-slate-400">
          {icon}
          <span className="text-xs">{label}</span>
        </div>
        <div className="text-xs text-slate-300">{slot.time}</div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-slate-900 mb-1">{slot.activity}</div>
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />
            {slot.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {slot.duration}
          </span>
          <span className="text-sky-500">{formatCurrency(slot.cost, "EUR")}</span>
        </div>
        {slot.tips && (
          <div className="text-xs text-slate-400 italic">💡 {slot.tips}</div>
        )}
      </div>
    </div>
  );
}

