# 🌍 Wanderly

**La plateforme de voyage tout-en-un.** L'utilisateur arrive avec une envie
floue (« je veux partir au soleil en mars, budget 800 € ») et repart avec un
voyage entièrement planifié, budgété et réservable — sans jamais ouvrir un
autre onglet.

Wanderly réunit dans une seule interface ce que faisaient Skyscanner, Airbnb,
TheFork, GetYourGuide, TripAdvisor, Polarsteps et Splitwise.

---

## ✨ Ce qui est inclus

| Page | Rôle |
|---|---|
| `/` | Landing — hero animé (globe 3D), barre de recherche IA |
| `/onboarding` | Profil voyageur en 60 secondes (3 écrans) |
| `/chat` | Concierge IA plein écran avec cartes riches inline |
| `/explore` | Découverte — tendances, deals du jour, filtres par mood |
| `/map` | Carte du monde **gamifiée** (pays colorés selon l'exploration) |
| `/budget` | Dashboard budget — donut, timeline prévu/réel, split, devises |
| `/community` | Avis, récits, feed style Instagram du voyage |
| `/profile` | Niveaux, XP, ~30 badges, points, abonnement, historique |
| `/pricing` | Free / Explorer / Globetrotter + système de points |
| `/trip/[id]` | Itinéraire jour par jour + budget temps réel |
| `/privacy` | RGPD — cookies, droits, droit à l'oubli |

**API** : `POST /api/chat` (concierge) · `POST /api/search/unified`
(agrégation vols + logements + restos + activités).

---

## 🧱 Stack technique

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** — transitions de page, micro-interactions, confettis level-up
- **Recharts** — donut budget + timeline dépenses
- **react-simple-maps** — carte du monde choroplèthe (aucun token requis)
- **Zustand** — état applicatif (voyages, profil, XP)
- **lucide-react** — iconographie unique
- **@anthropic-ai/sdk** — concierge Claude (optionnel)

> Choix volontaire : **react-simple-maps** plutôt que Mapbox — la carte
> gamifiée fonctionne sans clé d'API ni token. La fonte du fond de carte
> (`public/world-110m.json`) est servie en local.

---

## 🚀 Démarrage en 5 minutes

```bash
# 1. Installer les dépendances
npm install

# 2. (optionnel) copier les variables d'environnement
cp .env.example .env.local

# 3. Lancer en développement
npm run dev        # http://localhost:3000

# build de production
npm run build && npm start
```

**L'application tourne sans aucune clé d'API.** Tout est mocké de façon
réaliste — 12 destinations, vols/logements/restos/activités générés, 3 voyages
démo pré-remplis. Chaque clé du fichier `.env.example` active une intégration
réelle (Claude, Supabase, Stripe, APIs de recherche, Redis…).

---

## 🤖 Le concierge IA

- **Sans `ANTHROPIC_API_KEY`** : moteur concierge déterministe
  (`src/lib/concierge.ts`) — détecte destination / budget / mood, pose
  ≤ 3 questions, propose 3 scénarios complets (éco / équilibré / premium).
- **Avec clé** : la prose vient de **Claude** (`claude-sonnet-4-6` par défaut,
  prompt caching activé) ; les cartes restent issues de la recherche
  structurée → **jamais de prix halluciné**.

Choisir un scénario dans le chat crée un vrai voyage et redirige vers
`/trip/[id]`.

---

## 🗄️ Base de données

Le schéma PostgreSQL complet est dans **`supabase/schema.sql`** :
`profiles`, `user_preferences`, `trips`, `trip_items`, `expenses`,
`bookings`, `reviews`, `badges`, `user_badges`, `points_ledger`,
`subscriptions`, `visited_countries` — avec Row Level Security.

```bash
# via la CLI Supabase
supabase db push
# ou : coller le contenu dans l'éditeur SQL Supabase
```

Les 3 voyages démo sont définis dans `src/lib/mock-data.ts` (et en commentaire
SQL dans le schéma).

---

## 🎮 Gamification

- **Niveaux** : Backpacker → Explorer → Wanderer → Globetrotter → Legend
- **XP** : nuit en nouveau pays, activité validée, avis avec photos, continent
  débloqué… (`src/lib/gamification.ts`)
- **Carte** : chaque pays se colore selon `exploration % =` villes/villes
  majeures + jours + activités
- **Badges** : ~30 badges, animation confettis au passage de niveau

---

## 📁 Structure

```
src/
  app/            # routes (App Router) + API
  components/     # AppShell, cartes, chat, charts, carte du monde…
  lib/            # types, mock-data, concierge, gamification, budget, store
public/
  world-110m.json # fond de carte (world-atlas)
supabase/
  schema.sql      # schéma Postgres complet + RLS
```

---

## ☁️ Déploiement Vercel

Le projet se déploie tel quel sur Vercel (framework détecté
automatiquement). Renseigne les variables d'environnement souhaitées dans le
dashboard Vercel — sans elles, le mode démo mocké reste pleinement
fonctionnel.

---

## 📝 Notes d'implémentation

- Les visuels sont des **affiches éditoriales en dégradé** (rendu garanti,
  zéro image cassée). Câbler `UNSPLASH_ACCESS_KEY` pour basculer en
  photographie réelle.
- L'état applicatif est **en mémoire** (Zustand) pour une démo sans
  configuration : les 3 voyages démo sont toujours présents ; brancher
  Supabase pour la persistance.
- Mode sombre complet, structure i18n FR/EN en place, bannière cookies RGPD,
  skeleton screens, animations respectant `prefers-reduced-motion`.
