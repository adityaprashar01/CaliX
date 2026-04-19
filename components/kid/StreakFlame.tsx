"use client";

import { motion } from "framer-motion";

type StreakFlameProps = {
  streak: number;
};

export function StreakFlame({ streak }: StreakFlameProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-bold text-[var(--calix-ink)] shadow-sm"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <span aria-hidden="true">🔥</span>
      <span>{streak}</span>
    </motion.div>
  );
}
