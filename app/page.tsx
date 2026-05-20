import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DESTINATIONS } from "@/lib/mock-data";
import { ArrowRight, Star, TrendingUp, Zap, Shield, Globe } from "lucide-react";

const MOODS = [
  { emoji: "🌊", label: "Plage & détente", query: "destination de plage relaxante" },
  { emoji: "🏛️", label: "Culture & histoire", query: "ville historique et culturelle" },
  { emoji: "🍕", label: "Gastronomie", query: "destination gastronomique" },
  { emoji: "🎒", label: "Aventure", query: "destination aventure et nature" },
  { emoji: "❤️", label: "Romance", query: "destination romantique en couple" },
  { emoji: "👨‍👩‍👧‍👦", label: "En famille", query: "destination idéale en famille" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Planification en 60 secondes",
    desc: "Décrivez votre envie, l'IA génère un itinéraire complet avec vols, hôtels et activités.",
    color: "bg-orange-50 text-[#FF5A3C]",
  },
  {
    icon: Shield,
    title: "Prix garantis honnêtes",
    desc: "Écart max 5% entre notre prix affiché et le prix réel. Sinon, on vous prévient.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Globe,
    title: "Tout en un seul endroit",
    desc: "Vols, Airbnb, restaurants, activités, budget partagé — plus besoin d'ouvrir d'autres onglets.",
    color: "bg-blue-50 text-blue-600",
  },
];

export default function HomePage() {
  const trending = DESTINATIONS.filter(d => d.trending).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-48 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/3 -left-32 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF5A3C] text-sm font-semibold px-4 py-2 rounded-full border border-orange-100 mb-8">
            <TrendingUp className="w-4 h-4" />
            Plus de 12 000 voyages planifiés ce mois
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-[#0A0A0A] leading-[1.05] mb-6 tracking-tight">
            Votre prochain voyage,<br />
            <span className="text-[#FF5A3C]">planifié en 60s</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Décrivez votre envie. L&apos;IA de Wanderly planifie tout — vols, hôtels, restos, activités, budget. Sans ouvrir un autre onglet.
          </p>

          {/* Search bar CTA */}
          <Link href="/chat" className="group block max-w-2xl mx-auto">
            <div className="flex items-center gap-4 bg-white border-2 border-gray-200 group-hover:border-[#FF5A3C]/30 rounded-2xl px-6 py-4 shadow-lg group-hover:shadow-xl transition-all cursor-text">
              <span className="text-2xl">✈️</span>
              <span className="flex-1 text-left text-gray-400 text-lg">
                &ldquo;Je veux partir au soleil en mars, budget 800€...&rdquo;
              </span>
              <div className="flex items-center gap-2 bg-[#FF5A3C] text-white rounded-xl px-4 py-2.5 text-sm font-semibold shrink-0 shadow-sm group-hover:bg-[#E8432A] transition-colors">
                Planifier
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Mood pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {MOODS.map((m) => (
              <Link
                key={m.label}
                href={`/chat?q=${encodeURIComponent(m.query)}`}
                className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-[#FF5A3C]/40 hover:bg-orange-50 text-sm text-gray-600 hover:text-[#FF5A3C] px-4 py-2 rounded-full transition-all"
              >
                <span>{m.emoji}</span>
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0A0A0A] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending destinations */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0A0A0A]">Destinations tendance</h2>
              <p className="text-gray-500 mt-1">Ce que les voyageurs Wanderly planifient en ce moment</p>
            </div>
            <Link href="/explore" className="hidden sm:flex items-center gap-1.5 text-[#FF5A3C] font-semibold text-sm hover:gap-2.5 transition-all">
              Tout explorer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((dest) => (
              <Link
                key={dest.id}
                href={`/chat?q=Planifie-moi un voyage à ${dest.name}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full border border-white/30 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {dest.rating}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-2xl mb-1">{dest.emoji}</div>
                  <div className="font-bold text-white text-xl">{dest.name}</div>
                  <div className="text-white/70 text-sm">{dest.country}</div>
                  <div className="mt-2 text-white/90 text-xs bg-white/20 backdrop-blur-sm inline-block px-2.5 py-1 rounded-full">
                    {dest.budgetPerDay.min}–{dest.budgetPerDay.max}€/jour
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">Comment ça marche</h2>
          <p className="text-gray-500 mb-14">Votre voyage planifié en 3 étapes</p>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-orange-200 to-orange-200" />

            {[
              { step: "1", emoji: "💬", title: "Décrivez votre envie", desc: "\"Sol, mer et bonne bouffe, 5 jours, 900€\" — l'IA comprend même les envies floues." },
              { step: "2", emoji: "🤖", title: "L'IA planifie tout", desc: "3 scénarios complets (éco/équilibré/premium) avec vols, hôtels, restos et activités." },
              { step: "3", emoji: "✅", title: "Réservez en 1 clic", desc: "Chaque élément est réservable directement. Votre voyage est sauvegardé et partageable." },
            ].map(({ step, emoji, title, desc }) => (
              <div key={step} className="relative">
                <div className="w-16 h-16 bg-[#FF5A3C] text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-orange-200 relative z-10">
                  {emoji}
                </div>
                <h3 className="font-bold text-[#0A0A0A] text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { number: "12 847", label: "voyages planifiés", emoji: "✈️" },
              { number: "98%", label: "de satisfaction", emoji: "⭐" },
              { number: "195", label: "pays couverts", emoji: "🌍" },
            ].map(({ number, label, emoji }) => (
              <div key={label} className="p-6">
                <div className="text-4xl mb-2">{emoji}</div>
                <div className="text-4xl font-bold text-[#0A0A0A] mb-1">{number}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center bg-[#0A0A0A] rounded-3xl p-12">
          <div className="text-5xl mb-4">✈️</div>
          <h2 className="text-3xl font-bold text-white mb-4">Votre prochain voyage vous attend</h2>
          <p className="text-gray-400 mb-8">Aucune carte bleue requise pour commencer. 3 voyages IA gratuits par mois.</p>
          <Link href="/chat" className="inline-flex items-center gap-2 bg-[#FF5A3C] hover:bg-[#E8432A] text-white font-bold px-8 py-4 rounded-2xl transition-all text-lg shadow-lg shadow-orange-900/30 hover:-translate-y-0.5">
            Planifier gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 font-bold text-[#0A0A0A]">
            <div className="w-6 h-6 bg-[#FF5A3C] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">W</span>
            </div>
            Wanderly
          </div>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-gray-600 transition-colors">Tarifs</Link>
            <Link href="/explore" className="hover:text-gray-600 transition-colors">Explorer</Link>
            <Link href="/community" className="hover:text-gray-600 transition-colors">Communauté</Link>
          </div>
          <p>© 2024 Wanderly. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
