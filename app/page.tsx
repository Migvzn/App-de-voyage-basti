import Hero from "@/components/Hero";
import Link from "next/link";
import { MessageSquare, Map, BarChart3, ArrowRight, Star, Check } from "lucide-react";
import { MOCK_DESTINATIONS } from "@/data/mock";
import { Logo } from "@/components/Logo";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Décrivez votre voyage",
    description: "Parlez-nous de votre destination, budget, dates et style de voyage en langage naturel. Pas de formulaires, pas de menus déroulants.",
  },
  {
    step: "02",
    icon: <Map className="w-6 h-6" />,
    title: "Recevez un plan personnalisé",
    description: "voyageo.ai génère instantanément un itinéraire complet avec vols, hôtels, restaurants, activités et un budget détaillé.",
  },
  {
    step: "03",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Réservez et partez",
    description: "Réservez en un clic via notre réseau de partenaires. voyageo.ai trouve les meilleures offres pour que vous dépensiez moins et viviez plus.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Londres, Royaume-Uni",
    avatar: "S",
    rating: 5,
    text: "voyageo.ai a planifié notre voyage de 2 semaines en Italie en moins de 3 minutes. Chaque restaurant recommandé était parfait. C'est l'avenir de la planification de voyage.",
  },
  {
    name: "Carlos R.",
    location: "Madrid, Espagne",
    avatar: "C",
    rating: 5,
    text: "J'étais sceptique sur la planification de voyage par IA, mais voyageo.ai s'y connaît vraiment. Les pépites cachées qu'il a trouvées à Tokyo, je ne les aurais jamais découvertes seul.",
  },
  {
    name: "Emma T.",
    location: "Berlin, Allemagne",
    avatar: "E",
    rating: 5,
    text: "J'ai économisé 40% sur mon voyage à Bali par rapport au devis d'une agence de voyage. Le détail du budget était incroyablement précis.",
  },
];

const PLANS = [
  {
    name: "Explorateur",
    price: "Gratuit",
    features: ["5 plans de voyage IA/mois", "Itinéraires basiques", "Calculateur de budget", "Support communauté"],
    cta: "Commencer gratuitement",
    highlight: false,
  },
  {
    name: "Voyageur",
    price: "12€",
    period: "/mois",
    features: ["Plans de voyage illimités", "Itinéraires IA complets", "Recherche hôtels & vols", "Support prioritaire", "Voyages sauvegardés"],
    cta: "Essai gratuit",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "49€",
    period: "/mois",
    features: ["Tout ce qu'inclut Voyageur", "Révision par expert humain", "Groupes jusqu'à 20 pers.", "Réservation accompagnée", "Support 24h/24"],
    cta: "Nous contacter",
    highlight: false,
  },
];

export default function HomePage() {
  const trending = MOCK_DESTINATIONS.filter(d => d.trending).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero */}
      <Hero />

      {/* Comment ça marche */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-200 rounded-full text-sm text-sky-600 mb-4">
            Comment ça marche
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Planifiez en minutes,<br />pas en heures</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            voyageo.ai combine l&apos;expertise IA avec des données de voyage en temps réel pour créer des itinéraires personnalisés qui correspondent exactement à ce que vous recherchez.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="relative p-6 bg-white border border-slate-200 rounded-2xl hover:border-sky-300 hover:shadow-md transition-all group">
              <div className="absolute top-6 right-6 text-5xl font-bold text-slate-100 group-hover:text-sky-50 transition-colors">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-50 border border-sky-200 rounded-xl flex items-center justify-center text-sky-500 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations tendance */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Destinations tendance</h2>
              <p className="text-slate-500 mt-1">Là où tout le monde va en ce moment</p>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 transition-colors"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map(dest => (
              <Link
                key={dest.id}
                href={`/chat?q=Planifie un voyage à ${dest.name}`}
                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-sky-100 to-blue-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">
                      {dest.name === "Rome" ? "🏛️" : dest.name === "Tokyo" ? "🗼" : dest.name === "Barcelona" ? "🏖️" : dest.name === "Santorini" ? "🌊" : dest.name === "Marrakech" ? "🕌" : "🌍"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-yellow-500">
                    <Star className="w-2.5 h-2.5 fill-yellow-400" />
                    {dest.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">{dest.name}</h3>
                  <p className="text-xs text-slate-400 mb-2">{dest.country}</p>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{dest.tagline}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Dès ~{dest.avgBudgetPerDay}€/jour</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Approuvé par des milliers de voyageurs</h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-slate-500 text-sm ml-2">4,9/5 parmi plus de 2 400 avis</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-24 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Tarifs simples et transparents</h2>
            <p className="text-slate-500 mt-3">Commencez gratuitement, évoluez quand vous en avez besoin.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 border ${
                  plan.highlight
                    ? "bg-gradient-to-br from-sky-50 to-blue-50 border-sky-300 shadow-md"
                    : "bg-white border-slate-200"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full text-xs font-semibold text-white shadow-sm shadow-sky-200">
                    Le plus populaire
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-400 text-sm mb-1">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-500">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/chat"
                  className={`block text-center w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 shadow-sm shadow-sky-200"
                      : "bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Prêt à voyager plus intelligemment ?
          </h2>
          <p className="text-slate-500 text-lg mb-10">
            Rejoignez plus de 50 000 voyageurs qui planifient leurs voyages avec voyageo.ai. Commencez gratuitement, sans carte bancaire.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-2xl hover:from-sky-600 hover:to-sky-700 transition-all text-lg shadow-lg shadow-sky-200"
          >
            Planifier mon voyage gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="md" />
          <div className="text-xs text-slate-400">
            © 2026 voyageo.ai. Propulsé par l&apos;IA. Tous droits réservés.
          </div>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Conditions</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
