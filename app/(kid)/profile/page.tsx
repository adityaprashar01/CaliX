"use client";

import { motion } from "framer-motion";
import { AvatarBadge } from "@/components/kid/AvatarBadge";
import { BottomNav } from "@/components/kid/BottomNav";
import { useKidStore } from "@/lib/store";

const styleEmojiMap = {
  striker: "🥊",
  balancer: "⚖️",
  mover: "🤸",
} as const;

export default function ProfilePage() {
  const { displayName, ageBucket, avatarColor, avatarStyle, goalType, totalXp, streakDays, completedSlugs, badgeSlugs } = useKidStore();

  return (
    <main className="min-h-screen px-4 pb-28 pt-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section
          className="rounded-[36px] bg-[var(--calix-ink)] px-5 py-6 text-white shadow-[var(--calix-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Athlete Card</div>
          <div className="mt-4 flex items-center gap-4">
            <AvatarBadge color={avatarColor} styleEmoji={styleEmojiMap[avatarStyle]} size={96} />
            <div>
              <h1 className="text-3xl font-black tracking-[-0.05em]">{displayName || "Aarav"}</h1>
              <p className="mt-2 text-sm leading-6 text-white/70">Age {ageBucket || "10-12"} • Goal: {goalType || "stronger"}</p>
            </div>
          </div>
        </motion.section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 text-center shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Total XP</div>
            <div className="mt-2 text-3xl font-black text-[var(--calix-accent)]">{totalXp}</div>
          </div>
          <div className="rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 text-center shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Streak</div>
            <div className="mt-2 text-3xl font-black text-[var(--calix-good)]">{streakDays}</div>
          </div>
          <div className="rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 text-center shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Quests</div>
            <div className="mt-2 text-3xl font-black text-[var(--calix-ink)]">{completedSlugs.length}</div>
          </div>
          <div className="rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 text-center shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Badges</div>
            <div className="mt-2 text-3xl font-black text-[var(--calix-mobility)]">{badgeSlugs.length}</div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--calix-line)] bg-white px-5 py-5 shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Club Identity</div>
          <p className="mt-3 text-sm leading-7 text-[var(--calix-ink)]/66">
            You&apos;re building a premium athlete profile — strong fundamentals, visible progression, and consistent streak energy.
          </p>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
