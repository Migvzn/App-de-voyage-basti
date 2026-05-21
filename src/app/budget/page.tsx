"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Plus, Send, Wallet } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { BudgetDonut, BudgetTimeline } from "@/components/charts";
import { Button, Card, Chip, Progress } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import {
  actualTotal,
  autoCategorise,
  dailyCumulative,
  plannedTotal,
  rollupByCategory,
} from "@/lib/budget";
import { formatEUR } from "@/lib/utils";

const RATES: { code: string; rate: number; symbol: string }[] = [
  { code: "USD", rate: 1.09, symbol: "$" },
  { code: "GBP", rate: 0.85, symbol: "£" },
  { code: "JPY", rate: 168, symbol: "¥" },
  { code: "THB", rate: 39.5, symbol: "฿" },
];

export default function BudgetPage() {
  const { trips, addExpense } = useApp();
  const [tripId, setTripId] = useState(trips[0]?.id ?? "");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  const trip = trips.find((t) => t.id === tripId) ?? trips[0];

  const globalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const globalSpent = trips.reduce((s, t) => s + actualTotal(t.expenses), 0);

  const rollup = useMemo(() => rollupByCategory(trip.expenses), [trip]);
  const planned = plannedTotal(trip.expenses);
  const actual = actualTotal(trip.expenses);
  const timeline = useMemo(() => dailyCumulative(trip), [trip]);

  const donut = rollup.map((r) => ({
    name: r.category,
    value: r.planned || r.actual,
    color: r.color,
  }));

  const alerts = rollup.filter(
    (r) => r.planned > 0 && r.actual / r.planned >= 0.8,
  );

  const perPerson = Math.round((planned + actual) / trip.travelers);
  const previewCat = label.trim() ? autoCategorise(label) : null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(amount.replace(",", "."));
    if (!label.trim() || !amt || amt <= 0) return;
    addExpense(trip.id, {
      label: label.trim(),
      category: autoCategorise(label),
      amount: Math.round(amt),
      day: 1,
      planned: false,
    });
    setLabel("");
    setAmount("");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <PageHeader
          eyebrow="Argent"
          title="Budget intelligent"
          subtitle="Chaque euro suivi par catégorie, prévu vs réel, partagé entre amis."
        />

        {/* Global summary */}
        <Card className="mt-6 flex flex-wrap items-center gap-6 p-5">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted">Budget global · {trips.length} voyages</div>
            <div className="font-display text-2xl font-semibold text-ink">
              {formatEUR(globalBudget)}
            </div>
          </div>
          <div className="hidden h-10 w-px bg-line sm:block" />
          <div>
            <div className="text-xs text-muted">Déjà dépensé</div>
            <div className="font-display text-2xl font-semibold text-brand">
              {formatEUR(globalSpent)}
            </div>
          </div>
        </Card>

        {/* Trip selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          {trips.map((t) => (
            <button key={t.id} onClick={() => setTripId(t.id)}>
              <Chip active={t.id === trip.id} className="cursor-pointer px-4 py-1.5 text-sm">
                {t.title}
              </Chip>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* Donut */}
          <Card className="p-5">
            <h2 className="font-display text-lg font-semibold text-ink">
              Répartition — {trip.city}
            </h2>
            <BudgetDonut data={donut} total={trip.budget} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {rollup.map((r) => (
                <div key={r.category} className="flex items-center gap-2 text-xs">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: r.color }}
                  />
                  <span className="text-muted">{r.category}</span>
                  <span className="ml-auto font-medium text-ink">
                    {formatEUR(r.planned || r.actual)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Prévu vs réel
              </h2>
              <div className="flex gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#3D5A80]" /> Prévu
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Réel
                </span>
              </div>
            </div>
            <BudgetTimeline data={timeline} />
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xs text-muted">Prévu</div>
                <div className="font-semibold text-ink">{formatEUR(planned)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Réel</div>
                <div className="font-semibold text-brand">{formatEUR(actual)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Reste</div>
                <div className="font-semibold text-success">
                  {formatEUR(Math.max(0, trip.budget - actual))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5"
          >
            {alerts.map((a) => (
              <Card
                key={a.category}
                className="mb-3 flex items-start gap-3 border-brand/30 bg-brand/5 p-4"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="text-sm text-ink">
                  Tu as utilisé{" "}
                  <strong>
                    {Math.round((a.actual / a.planned) * 100)}%
                  </strong>{" "}
                  de ton budget <strong>{a.category}</strong>. Veux-tu que je
                  suggère des options moins chères pour la suite du voyage ?
                </p>
              </Card>
            ))}
          </motion.div>
        )}

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {/* Add expense */}
          <Card className="p-5 lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-ink">
              Ajouter une dépense
            </h2>
            <p className="mt-1 text-sm text-muted">
              L'IA range automatiquement chaque dépense dans la bonne catégorie.
            </p>
            <form onSubmit={submit} className="mt-3 flex flex-wrap gap-2">
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ex : Pastéis de nata x4"
                className="h-11 min-w-[180px] flex-1 rounded-2xl border border-line bg-[var(--elevated)] px-3.5 text-sm text-ink outline-none focus:border-brand/50"
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="decimal"
                placeholder="€"
                className="h-11 w-24 rounded-2xl border border-line bg-[var(--elevated)] px-3.5 text-sm text-ink outline-none focus:border-brand/50"
              />
              <Button type="submit">
                <Plus className="h-4 w-4" /> Ajouter
              </Button>
            </form>
            {previewCat && (
              <div className="mt-2 text-xs text-muted">
                Catégorie détectée : <Chip active>{previewCat}</Chip>
              </div>
            )}
            <div className="mt-4 space-y-1.5">
              {trip.expenses
                .filter((e) => !e.planned)
                .slice(-5)
                .reverse()
                .map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between rounded-xl bg-[var(--elevated)] px-3 py-2 text-sm"
                  >
                    <span className="text-ink">{e.label}</span>
                    <span className="flex items-center gap-2">
                      <Chip>{e.category}</Chip>
                      <span className="font-medium text-ink">
                        {formatEUR(e.amount)}
                      </span>
                    </span>
                  </div>
                ))}
            </div>
          </Card>

          {/* Split + currency */}
          <div className="space-y-5">
            <Card className="p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                Split entre amis
              </h2>
              <p className="mt-1 text-sm text-muted">
                {trip.travelers} voyageur{trip.travelers > 1 ? "s" : ""} ·{" "}
                {formatEUR(planned + actual)} au total
              </p>
              <div className="mt-3 rounded-2xl bg-[var(--elevated)] p-3 text-center">
                <div className="text-xs text-muted">Part par personne</div>
                <div className="font-display text-2xl font-semibold text-ink">
                  {formatEUR(perPerson)}
                </div>
              </div>
              <Button variant="secondary" className="mt-3 w-full">
                <Send className="h-4 w-4" /> Envoyer un lien de remboursement
              </Button>
            </Card>

            <Card className="p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                Conversion devises
              </h2>
              <div className="mt-3 space-y-2">
                {RATES.map((r) => (
                  <div
                    key={r.code}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted">{r.code}</span>
                    <span className="font-medium text-ink">
                      {r.symbol}
                      {Math.round(trip.budget * r.rate).toLocaleString("fr-FR")}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Day budget bars */}
        <Card className="mt-5 p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Budget par catégorie
          </h2>
          <div className="mt-3 space-y-3">
            {rollup.map((r) => {
              const target = r.planned || r.actual;
              const used = r.actual;
              return (
                <div key={r.category}>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink">{r.category}</span>
                    <span className="text-muted">
                      {formatEUR(used)} / {formatEUR(target)}
                    </span>
                  </div>
                  <Progress
                    value={target ? (used / target) * 100 : 0}
                    color={r.color}
                    className="mt-1.5"
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
