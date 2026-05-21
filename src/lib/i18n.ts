"use client";

import { useApp } from "./store";

type Dict = Record<string, string>;

const FR: Dict = {
  "nav.home": "Accueil",
  "nav.chat": "Assistant",
  "nav.explore": "Explorer",
  "nav.trips": "Mes voyages",
  "nav.map": "Carte du monde",
  "nav.budget": "Budget",
  "nav.community": "Communauté",
  "nav.profile": "Profil",
  "nav.pricing": "Abonnement",
  "common.book": "Réserver",
  "common.booked": "Réservé",
  "common.from": "à partir de",
  "common.perNight": "/ nuit",
  "common.viewTrip": "Voir le voyage",
  "common.startPlanning": "Planifier mon voyage",
  "hero.title": "Ton prochain voyage,",
  "hero.titleAccent": "planifié en une phrase.",
  "hero.subtitle":
    "Dis-nous une envie floue. Wanderly te rend un voyage complet — vols, logement, restos, activités, budget — sans jamais ouvrir un autre onglet.",
  "chat.placeholder": "Ex : je veux partir au soleil en mars, budget 800 €",
};

const EN: Dict = {
  "nav.home": "Home",
  "nav.chat": "Assistant",
  "nav.explore": "Explore",
  "nav.trips": "My trips",
  "nav.map": "World map",
  "nav.budget": "Budget",
  "nav.community": "Community",
  "nav.profile": "Profile",
  "nav.pricing": "Plans",
  "common.book": "Book",
  "common.booked": "Booked",
  "common.from": "from",
  "common.perNight": "/ night",
  "common.viewTrip": "View trip",
  "common.startPlanning": "Plan my trip",
  "hero.title": "Your next trip,",
  "hero.titleAccent": "planned in one sentence.",
  "hero.subtitle":
    "Tell us a vague wish. Wanderly hands back a complete trip — flights, stays, restaurants, activities, budget — without ever opening another tab.",
  "chat.placeholder": "e.g. I want sun in March, budget €800",
};

const DICTS: Record<"fr" | "en", Dict> = { fr: FR, en: EN };

export function useT() {
  const language = useApp((s) => s.language);
  return (key: string): string => DICTS[language][key] ?? FR[key] ?? key;
}
