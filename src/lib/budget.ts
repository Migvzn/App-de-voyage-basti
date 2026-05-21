import type { BudgetCategory, Expense, Trip } from "./types";

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  "Vols",
  "Hébergement",
  "Restos",
  "Activités",
  "Transport",
  "Shopping",
  "Imprévus",
];

export const CATEGORY_COLORS: Record<BudgetCategory, string> = {
  Vols: "#3D5A80",
  Hébergement: "#FF5A3C",
  Restos: "#FFB463",
  Activités: "#10B981",
  Transport: "#5B2A86",
  Shopping: "#C9325A",
  Imprévus: "#9A9A92",
};

export interface CategoryRollup {
  category: BudgetCategory;
  planned: number;
  actual: number;
  color: string;
}

export function rollupByCategory(expenses: Expense[]): CategoryRollup[] {
  return BUDGET_CATEGORIES.map((category) => {
    const rows = expenses.filter((e) => e.category === category);
    return {
      category,
      planned: rows.filter((e) => e.planned).reduce((s, e) => s + e.amount, 0),
      actual: rows.filter((e) => !e.planned).reduce((s, e) => s + e.amount, 0),
      color: CATEGORY_COLORS[category],
    };
  }).filter((r) => r.planned > 0 || r.actual > 0);
}

export function plannedTotal(expenses: Expense[]): number {
  return expenses.filter((e) => e.planned).reduce((s, e) => s + e.amount, 0);
}

export function actualTotal(expenses: Expense[]): number {
  return expenses.filter((e) => !e.planned).reduce((s, e) => s + e.amount, 0);
}

/** Cumulative spend (planned vs actual) per trip day — for the timeline. */
export function dailyCumulative(trip: Trip): {
  day: number;
  planned: number;
  actual: number;
}[] {
  const out: { day: number; planned: number; actual: number }[] = [];
  let p = 0;
  let a = 0;
  for (let day = 1; day <= trip.days; day++) {
    const dayExp = trip.expenses.filter((e) => e.day === day);
    p += dayExp.filter((e) => e.planned).reduce((s, e) => s + e.amount, 0);
    a += dayExp.filter((e) => !e.planned).reduce((s, e) => s + e.amount, 0);
    out.push({ day, planned: p, actual: a });
  }
  return out;
}

/** Heuristic auto-categorisation for manually-added expenses. */
export function autoCategorise(label: string): BudgetCategory {
  const t = label.toLowerCase();
  if (/vol|avion|flight|easyjet|ryanair/.test(t)) return "Vols";
  if (/hôtel|hotel|airbnb|nuit|logement|riad|auberge/.test(t)) return "Hébergement";
  if (/resto|restaurant|dîner|diner|déjeuner|dejeuner|café|cafe|bar|pastel|tapas|snack|food|brunch/.test(t))
    return "Restos";
  if (/musée|musee|visite|billet|tour|excursion|activité|activite|spectacle|entrée|entree/.test(t))
    return "Activités";
  if (/taxi|métro|metro|bus|train|uber|location|essence|transport|tram/.test(t))
    return "Transport";
  if (/shopping|souvenir|boutique|marché|marche|vêtement|vetement|cadeau/.test(t))
    return "Shopping";
  return "Imprévus";
}
