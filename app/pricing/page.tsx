import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "0€",
    period: "",
    desc: "Pour découvrir Wanderly",
    color: "border-gray-200",
    cta: "Commencer gratuitement",
    ctaStyle: "bg-gray-900 text-white hover:bg-gray-700",
    features: [
      "3 voyages IA par mois",
      "Recherche illimitée",
      "Budget basique",
      "Accès communauté",
      "Carte du monde",
    ],
  },
  {
    name: "Explorer",
    price: "9,99€",
    period: "/mois",
    desc: "Pour les voyageurs réguliers",
    color: "border-[#FF5A3C] shadow-lg shadow-orange-100",
    badge: "Populaire",
    cta: "Commencer l'essai",
    ctaStyle: "bg-[#FF5A3C] text-white hover:bg-[#E8432A]",
    features: [
      "Voyages IA illimités",
      "Alertes prix en temps réel",
      "Export PDF itinéraires",
      "Budget avancé + split",
      "50 points/mois",
      "Support prioritaire",
    ],
  },
  {
    name: "Globetrotter",
    price: "19,99€",
    period: "/mois",
    desc: "Pour les grands voyageurs",
    color: "border-gray-200",
    cta: "Commencer l'essai",
    ctaStyle: "bg-gray-900 text-white hover:bg-gray-700",
    features: [
      "Tout Explorer +",
      "Concierge IA prioritaire (Opus)",
      "Réservations sans frais",
      "200 points/mois",
      "Support 24/7",
      "Accès bêta fonctionnalités",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Nav />
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-[#0A0A0A] mb-3">Simple et transparent 💳</h1>
            <p className="text-gray-500 text-lg">Commencez gratuitement. Upgradez quand vous voulez.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`bg-white rounded-3xl p-8 border-2 ${plan.color} relative`}>
                {"badge" in plan && plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF5A3C] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-[#0A0A0A] text-lg">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold text-[#0A0A0A]">{plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
                </div>
                <Link href="/chat" className={`block text-center text-sm font-bold px-5 py-3 rounded-2xl transition-all mb-6 ${plan.ctaStyle}`}>
                  {plan.cta}
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-10">
            Sans engagement · Annulation à tout moment · Paiement sécurisé par Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
