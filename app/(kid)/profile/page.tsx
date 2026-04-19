"use client";

import { motion } from "framer-motion";
import { AvatarBadge } from "@/components/kid/AvatarBadge";
import { BottomNav } from "@/components/kid/BottomNav";
import { useKidStore } from "@/lib/store";

const styleEmojiMap = { striker: "🥊", balancer: "⚖️", mover: "🤸" } as const;
const gear = ["⚙️","🛡️","🔒","✨"] as const;

export default function ProfilePage() {
  const { displayName, avatarColor, avatarStyle, totalXp } = useKidStore();
  const level = Math.floor(totalXp / 100) + 1;

  return (
    <main className="min-h-screen px-4 pb-28 pt-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section className="rounded-[36px] bg-[var(--calix-ink)] px-5 py-6 text-white shadow-[var(--calix-shadow)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Master Rank</div>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Level {level} Ascension</h1>
          <div className="mt-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#ff4d82]/30 blur-2xl" />
              <div className="relative rounded-[32px] bg-[var(--calix-surface)] p-4 shadow-2xl">
                <AvatarBadge color={avatarColor} styleEmoji={styleEmojiMap[avatarStyle]} size={180} />
              </div>
              <div className="absolute -right-3 -top-3 rounded-full bg-[#f6d301] px-4 py-3 text-center text-[var(--calix-ink)] shadow-lg">
                <div className="text-[10px] font-black uppercase tracking-[0.18em]">Level</div>
                <div className="text-2xl font-black">{level}</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl font-black">{displayName || "Aarav"}</div>
            <div className="mt-1 text-sm text-white/68">Neon Pulse Hero</div>
          </div>
        </motion.section>

        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-[28px] bg-[var(--calix-surface)] p-4 shadow-sm"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Strength</div><div className="mt-2 text-3xl font-black text-[#ff4d82]">+15</div><div className="text-xs text-[var(--calix-ink)]/52">pts</div></div>
          <div className="rounded-[28px] bg-[var(--calix-surface)] p-4 shadow-sm"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Mobility</div><div className="mt-2 text-3xl font-black text-[var(--calix-accent)]">+20</div><div className="text-xs text-[var(--calix-ink)]/52">pts</div></div>
          <div className="rounded-[28px] bg-[var(--calix-surface)] p-4 shadow-sm"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Consistency</div><div className="mt-2 text-3xl font-black text-[#f6d301]">95%</div></div>
        </section>

        <section className="rounded-[32px] bg-[var(--calix-surface)] p-5 shadow-[var(--calix-shadow)]">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Unlocked Gear</div>
            <div className="text-xs font-black text-[var(--calix-ink)]/52">4/12</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {gear.map((item, index) => (
              <div key={item+index} className={`flex h-28 items-center justify-center rounded-[24px] ${index < 2 ? 'bg-white shadow-sm' : 'bg-[var(--calix-soft)]/70 opacity-65'}`}>
                <div className="text-5xl">{item}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
