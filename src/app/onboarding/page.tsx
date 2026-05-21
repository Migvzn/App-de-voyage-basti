"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Mic,
  Mountain,
  Sparkles,
  Sun,
  UtensilsCrossed,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { DestinationCard } from "@/components/cards";
import { Button } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import { DESTINATIONS } from "@/lib/mock-data";
import { formatEUR } from "@/lib/utils";
import type { Mood } from "@/lib/types";

const TYPES: { mood: Mood; label: string; icon: typeof Sun; grad: string }[] = [
  { mood: "chill", label: "Chill", icon: Sun, grad: "linear-gradient(135deg,#FFC15E,#FF7A60)" },
  { mood: "adventure", label: "Aventure", icon: Mountain, grad: "linear-gradient(135deg,#06A77D,#3D5A80)" },
  { mood: "culture", label: "Culture", icon: Compass, grad: "linear-gradient(135deg,#5B2A86,#C9325A)" },
  { mood: "foodie", label: "Foodie", icon: UtensilsCrossed, grad: "linear-gradient(135deg,#FF8A5B,#C9325A)" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setMoods, setTypicalBudget } = useApp();
  const [step, setStep] = useState(0);
  const [where, setWhere] = useState("");
  const [picked, setPicked] = useState<Mood[]>([]);
  const [budget, setBudget] = useState(900);

  const total = 4;

  function toggleMood(m: Mood) {
    setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  }

  function finish() {
    setMoods(picked.length ? picked : ["chill", "culture"]);
    setTypicalBudget(budget);
    setStep(3);
  }

  const suggestions = DESTINATIONS.filter(
    (d) =>
      (picked.length === 0 || d.moods.some((m) => picked.includes(m))) &&
      d.avgBudget5d <= budget * 1.6,
  )
    .sort(
      (a, b) =>
        Math.abs(a.avgBudget5d - budget) - Math.abs(b.avgBudget5d - budget),
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
        <Logo />
        <Link href="/" className="text-sm text-muted hover:text-ink">
          Passer
        </Link>
      </header>

      {/* Progress */}
      <div className="mx-auto max-w-2xl px-5">
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-brand" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-10">
        <AnimatePresence mode="wait">
          {/* Step 0 — destination */}
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display text-3xl font-semibold text-ink">
                Où veux-tu aller ?
              </h1>
              <p className="mt-2 text-muted">
                Une ville, un pays, ou juste une vibe. Aucune mauvaise réponse.
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-3xl border border-line bg-[var(--surface)] p-2 focus-within:border-brand/50">
                <input
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  placeholder="Lisbonne, le Japon, du soleil…"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  aria-label="Saisie vocale"
                  className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--elevated)] text-brand"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>
              <Button className="mt-6 w-full" size="lg" onClick={() => setStep(1)}>
                Continuer <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 1 — traveller type */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display text-3xl font-semibold text-ink">
                Quel voyageur es-tu ?
              </h1>
              <p className="mt-2 text-muted">
                Choisis-en autant que tu veux — ça affine nos suggestions.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {TYPES.map((t) => {
                  const active = picked.includes(t.mood);
                  return (
                    <button
                      key={t.mood}
                      onClick={() => toggleMood(t.mood)}
                      className={`relative overflow-hidden rounded-3xl border p-5 text-left transition-all ${
                        active
                          ? "border-brand ring-2 ring-brand"
                          : "border-line hover:border-brand/40"
                      }`}
                    >
                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                        style={{ background: t.grad }}
                      >
                        <t.icon className="h-6 w-6" />
                      </div>
                      <div className="mt-3 font-display text-lg font-semibold text-ink">
                        {t.label}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="secondary" size="lg" onClick={() => setStep(0)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button className="flex-1" size="lg" onClick={() => setStep(2)}>
                  Continuer <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2 — budget */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display text-3xl font-semibold text-ink">
                Ton budget pour 5 jours ?
              </h1>
              <p className="mt-2 text-muted">
                Tout compris : vol, logement, restos, activités.
              </p>
              <div className="mt-8 text-center">
                <div className="font-display text-5xl font-semibold text-brand">
                  {formatEUR(budget)}
                </div>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={50}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-6 w-full accent-brand"
              />
              <div className="flex justify-between text-xs text-muted">
                <span>200 €</span>
                <span>5 000 €</span>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="secondary" size="lg" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button className="flex-1" size="lg" onClick={finish}>
                  <Sparkles className="h-4 w-4" /> Construire mon profil
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — result */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-brand text-white">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
                  Ton profil est prêt
                </h1>
                <p className="mt-2 text-muted">
                  Voici 3 voyages taillés pour toi
                  {where.trim() ? ` — inspirés de « ${where.trim()} »` : ""}.
                </p>
              </div>
              <div className="mt-6 grid gap-5">
                {suggestions.map((d, i) => (
                  <DestinationCard key={d.id} destination={d} index={i} />
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Link href="/explore" className="flex-1">
                  <Button variant="secondary" size="lg" className="w-full">
                    Explorer plus
                  </Button>
                </Link>
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() =>
                    router.push(
                      `/chat?q=${encodeURIComponent(
                        where.trim() || suggestions[0]?.city || "Surprends-moi",
                      )}`,
                    )
                  }
                >
                  Planifier maintenant <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
