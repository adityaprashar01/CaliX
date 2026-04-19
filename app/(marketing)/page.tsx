"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const emojis = ["💪", "⚖️", "🤸", "🌳"] as const;

export default function LandingPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % emojis.length);
    }, 1200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--calix-bg)] px-6 text-center">
      <motion.h1
        className="text-6xl font-extrabold tracking-tight text-[var(--calix-ink)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        CaliX
      </motion.h1>
      <motion.p
        className="mt-3 text-xl font-semibold text-[var(--calix-accent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Build Your Base
      </motion.p>
      <div className="mt-8 flex h-32 w-32 items-center justify-center rounded-[28px] bg-white shadow-lg">
        <AnimatePresence mode="wait">
          <motion.span
            key={emojis[index]}
            className="text-7xl"
            initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.7, rotate: 12, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {emojis[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-6 max-w-xs text-sm leading-6 text-[var(--calix-ink)]/65">
        India&apos;s first digital calisthenics platform for kids, with journeys for both children and parents.
      </p>
      <Link
        href="/role-select"
        className="mt-10 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--calix-accent)] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
      >
        Next
      </Link>
    </main>
  );
}
