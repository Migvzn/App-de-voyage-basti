import Link from "next/link";

const destinations = [
  { nom: "Paris", emoji: "🗼", desc: "La ville lumière" },
  { nom: "Tokyo", emoji: "🗾", desc: "Ultra-moderne & tradition" },
  { nom: "Lisbonne", emoji: "🌊", desc: "Soleil & pastéis de nata" },
  { nom: "Bali", emoji: "🌴", desc: "Spiritualité & plages" },
  { nom: "Rome", emoji: "🏛️", desc: "Histoire éternelle" },
  { nom: "Barcelone", emoji: "🎨", desc: "Art & vie nocturne" },
];

const etapes = [
  { num: "1", titre: "Décrivez votre voyage", desc: "Dites-moi où vous voulez aller, votre budget, vos envies. Comme avec un ami expert." },
  { num: "2", titre: "L'IA planifie tout", desc: "Itinéraire jour par jour, hôtels, restaurants, activités, budget détaillé — en quelques secondes." },
  { num: "3", titre: "Partez l'esprit libre", desc: "Votre voyage est prêt. Réservez en un clic, modifiez à tout moment." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span className="text-xl font-bold text-sky-500">voyageo</span>
            <span className="text-xl font-semibold text-slate-400">.ai</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm text-slate-600 hover:text-sky-500 transition-colors hidden sm:block">Explorer</Link>
            <Link href="/chat" className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
              Planifier un voyage →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 text-sm font-medium px-4 py-2 rounded-full border border-sky-100 mb-8">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
            Agent IA disponible 24h/24
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 leading-tight mb-6">
            Votre agent<br />
            <span className="text-sky-500">de voyage IA</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Décrivez votre voyage idéal. L'IA génère un itinéraire complet avec vols, hôtels, restaurants et activités — en quelques secondes.
          </p>

          {/* Fake input → redirige vers chat */}
          <Link href="/chat" className="block max-w-2xl mx-auto">
            <div className="flex items-center gap-4 bg-white border-2 border-slate-200 hover:border-sky-300 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all cursor-text group">
              <span className="text-2xl">✈️</span>
              <span className="text-slate-400 group-hover:text-slate-500 text-lg flex-1 text-left transition-colors">
                "Un week-end romantique à Lisbonne, budget 800€..."
              </span>
              <div className="bg-sky-500 text-white rounded-xl px-4 py-2 text-sm font-medium shrink-0">
                Planifier →
              </div>
            </div>
          </Link>

          <p className="text-sm text-slate-400 mt-4">Essayez : Tokyo, Bali, Rome, Barcelone, Amsterdam...</p>
        </div>
      </section>

      {/* Destinations tendance */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Destinations tendance</h2>
          <p className="text-slate-500 text-center mb-10">Les endroits que nos voyageurs adorent en ce moment</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((d) => (
              <Link
                key={d.nom}
                href={`/chat?q=Planifie-moi un voyage à ${d.nom}`}
                className="bg-white rounded-2xl p-5 text-center border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-3">{d.emoji}</div>
                <div className="font-semibold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">{d.nom}</div>
                <div className="text-xs text-slate-400 mt-1">{d.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">Comment ça marche</h2>
          <p className="text-slate-500 text-center mb-14">Simple comme parler à un ami</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {etapes.map((e) => (
              <div key={e.num} className="text-center">
                <div className="w-14 h-14 bg-sky-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-lg shadow-sky-200">
                  {e.num}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">{e.titre}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-sky-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à partir ?</h2>
          <p className="text-sky-100 mb-8 text-lg">Votre prochain voyage est à une conversation de distance.</p>
          <Link href="/chat" className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-8 py-4 rounded-2xl hover:bg-sky-50 transition-colors text-lg shadow-lg">
            Commencer maintenant ✈️
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-baseline gap-0.5">
            <span className="font-bold text-sky-500">voyageo</span>
            <span className="text-slate-400">.ai</span>
          </div>
          <p>Planification de voyages propulsée par l'IA</p>
        </div>
      </footer>
    </div>
  );
}
