"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";
import { useApp } from "@/lib/store";
import { levelFromXp, levelName } from "@/lib/gamification";

const CONFETTI = ["#FF5A3C", "#FFD166", "#10B981", "#3D5A80", "#C9325A"];

export function XpToast() {
  const { lastXpGain, profile, clearXpGain } = useApp();

  useEffect(() => {
    if (lastXpGain == null) return;
    const before = levelFromXp(profile.xp - lastXpGain);
    const after = levelFromXp(profile.xp);
    const ms = after > before ? 3600 : 2400;
    const tmo = setTimeout(clearXpGain, ms);
    return () => clearTimeout(tmo);
  }, [lastXpGain, profile.xp, clearXpGain]);

  if (lastXpGain == null) return null;
  const before = levelFromXp(profile.xp - lastXpGain);
  const after = levelFromXp(profile.xp);
  const levelUp = after > before;

  return (
    <AnimatePresence>
      {levelUp ? (
        <motion.div
          key="levelup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/55 backdrop-blur-sm"
        >
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2.5 w-2.5 rounded-[2px]"
              style={{ background: CONFETTI[i % CONFETTI.length] }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: (Math.random() - 0.5) * 620,
                y: (Math.random() - 0.5) * 620,
                opacity: 0,
                rotate: Math.random() * 540,
              }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
          ))}
          <motion.div
            initial={{ scale: 0.7, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="card mx-6 max-w-sm p-8 text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand text-white">
              <Trophy className="h-8 w-8" />
            </div>
            <div className="mt-4 text-xs font-medium uppercase tracking-widest text-muted">
              Niveau supérieur
            </div>
            <div className="font-display text-3xl font-semibold text-ink">
              Niveau {after}
            </div>
            <div className="mt-1 text-sm text-muted">
              Tu es désormais <strong className="text-brand">{levelName(after)}</strong>.
              <br />+{lastXpGain} XP
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed left-1/2 top-5 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-ink px-4 py-2.5 text-sm font-semibold text-[var(--canvas)] shadow-lift"
        >
          <Sparkles className="h-4 w-4 text-brand-soft" />
          +{lastXpGain} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}
