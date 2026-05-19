'use client';
import { motion } from 'framer-motion';
import { BudgetBreakdown as BudgetBreakdownType } from '@/types';

interface BudgetCategory {
  key: string;
  label: string;
  emoji: string;
  montant: number;
  couleur: string;
  couleurBarre: string;
}

interface BudgetBreakdownProps {
  budget: BudgetBreakdownType;
  prevu?: BudgetBreakdownType;
}

export function BudgetBreakdown({ budget, prevu }: BudgetBreakdownProps) {
  const categories: BudgetCategory[] = [
    { key: 'flights', label: 'Vols', emoji: '✈️', montant: budget.flights, couleur: '#0ea5e9', couleurBarre: 'bg-sky-500' },
    { key: 'accommodation', label: 'Hébergement', emoji: '🏨', montant: budget.accommodation, couleur: '#06b6d4', couleurBarre: 'bg-cyan-500' },
    { key: 'food', label: 'Restaurants', emoji: '🍽️', montant: budget.food, couleur: '#10b981', couleurBarre: 'bg-emerald-500' },
    { key: 'activities', label: 'Activités', emoji: '🎟️', montant: budget.activities, couleur: '#f59e0b', couleurBarre: 'bg-amber-500' },
    { key: 'transport', label: 'Transports locaux', emoji: '🚆', montant: budget.transport, couleur: '#8b5cf6', couleurBarre: 'bg-violet-500' },
    { key: 'shopping', label: 'Shopping', emoji: '🛍️', montant: ((budget as unknown) as Record<string, number>).shopping || 0, couleur: '#ec4899', couleurBarre: 'bg-pink-500' },
    { key: 'misc', label: 'Imprévus', emoji: '💼', montant: budget.misc, couleur: '#64748b', couleurBarre: 'bg-slate-400' },
  ].filter(c => c.montant > 0);

  const totalCalcule = categories.reduce((s, c) => s + c.montant, 0);
  const budgetTotal = budget.total || totalCalcule;

  // Donut SVG
  const rayon = 70;
  const circonference = 2 * Math.PI * rayon;
  let decalage = 0;
  const arcs = categories.map(cat => {
    const pct = cat.montant / budgetTotal;
    const arc = { pct, decalage, longueur: pct * circonference, couleur: cat.couleur };
    decalage += pct * circonference;
    return arc;
  });

  const indicateur = budget.total > (prevu?.total || budget.total * 1.1)
    ? { label: '🔴 Dépassement', cls: 'text-red-500 bg-red-50 border-red-200' }
    : budget.total > (prevu?.total || budget.total) * 0.9
    ? { label: '🟡 Attention', cls: 'text-amber-500 bg-amber-50 border-amber-200' }
    : { label: '🟢 Dans le budget', cls: 'text-emerald-600 bg-emerald-50 border-emerald-200' };

  const tips = [
    "💡 Réservez vos vols 2 mois à l'avance pour économiser jusqu'à 30%",
    "💡 Les hôtels en dehors du centre historique coûtent souvent 40% moins cher",
    "💡 Mangez là où mangent les locaux — meilleur et moins cher",
    "💡 Achetez un pass transport journalier plutôt que des tickets unitaires",
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Budget détaillé</h3>
          <p className="text-sm text-slate-500 mt-0.5">Répartition complète de vos dépenses</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-sky-600 border border-slate-200 hover:border-sky-300 rounded-lg px-3 py-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimer
          </button>
        </div>
      </div>

      {/* Indicateur budget */}
      <div className={`inline-flex items-center gap-2 text-sm font-medium border rounded-full px-3 py-1 ${indicateur.cls}`}>
        {indicateur.label}
      </div>

      {/* Donut + totaux */}
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Donut SVG */}
        <div className="relative flex-shrink-0">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r={rayon} fill="none" stroke="#f1f5f9" strokeWidth="20" />
            {arcs.map((arc, i) => (
              <motion.circle
                key={i}
                cx="90" cy="90" r={rayon}
                fill="none"
                stroke={arc.couleur}
                strokeWidth="20"
                strokeDasharray={`${arc.longueur} ${circonference}`}
                strokeDashoffset={-arc.decalage}
                strokeLinecap="butt"
                style={{ transformOrigin: '90px 90px', transform: 'rotate(-90deg)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">{budgetTotal.toLocaleString('fr-FR')}€</span>
            <span className="text-xs text-slate-500">Total</span>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="flex-1 grid grid-cols-2 gap-3 w-full">
          <div className="bg-sky-50 rounded-xl p-3 border border-sky-100">
            <p className="text-xs text-sky-600 font-medium">Par jour</p>
            <p className="text-xl font-bold text-sky-700 mt-0.5">{budget.perDay?.toLocaleString('fr-FR') || Math.round(budgetTotal / 7)}€</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="text-xs text-emerald-600 font-medium">Par personne</p>
            <p className="text-xl font-bold text-emerald-700 mt-0.5">{budget.perPerson?.toLocaleString('fr-FR') || budgetTotal}€</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 col-span-2">
            <p className="text-xs text-slate-500 font-medium">Devise</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5">Euro (€)</p>
          </div>
        </div>
      </div>

      {/* Barres par catégorie */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Répartition par catégorie</h4>
        {categories.map((cat, i) => {
          const pct = Math.round((cat.montant / budgetTotal) * 100);
          const parJour = Math.round(cat.montant / 7);
          return (
            <div key={cat.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span>{cat.emoji}</span>
                  {cat.label}
                </span>
                <span className="flex items-center gap-3 text-slate-600">
                  <span className="text-xs text-slate-400">{parJour}€/jour</span>
                  <span className="font-semibold text-slate-900">{cat.montant.toLocaleString('fr-FR')}€</span>
                  <span className="text-xs bg-slate-100 rounded px-1.5 py-0.5 w-10 text-center">{pct}%</span>
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${cat.couleurBarre} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparaison prévu vs réel si dispo */}
      {prevu && (
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Prévu vs Réel</h4>
          <div className="flex gap-4 text-sm">
            <div className="flex-1">
              <p className="text-slate-500">Budget prévu</p>
              <p className="text-lg font-bold text-slate-900">{prevu.total.toLocaleString('fr-FR')}€</p>
            </div>
            <div className="flex-1">
              <p className="text-slate-500">Budget réel</p>
              <p className={`text-lg font-bold ${budget.total > prevu.total ? 'text-red-500' : 'text-emerald-600'}`}>
                {budget.total.toLocaleString('fr-FR')}€
              </p>
            </div>
            <div className="flex-1">
              <p className="text-slate-500">Écart</p>
              <p className={`text-lg font-bold ${budget.total > prevu.total ? 'text-red-500' : 'text-emerald-600'}`}>
                {budget.total > prevu.total ? '+' : ''}{(budget.total - prevu.total).toLocaleString('fr-FR')}€
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips intelligents */}
      <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 space-y-2">
        <h4 className="text-sm font-semibold text-sky-700">Conseils d&apos;optimisation</h4>
        {tips.map((tip, i) => (
          <p key={i} className="text-sm text-sky-600">{tip}</p>
        ))}
      </div>
    </div>
  );
}

export default BudgetBreakdown;
