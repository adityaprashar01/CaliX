"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BottomNav } from "@/components/kid/BottomNav";
import { useKidStore } from "@/lib/store";

const squad = [
  { name: "Maya", streak: 7, specialty: "Balance Ace", emoji: "⚖️" },
  { name: "Kabir", streak: 5, specialty: "Core Blaster", emoji: "💪" },
  { name: "Zoya", streak: 4, specialty: "Mobility Rocket", emoji: "🤸" },
] as const;

export default function FriendsPage() {
  const { displayName, streakDays } = useKidStore();

  return (
    <main className="min-h-screen px-4 pb-28 pt-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section
          className="rounded-[36px] bg-[var(--calix-ink)] px-5 py-5 text-white shadow-[var(--calix-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Club Squad</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">Train with your crew</h1>
          <p className="mt-3 text-sm leading-6 text-white/72">
            {displayName || "Aarav"}, your current streak is {streakDays}. Friendly momentum makes showing up easier.
          </p>
        </motion.section>

        <section className="grid gap-3">
          {squad.map((friend, index) => (
            <motion.article
              key={friend.name}
              className="rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 shadow-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--calix-soft)] text-3xl">
                    {friend.emoji}
                  </div>
                  <div>
                    <div className="text-lg font-black text-[var(--calix-ink)]">{friend.name}</div>
                    <div className="text-sm text-[var(--calix-ink)]/58">{friend.specialty}</div>
                  </div>
                </div>
                <div className="rounded-[20px] bg-white px-3 py-2 text-center shadow-sm">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Streak</div>
                  <div className="mt-1 text-xl font-black text-[var(--calix-accent)]">{friend.streak}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        <Link
          href="/quest/quick-core-battle"
          className="flex items-center justify-between rounded-[32px] bg-white px-5 py-4 shadow-[var(--calix-shadow)]"
        >
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Challenge</div>
            <div className="mt-1 text-lg font-black text-[var(--calix-ink)]">Start a squad sprint</div>
            <div className="text-sm text-[var(--calix-ink)]/58">Launch Quick Core Battle and race your own best time.</div>
          </div>
          <div className="text-2xl">→</div>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
