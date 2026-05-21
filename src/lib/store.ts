"use client";

import { create } from "zustand";
import { DEMO_TRIPS } from "./mock-data";
import type { Expense, Trip, TripItem, UserProfile } from "./types";
import { uid } from "./utils";

const DEMO_PROFILE: UserProfile = {
  name: "Basti",
  email: "miguelvzn@icloud.com",
  xp: 9400,
  plan: "explorer",
  points: 150,
  moods: ["culture", "foodie", "chill"],
  typicalBudget: 900,
  kmTravelled: 84200,
  unlockedBadges: [
    "first-trip",
    "foodie",
    "city-breaker",
    "continent-eu",
    "deal-hunter",
    "sun-chaser",
    "reviewer",
    "duo",
    "budget-master",
  ],
};

interface AppState {
  profile: UserProfile;
  trips: Trip[];
  language: "fr" | "en";
  lastXpGain: number | null;

  setLanguage: (l: "fr" | "en") => void;
  addXp: (amount: number) => void;
  clearXpGain: () => void;
  addTrip: (trip: Trip) => void;
  addExpense: (tripId: string, expense: Omit<Expense, "id">) => void;
  toggleBooked: (tripId: string, itemId: string) => void;
  addItemToTrip: (tripId: string, item: Omit<TripItem, "id">) => void;
  unlockBadge: (id: string) => void;
  upgradePlan: (plan: UserProfile["plan"]) => void;
  setMoods: (moods: UserProfile["moods"]) => void;
  setTypicalBudget: (n: number) => void;
}

export const useApp = create<AppState>((set) => ({
  profile: DEMO_PROFILE,
  trips: DEMO_TRIPS,
  language: "fr",
  lastXpGain: null,

  setLanguage: (l) => set({ language: l }),

  addXp: (amount) =>
    set((s) => ({
      profile: { ...s.profile, xp: s.profile.xp + amount },
      lastXpGain: amount,
    })),

  clearXpGain: () => set({ lastXpGain: null }),

  addTrip: (trip) => set((s) => ({ trips: [trip, ...s.trips] })),

  addExpense: (tripId, expense) =>
    set((s) => ({
      trips: s.trips.map((t) =>
        t.id === tripId
          ? { ...t, expenses: [...t.expenses, { ...expense, id: uid("ex") }] }
          : t,
      ),
    })),

  toggleBooked: (tripId, itemId) =>
    set((s) => ({
      trips: s.trips.map((t) =>
        t.id === tripId
          ? {
              ...t,
              items: t.items.map((i) =>
                i.id === itemId ? { ...i, booked: !i.booked } : i,
              ),
            }
          : t,
      ),
    })),

  addItemToTrip: (tripId, item) =>
    set((s) => ({
      trips: s.trips.map((t) =>
        t.id === tripId
          ? { ...t, items: [...t.items, { ...item, id: uid("it") }] }
          : t,
      ),
    })),

  unlockBadge: (id) =>
    set((s) =>
      s.profile.unlockedBadges.includes(id)
        ? s
        : {
            profile: {
              ...s.profile,
              unlockedBadges: [...s.profile.unlockedBadges, id],
            },
          },
    ),

  upgradePlan: (plan) => set((s) => ({ profile: { ...s.profile, plan } })),

  setMoods: (moods) => set((s) => ({ profile: { ...s.profile, moods } })),

  setTypicalBudget: (n) =>
    set((s) => ({ profile: { ...s.profile, typicalBudget: n } })),
}));
