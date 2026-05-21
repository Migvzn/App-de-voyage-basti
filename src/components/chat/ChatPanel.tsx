"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import {
  ActivityCard,
  FlightCard,
  RestaurantCard,
  ScenarioCard,
  StayCard,
} from "@/components/cards";
import { Button } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import { findDestinationByText } from "@/lib/mock-data";
import { createTrip } from "@/lib/mock-data";
import { XP_EVENTS } from "@/lib/gamification";
import { uid } from "@/lib/utils";
import type {
  Activity,
  ChatCard,
  ChatMessage,
  Flight,
  Restaurant,
  ScenarioCard as ScenarioData,
  Stay,
} from "@/lib/types";

/* ── Rich text (paragraphs + **bold**) ─────────────────────── */

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className={i > 0 ? "mt-2.5" : ""}>
          {para.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold text-ink">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <span key={j}>{part}</span>
            ),
          )}
        </p>
      ))}
    </>
  );
}

/* ── Typewriter assistant message ──────────────────────────── */

function AssistantMessage({
  message,
  onChoose,
  onBook,
}: {
  message: ChatMessage;
  onChoose: (card: ScenarioData) => void;
  onBook: () => void;
}) {
  const [shown, setShown] = useState(0);
  const done = shown >= message.text.length;

  useEffect(() => {
    if (done) return;
    const step = Math.max(2, Math.ceil(message.text.length / 55));
    const id = setInterval(() => {
      setShown((s) => {
        const next = s + step;
        if (next >= message.text.length) clearInterval(id);
        return next;
      });
    }, 22);
    return () => clearInterval(id);
  }, [message.text, done]);

  const scenarios = (message.cards ?? []).filter((c) => c.kind === "scenario");
  const items = (message.cards ?? []).filter((c) => c.kind !== "scenario");

  return (
    <div className="flex gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-2xl bg-brand text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="inline-block max-w-2xl rounded-3xl rounded-tl-md border border-line bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-muted">
          <RichText text={message.text.slice(0, shown)} />
        </div>

        {done && (message.cards?.length ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 space-y-3"
          >
            {scenarios.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {scenarios.map((c, i) => {
                  const s = c.data as ScenarioData;
                  return (
                    <ScenarioCard
                      key={i}
                      scenario={s}
                      highlight={s.tier === "balanced"}
                      onChoose={() => onChoose(s)}
                    />
                  );
                })}
              </div>
            )}
            {items.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((c, i) => (
                  <CardSwitch key={i} card={c} onBook={onBook} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {done && (message.suggestions?.length ?? 0) > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" data-suggestions>
            {message.suggestions!.map((s) => (
              <SuggestionChip key={s} text={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CardSwitch({ card, onBook }: { card: ChatCard; onBook: () => void }) {
  switch (card.kind) {
    case "flight":
      return <FlightCard flight={card.data as Flight} onBook={onBook} />;
    case "stay":
      return <StayCard stay={card.data as Stay} onBook={onBook} />;
    case "restaurant":
      return <RestaurantCard restaurant={card.data as Restaurant} onBook={onBook} />;
    case "activity":
      return <ActivityCard activity={card.data as Activity} onBook={onBook} />;
    default:
      return null;
  }
}

/* Suggestion chip — dispatches a click into the composer */
function SuggestionChip({ text }: { text: string }) {
  return (
    <button
      data-suggestion={text}
      className="rounded-full border border-line bg-[var(--surface)] px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand/40 hover:text-ink"
    >
      {text}
    </button>
  );
}

/* ── Panel ─────────────────────────────────────────────────── */

export function ChatPanel({ seed }: { seed?: string }) {
  const router = useRouter();
  const { addXp, addTrip } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || pending) return;
    const userMsg: ChatMessage = { id: uid("m"), role: "user", text: clean };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          id: uid("m"),
          role: "assistant",
          text: data.text ?? "Désolé, je n'ai pas pu répondre.",
          cards: data.cards,
          suggestions: data.suggestions,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: uid("m"),
          role: "assistant",
          text: "Connexion interrompue — réessaie dans un instant.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;
    if (seed) send(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChoose(s: ScenarioData) {
    const dest = findDestinationByText(s.city);
    if (!dest) return;
    const trip = createTrip(dest.id, s.tier);
    addTrip(trip);
    addXp(XP_EVENTS.tripPlanned);
    router.push(`/trip/${trip.id}`);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:h-screen">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-brand text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Concierge Wanderly</div>
          <div className="text-xs text-muted">
            Proactif · 3 questions max · prix réels
          </div>
        </div>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        onClick={(e) => {
          const t = (e.target as HTMLElement).closest("[data-suggestion]");
          if (t) send(t.getAttribute("data-suggestion") ?? "");
        }}
        className="flex-1 space-y-5 overflow-y-auto px-5 py-6"
      >
        {messages.length === 0 && !pending && <EmptyState onPick={send} />}

        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-lg rounded-3xl rounded-tr-md bg-brand px-4 py-3 text-sm text-white">
                {m.text}
              </div>
            </div>
          ) : (
            <AssistantMessage
              key={m.id}
              message={m}
              onChoose={handleChoose}
              onBook={() => addXp(XP_EVENTS.tripBooked)}
            />
          ),
        )}

        <AnimatePresence>
          {pending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 rounded-3xl rounded-tl-md border border-line bg-[var(--surface)] px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-muted"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* composer */}
      <div className="border-t border-line p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mx-auto flex max-w-3xl items-end gap-2 rounded-3xl border border-line bg-[var(--surface)] p-2 shadow-soft focus-within:border-brand/50"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Décris ton envie de voyage…"
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-muted"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || pending}
            className="h-10 w-10 shrink-0 rounded-2xl p-0"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  const ideas = [
    "Je veux du soleil en mars, budget 800 €",
    "Un week-end culture à Rome",
    "10 jours d'aventure au Japon",
    "Une escapade food pas chère",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-xl py-10 text-center"
    >
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-brand text-white">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
        Raconte-moi ton envie
      </h2>
      <p className="mt-1.5 text-sm text-muted">
        Une ville, une ambiance, un budget — je m'occupe du reste et te rends un
        voyage complet.
      </p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {ideas.map((idea) => (
          <button
            key={idea}
            onClick={() => onPick(idea)}
            className="rounded-2xl border border-line bg-[var(--surface)] px-4 py-3 text-left text-sm text-muted transition-colors hover:border-brand/40 hover:text-ink"
          >
            {idea}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
