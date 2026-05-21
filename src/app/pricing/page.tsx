"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Button, Card, Chip } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import type { UserProfile } from "@/lib/types";

const PLANS: {
  id: UserProfile["plan"];
  name: string;
  monthly: number;
  tagline: string;
  features: string[];
  popular?: boolean;
}[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    tagline: "Pour tester l'expérience Wanderly.",
    features: [
      "3 voyages planifiés par IA / mois",
      "Recherches vols & logements illimitées",
      "Budget basique par voyage",
      "Carte du monde gamifiée",
    ],
  },
  {
    id: "explorer",
    name: "Explorer",
    monthly: 9.99,
    tagline: "Pour les voyageurs réguliers.",
    popular: true,
    features: [
      "Voyages planifiés par IA illimités",
      "Alertes prix en temps réel",
      "Budget intelligent + split entre amis",
      "50 points offerts chaque mois",
    ],
  },
  {
    id: "globetrotter",
    name: "Globetrotter",
    monthly: 19.99,
    tagline: "L'expérience concierge complète.",
    features: [
      "Tout Explorer, sans limite",
      "Concierge IA prioritaire (Claude Opus)",
      "Réservations sans frais de service",
      "200 points / mois · support 24/7",
    ],
  },
];

export default function PricingPage() {
  const { profile, upgradePlan } = useApp();
  const [annual, setAnnual] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  function choose(id: UserProfile["plan"]) {
    upgradePlan(id);
    setDone(id);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-5 py-8">
        <PageHeader
          eyebrow="Abonnement"
          title="Un plan pour chaque voyageur"
          subtitle="Change ou annule quand tu veux. Paiement sécurisé via Stripe."
        />

        {/* Billing toggle */}
        <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-line bg-[var(--surface)] p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !annual ? "bg-brand text-white" : "text-muted"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              annual ? "bg-brand text-white" : "text-muted"
            }`}
          >
            Annuel −20%
          </button>
        </div>

        {/* Plans */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = annual ? plan.monthly * 0.8 : plan.monthly;
            const isCurrent = profile.plan === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card
                  className={`relative flex h-full flex-col p-6 ${
                    plan.popular ? "ring-2 ring-brand" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
                      Le plus populaire
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="font-display text-4xl font-semibold text-ink">
                      {price === 0
                        ? "0 €"
                        : price.toFixed(2).replace(".", ",") + " €"}
                    </span>
                    {price > 0 && (
                      <span className="mb-1 text-sm text-muted">/ mois</span>
                    )}
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-muted">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full"
                    variant={plan.popular ? "primary" : "secondary"}
                    disabled={isCurrent}
                    onClick={() => choose(plan.id)}
                  >
                    {isCurrent
                      ? "Plan actuel"
                      : done === plan.id
                        ? "Activé ✓"
                        : plan.monthly === 0
                          ? "Choisir Free"
                          : "Passer à " + plan.name}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stripe trust strip */}
        <Card className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 p-5 text-sm text-muted">
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-brand" /> Paiement Stripe — CB,
            Apple Pay, Google Pay
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" /> Authentification 3-D
            Secure
          </span>
          <span className="flex items-center gap-2">
            <Chip>Système de crédits</Chip> 1 point = 0,10 € de cashback
          </span>
        </Card>

        {done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-sm text-success"
          >
            Abonnement mis à jour. En production, Stripe Checkout gère le paiement
            (succès / échec / 3DS) avant l'activation.
          </motion.p>
        )}
      </div>
    </AppShell>
  );
}
