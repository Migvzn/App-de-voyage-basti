import Link from "next/link";

const DESTINATIONS = [
  { nom: "Paris", pays: "France", emoji: "🗼", budget: "120€/jour", tags: ["Culture", "Gastronomie", "Romance"], image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop" },
  { nom: "Tokyo", pays: "Japon", emoji: "🗾", budget: "100€/jour", tags: ["Ultra-moderne", "Cuisine", "Technologie"], image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop" },
  { nom: "Lisbonne", pays: "Portugal", emoji: "🌊", budget: "80€/jour", tags: ["Soleil", "Culture", "Gastronomie"], image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=500&fit=crop" },
  { nom: "Bali", pays: "Indonésie", emoji: "🌴", budget: "60€/jour", tags: ["Nature", "Spiritualité", "Plages"], image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop" },
  { nom: "Rome", pays: "Italie", emoji: "🏛️", budget: "110€/jour", tags: ["Histoire", "Cuisine", "Art"], image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=500&fit=crop" },
  { nom: "Barcelone", pays: "Espagne", emoji: "🎨", budget: "100€/jour", tags: ["Art", "Plages", "Vie nocturne"], image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=500&fit=crop" },
  { nom: "Amsterdam", pays: "Pays-Bas", emoji: "🚲", budget: "120€/jour", tags: ["Culture", "Musées", "Canaux"], image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=500&fit=crop" },
  { nom: "Santorini", pays: "Grèce", emoji: "🌅", budget: "150€/jour", tags: ["Romance", "Plages", "Vues"], image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=500&fit=crop" },
  { nom: "Marrakech", pays: "Maroc", emoji: "🕌", budget: "50€/jour", tags: ["Culture", "Épices", "Artisanat"], image: "https://images.unsplash.com/photo-1539020140153-e479b8b22e78?w=800&h=500&fit=crop" },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-0.5">
          <span className="text-xl font-bold text-sky-500">voyageo</span>
          <span className="text-xl font-semibold text-slate-400">.ai</span>
        </Link>
        <Link href="/chat" className="bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors">
          Planifier →
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Explorer le monde</h1>
          <p className="text-slate-500 text-lg">Cliquez sur une destination pour que l'IA planifie votre voyage</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.nom}
              href={`/chat?q=Planifie-moi un voyage à ${d.nom}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt={d.nom}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="font-bold text-xl">{d.nom}</div>
                  <div className="text-white/80 text-sm">{d.pays}</div>
                </div>
                <div className="absolute top-3 right-3 text-3xl">{d.emoji}</div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-sky-600">{d.budget}</span>
                  <span className="text-xs text-slate-400">par personne</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {d.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-sky-500 font-medium group-hover:text-sky-600">
                  Planifier ce voyage →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
