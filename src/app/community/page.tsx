"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ImagePlus, MapPin, MessageCircle, Sparkles, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { PosterCover } from "@/components/PosterCover";
import { Button, Card, Chip } from "@/components/ui/primitives";
import { useApp } from "@/lib/store";
import { XP_EVENTS } from "@/lib/gamification";

const TAGS = ["#romantic", "#solo", "#familyfriendly", "#foodie", "#adventure", "#budget"];

const FEED = [
  {
    id: "p1",
    author: "Camille",
    level: 22,
    city: "Lisbonne",
    country: "Portugal",
    gradient: "linear-gradient(135deg,#FFB463,#FF5A3C 70%,#C9325A)",
    icon: "waves",
    rating: 5,
    text: "Tram 28 au lever du soleil, pastéis encore tièdes, et un coucher de soleil depuis le Miradouro da Senhora do Monte. Lisbonne en mars, c'est exactement la dose de soleil qu'il fallait.",
    tags: ["#romantic", "#foodie"],
    likes: 248,
    comments: 31,
  },
  {
    id: "p2",
    author: "Yanis",
    level: 41,
    city: "Tokyo",
    country: "Japon",
    gradient: "linear-gradient(135deg,#5B2A86,#C9325A 70%,#FF5A3C)",
    icon: "building2",
    rating: 5,
    text: "10 jours, 3 quartiers, 0 minute d'ennui. teamLab Planets vaut chaque centime. Conseil : réservez le ramen d'Ichiran avant 11h pour éviter la file.",
    tags: ["#solo", "#adventure"],
    likes: 512,
    comments: 64,
  },
  {
    id: "p3",
    author: "Inès",
    level: 16,
    city: "Marrakech",
    country: "Maroc",
    gradient: "linear-gradient(135deg,#FF8A5B,#C9325A 70%,#7A2E2E)",
    icon: "sun",
    rating: 4,
    text: "Riad parfait, souks intenses, et une nuit dans le désert d'Agafay sous les étoiles. Wanderly avait bloqué le dîner au Jardin — excellent appel.",
    tags: ["#familyfriendly", "#budget"],
    likes: 187,
    comments: 22,
  },
];

function Stars({
  value,
  onChange,
}: {
  value: number;
  onChange?: (n: number) => void;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          disabled={!onChange}
        >
          <Star
            className={`h-5 w-5 ${
              n <= value ? "fill-brand text-brand" : "text-line"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function CommunityPage() {
  const { addXp } = useApp();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [posted, setPosted] = useState(false);

  function aiDraft() {
    setText(
      "Trois jours à Rome qui filent trop vite. Le Colisée en visite coupe-file le matin, une carbonara mémorable chez Roscioli le soir, et des ruelles du Trastevere à perte de vue. Wanderly avait calé chaque étape pile au bon moment.",
    );
    setRating(5);
    setTags(["#romantic", "#foodie"]);
  }

  function publish() {
    if (!text.trim()) return;
    setPosted(true);
    addXp(XP_EVENTS.reviewWithPhotos);
    setText("");
    setTags([]);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-5 py-8">
        <PageHeader
          eyebrow="Communauté"
          title="Récits & avis de voyageurs"
          subtitle="Partage tes voyages, inspire les autres, gagne de l'XP."
        />

        {/* Compose */}
        <Card className="mt-6 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              Écrire un avis
            </h2>
            <Stars value={rating} onChange={setRating} />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Raconte ton expérience…"
            className="mt-3 w-full resize-none rounded-2xl border border-line bg-[var(--elevated)] p-3 text-sm text-ink outline-none focus:border-brand/50"
          />
          <button
            onClick={aiDraft}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" />
            L'IA pré-rédige ton avis sur ton dernier voyage
          </button>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() =>
                  setTags((p) =>
                    p.includes(t) ? p.filter((x) => x !== t) : [...p, t],
                  )
                }
              >
                <Chip active={tags.includes(t)} className="cursor-pointer">
                  {t}
                </Chip>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
              <ImagePlus className="h-4 w-4" /> Ajouter des photos
            </button>
            <Button onClick={publish} disabled={!text.trim()}>
              Publier (+{XP_EVENTS.reviewWithPhotos} XP)
            </Button>
          </div>
          {posted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs text-success"
            >
              Avis publié — merci de faire vivre la communauté !
            </motion.p>
          )}
        </Card>

        {/* Feed */}
        <div className="mt-6 space-y-5">
          {FEED.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Card className="overflow-hidden">
                <div className="flex items-center gap-3 p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand font-display text-sm font-semibold text-white">
                    {post.author.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      {post.author}{" "}
                      <span className="text-xs font-normal text-muted">
                        · niv. {post.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <MapPin className="h-3 w-3" /> {post.city}, {post.country}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Stars value={post.rating} />
                  </div>
                </div>
                <PosterCover
                  gradient={post.gradient}
                  iconKey={post.icon}
                  label={post.city}
                  sublabel={post.country}
                  rounded="rounded-none"
                  className="h-48"
                />
                <div className="p-4">
                  <p className="text-sm leading-relaxed text-muted">{post.text}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-5 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <Heart className="h-4 w-4" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="h-4 w-4" /> {post.comments}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
