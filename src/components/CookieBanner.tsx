"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/primitives";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("wanderly-consent")) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "all" | "essential") {
    try {
      localStorage.setItem("wanderly-consent", value);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-md rounded-3xl border border-line bg-[var(--surface)] p-5 shadow-lift lg:left-auto lg:right-5 lg:mx-0"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--elevated)] text-brand">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">On respecte ta vie privée</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Wanderly utilise des cookies pour mémoriser tes préférences. Tu
                gardes le contrôle —{" "}
                <Link href="/privacy" className="text-brand underline underline-offset-2">
                  politique de confidentialité
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => decide("essential")}>
              Essentiels
            </Button>
            <Button size="sm" className="flex-1" onClick={() => decide("all")}>
              Tout accepter
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
