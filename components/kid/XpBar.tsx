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
    <div className="rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-2 shadow-[var(--calix-shadow)] backdrop-blur-sm">
      <div className="h-4 overflow-hidden rounded-full bg-[rgba(49,89,255,0.08)]">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#5f7cff_55%,#ffcf54_100%)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--calix-ink)]/55">
        <span>{current} XP</span>
        <span>{max} XP</span>
      </div>
    </div>
  );
}
