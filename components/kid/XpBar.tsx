"use client";

import { motion } from "framer-motion";

type XpBarProps = {
  current: number;
  max: number;
};

export function XpBar({ current, max }: XpBarProps) {
  const safeMax = Math.max(max, 1);
  const progress = Math.min((current / safeMax) * 100, 100);

  return (
    <div className="w-full rounded-full bg-white/70 p-1 shadow-inner">
      <div className="h-4 rounded-full bg-[var(--calix-soft)]">
        <motion.div
          className="h-4 rounded-full bg-[linear-gradient(90deg,var(--calix-accent),var(--calix-joy))]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[var(--calix-ink)]/70">
        <span>{current} XP</span>
        <span>{max} XP</span>
      </div>
    </div>
  );
}
