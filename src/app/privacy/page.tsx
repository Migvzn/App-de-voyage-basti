"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Trash2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button, Card } from "@/components/ui/primitives";

const SECTIONS = [
  {
    title: "Données que nous collectons",
    body: "Email (à la réservation uniquement), préférences de voyage, historique de recherches et de réservations. Aucune création de compte n'est requise avant de réserver ou de sauvegarder un voyage.",
  },
  {
    title: "Comment nous les utilisons",
    body: "Uniquement pour personnaliser tes suggestions, suivre ton budget et faire vivre ta carte du monde. Nous ne vendons jamais tes données à des tiers.",
  },
  {
    title: "Cookies",
    body: "Cookies essentiels (thème, langue, session) toujours actifs. Cookies de mesure d'audience optionnels — tu choisis via la bannière de consentement.",
  },
  {
    title: "Tes droits (RGPD)",
    body: "Accès, rectification, portabilité et effacement de tes données à tout moment. Délai de réponse : 30 jours maximum.",
  },
];

export default function PrivacyPage() {
  const [forgotten, setForgotten] = useState(false);

  function forgetMe() {
    try {
      localStorage.clear();
    } catch {
      /* ignore */
    }
    setForgotten(true);
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
        <Logo />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Accueil
        </Link>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-8">
        <div className="flex items-center gap-2 text-brand">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Confidentialité
          </span>
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
          Ta vie privée, notre priorité
        </h1>
        <p className="mt-2 text-muted">
          Wanderly est conçu pour collecter le strict minimum. Voici exactement ce
          que nous faisons de tes données.
        </p>

        <div className="mt-6 space-y-4">
          {SECTIONS.map((s) => (
            <Card key={s.title} className="p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                {s.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-4 border-brand/30 bg-brand/5 p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Droit à l'oubli
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Efface immédiatement toutes les données stockées sur cet appareil
            (préférences, thème, consentement).
          </p>
          {forgotten ? (
            <p className="mt-3 text-sm font-medium text-success">
              Données locales effacées. Tu peux fermer cette page.
            </p>
          ) : (
            <Button className="mt-3" variant="secondary" onClick={forgetMe}>
              <Trash2 className="h-4 w-4" /> Effacer mes données
            </Button>
          )}
        </Card>

        <p className="mt-6 text-xs text-muted">
          Une question ? Écris-nous à privacy@wanderly.app — réponse sous 30 jours.
        </p>
      </div>
    </div>
  );
}
