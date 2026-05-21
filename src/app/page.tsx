"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Compass,
  Globe2,
  PieChart,
  Search,
  Sparkles,
  Trophy,
  Wand2,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Globe } from "@/components/Globe";
import { DestinationCard } from "@/components/cards";
import { Button } from "@/components/ui/primitives";
import { DESTINATIONS } from "@/lib/mock-data";

const QUICK = [
  "Le soleil en mars, budget 800 €",
  "Un week-end culture à Rome",
  "10 jours au Japon en automne",
  "Plage et chill, pas trop cher",
];

const FEATURES = [
  {
    icon: Wand2,
    title: "Un concierge qui anticipe",
    body: "Décris une envie floue. L'IA pose 3 questions max, puis propose 3 voyages complets, réservables en un clic.",
  },
  {
    icon: Search,
    title: "Recherche unifiée",
    body: "Vols, logements, restos et activités cherchés en parallèle, classés par rapport qualité-prix.",
  },
  {
    icon: PieChart,
    title: "Budget intelligent",
    body: "Chaque euro suivi par catégorie. Alertes proactives quand tu dérapes, split entre amis intégré.",
  },
  {
    icon: Globe2,
    title: "Carte du monde gamifiée",
    body: "Chaque pays se colore selon ton exploration. 195 pays, 6 continents — combien en as-tu débloqués ?",
  },
];

const STEPS = [
  { n: "01", t: "Tu décris une envie", d: "« Je veux du soleil en mars pour 800 € »" },
  { n: "02", t: "L'IA planifie tout", d: "Vols, logement, restos, activités, budget — en quelques secondes." },
  { n: "03", t: "Tu réserves, tu pars", d: "Un clic par réservation. Le voyage se construit tout seul." },
];

export default function LandingPage() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function go(query: string) {
    router.push(`/chat?q=${encodeURIComponent(query || "Surprends-moi")}`);
  }

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-line bg-[var(--canvas)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "/explore", label: "Explorer" },
              { href: "/map", label: "Carte" },
              { href: "/community", label: "Communauté" },
              { href: "/pricing", label: "Abonnement" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-2xl px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-[var(--elevated)] hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/onboarding">
              <Button size="sm">Commencer</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-[#3D5A80]/15 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-muted"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Wanderly · ton concierge de voyage par IA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl"
            >
              Ton prochain voyage,{" "}
              <span className="text-brand">planifié en une phrase.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-4 max-w-md text-base leading-relaxed text-muted"
            >
              Dis-nous une envie floue. Wanderly te rend un voyage complet — vols,
              logement, restos, activités, budget — sans jamais ouvrir un autre onglet.
            </motion.p>

            {/* Search bar */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              onSubmit={(e) => {
                e.preventDefault();
                go(q);
              }}
              className="mt-6 flex items-center gap-2 rounded-3xl border border-line bg-[var(--surface)] p-2 shadow-soft focus-within:border-brand/50"
            >
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Je veux partir au soleil en mars, budget 800 €"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-muted"
              />
              <Button type="submit" className="shrink-0">
                Planifier
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.form>

            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((s) => (
                <button
                  key={s}
                  onClick={() => go(s)}
                  className="rounded-full border border-line bg-[var(--surface)] px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand/40 hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center"
          >
            <Globe />
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Sept apps de voyage. Une seule.
        </h2>
        <p className="mt-2 max-w-xl text-muted">
          Wanderly remplace Skyscanner, Airbnb, TheFork, GetYourGuide, Polarsteps et
          Splitwise — dans une interface qu'un enfant comprend en 5 secondes.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-3xl border border-line bg-[var(--surface)] p-5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--elevated)] text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mx-auto max-w-6xl px-5 py-6">
        <div className="rounded-3xl border border-line bg-[var(--surface)] p-8">
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="font-display text-4xl font-semibold text-brand/30">
                  {s.n}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {s.t}
                </h3>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending destinations ── */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Tendances du moment
            </h2>
            <p className="mt-2 text-muted">Des idées prêtes à planifier en un clic.</p>
          </div>
          <Link
            href="/explore"
            className="hidden items-center gap-1 text-sm font-medium text-brand hover:underline sm:flex"
          >
            Tout explorer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.filter((d) => d.trending)
            .slice(0, 6)
            .map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-brand p-10 text-center text-white poster-grain">
          <div className="relative">
            <Trophy className="mx-auto h-10 w-10" />
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Prêt à débloquer le monde ?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-white/85">
              Gagne de l'XP à chaque voyage, colore ta carte du monde, monte les niveaux.
              L'onboarding prend 60 secondes.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/onboarding">
                <Button size="lg" variant="secondary" className="bg-white text-ink">
                  Créer mon profil voyageur
                  <Compass className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  Parler à l'assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex flex-wrap gap-4">
            <Link href="/explore" className="hover:text-ink">Explorer</Link>
            <Link href="/pricing" className="hover:text-ink">Abonnement</Link>
            <Link href="/community" className="hover:text-ink">Communauté</Link>
            <Link href="/privacy" className="hover:text-ink">Confidentialité</Link>
          </div>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> © {new Date().getFullYear()} Wanderly
          </span>
        </div>
      </footer>
    </div>
  );
}
