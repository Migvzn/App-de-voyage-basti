import Hero from "@/components/Hero";
import Link from "next/link";
import { MessageSquare, Map, BarChart3, ArrowRight, Star, Check } from "lucide-react";
import { MOCK_DESTINATIONS } from "@/data/mock";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Tell ILUR your trip",
    description: "Describe your destination, budget, dates, and travel style in plain language. No forms, no dropdowns.",
  },
  {
    step: "02",
    icon: <Map className="w-6 h-6" />,
    title: "Get a personalized plan",
    description: "ILUR instantly generates a full itinerary with flights, hotels, restaurants, activities, and a budget breakdown.",
  },
  {
    step: "03",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Book & go",
    description: "One-click booking through our partner network. ILUR finds the best deals so you spend less, experience more.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "London, UK",
    avatar: "S",
    rating: 5,
    text: "ILUR planned our 2-week Italy trip in under 3 minutes. Every restaurant recommendation was spot on. This is the future of travel planning.",
  },
  {
    name: "Carlos R.",
    location: "Madrid, Spain",
    avatar: "C",
    rating: 5,
    text: "I was skeptical about AI travel planning, but ILUR genuinely knows its stuff. The hidden gems it found in Tokyo I would never have discovered on my own.",
  },
  {
    name: "Emma T.",
    location: "Berlin, Germany",
    avatar: "E",
    rating: 5,
    text: "Saved 40% on my Bali trip compared to what a travel agent quoted me. The budget breakdown was incredibly detailed and accurate.",
  },
];

const PLANS = [
  {
    name: "Explorer",
    price: "Free",
    features: ["5 AI trip plans/month", "Basic itineraries", "Budget calculator", "Community support"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Voyager",
    price: "€12",
    period: "/month",
    features: ["Unlimited trip plans", "Full AI itineraries", "Hotel & flight search", "Priority support", "Saved trips & history"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "€49",
    period: "/month",
    features: ["Everything in Voyager", "Human travel expert review", "Group trips up to 20", "White-glove booking", "24/7 travel support"],
    cta: "Contact Us",
    highlight: false,
  },
];

export default function HomePage() {
  const trending = MOCK_DESTINATIONS.filter(d => d.trending).slice(0, 4);

  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero */}
      <Hero />

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-indigo-400 mb-4">
            How it works
          </div>
          <h2 className="text-4xl font-bold text-[#f5f5f5]">Plan trips in minutes,<br />not hours</h2>
          <p className="text-[#888888] mt-4 max-w-xl mx-auto">
            ILUR combines AI expertise with real-time travel data to create personalized itineraries that match exactly what you&apos;re looking for.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="relative p-6 bg-[#111111] border border-[#222222] rounded-2xl hover:border-indigo-500/30 transition-all group">
              <div className="absolute top-6 right-6 text-5xl font-bold text-[#1a1a1a] group-hover:text-[#1e1e2e] transition-colors">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2">{item.title}</h3>
              <p className="text-sm text-[#888888] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-20 px-4 sm:px-6 bg-[#080808] border-y border-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#f5f5f5]">Trending destinations</h2>
              <p className="text-[#888888] mt-1">Where everyone&apos;s going right now</p>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map(dest => (
              <Link
                key={dest.id}
                href={`/chat?q=Plan a trip to ${dest.name}`}
                className="group relative overflow-hidden rounded-2xl bg-[#111111] border border-[#222222] hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">
                      {dest.name === "Rome" ? "🏛️" : dest.name === "Tokyo" ? "🗼" : dest.name === "Barcelona" ? "🏖️" : dest.name === "Santorini" ? "🌊" : dest.name === "Marrakech" ? "🕌" : "🌍"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-[#0a0a0a]/80 rounded-full text-xs text-yellow-400">
                    <Star className="w-2.5 h-2.5 fill-yellow-400" />
                    {dest.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#f5f5f5] group-hover:text-indigo-400 transition-colors">{dest.name}</h3>
                  <p className="text-xs text-[#555555] mb-2">{dest.country}</p>
                  <p className="text-xs text-[#888888] leading-relaxed line-clamp-2">{dest.tagline}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-[#555555]">From ~€{dest.avgBudgetPerDay}/day</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#444444] group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#f5f5f5]">Trusted by travelers worldwide</h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-[#888888] text-sm ml-2">4.9/5 from 2,400+ reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-[#111111] border border-[#222222] rounded-2xl p-6 hover:border-[#333333] transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-[#888888] leading-relaxed mb-6">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#f5f5f5]">{t.name}</div>
                  <div className="text-xs text-[#555555]">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 bg-[#080808] border-t border-[#111111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#f5f5f5]">Simple, transparent pricing</h2>
            <p className="text-[#888888] mt-3">Start free, upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 border ${
                  plan.highlight
                    ? "bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/40"
                    : "bg-[#111111] border-[#222222]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-[#f5f5f5]">{plan.price}</span>
                    {plan.period && <span className="text-[#555555] text-sm mb-1">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#888888]">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/chat"
                  className={`block text-center w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90"
                      : "bg-[#1a1a1a] border border-[#333333] text-[#f5f5f5] hover:border-[#444444]"
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
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] mb-6">
            Ready to travel smarter?
          </h2>
          <p className="text-[#888888] text-lg mb-10">
            Join 50,000+ travelers who plan their trips with ILUR. Start free, no credit card required.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity text-lg shadow-2xl shadow-indigo-500/20"
          >
            Start Planning for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#111111] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">IL</span>
            </div>
            <span className="font-bold text-[#f5f5f5]">ILUR AI TRAVEL OS</span>
          </div>
          <div className="text-xs text-[#444444]">
            © 2025 ILUR. Built with AI. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-[#555555]">
            <a href="#" className="hover:text-[#888888] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#888888] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#888888] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
