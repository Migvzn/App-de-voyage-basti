"use client";

import { motion } from "framer-motion";

const PINS = [
  { top: "18%", left: "30%", c: "#FFD166" },
  { top: "34%", left: "72%", c: "#10B981" },
  { top: "62%", left: "24%", c: "#FF5A3C" },
  { top: "70%", left: "66%", c: "#3D5A80" },
  { top: "44%", left: "50%", c: "#C9325A" },
];

export function Globe() {
  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      {/* glow */}
      <div className="absolute inset-6 rounded-full bg-brand/25 blur-3xl" />

      {/* sphere */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full poster-grain"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 25%, #FF8A5B, #FF5A3C 45%, #C9325A 80%, #5B2A86)",
          boxShadow: "inset -28px -28px 60px rgba(0,0,0,0.35)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* meridians */}
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <div
            key={deg}
            className="absolute inset-0 rounded-full border border-white/15"
            style={{ transform: `rotateY(70deg) rotate(${deg}deg)` }}
          />
        ))}
        {[20, 50, 80].map((t) => (
          <div
            key={t}
            className="absolute inset-x-0 border-t border-white/15"
            style={{ top: `${t}%` }}
          />
        ))}
      </motion.div>

      {/* destination pins */}
      {PINS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-3 w-3 rounded-full ring-4 ring-white/30"
          style={{ top: p.top, left: p.left, background: p.c }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* orbiting satellite */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-ink shadow-lift" />
      </motion.div>
    </div>
  );
}
