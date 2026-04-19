"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useKidStore } from "@/lib/store";
import { quests } from "@/lib/data/quests";
import { demoWeek } from "@/lib/data/demoWeek";
import { XpBar } from "@/components/kid/XpBar";
import { StreakFlame } from "@/components/kid/StreakFlame";
import { BottomNav } from "@/components/kid/BottomNav";
import { ActivityChart } from "@/components/parent/ActivityChart";

export default function HubPage() {
  const { displayName, totalXp, streakDays, completedSlugs } = useKidStore();
  const level = Math.floor(totalXp / 100) + 1;
  const xpInLevel = totalXp % 100;
  const nextQuest = quests.find((q) => !completedSlugs.includes(q.slug)) ?? quests[0]!;

  return (
    <main className="min-h-screen bg-calix-bg px-4 pb-24 pt-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-2 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold text-calix-ink">Hi, {displayName || "Hero"}!</h1>
          <span className="rounded-full bg-calix-accent/10 px-3 py-1 text-sm font-semibold text-calix-accent">Level {level}</span>
        </div>
        <XpBar current={xpInLevel} max={100} />
        <p className="mt-1 text-xs text-calix-ink/50">{xpInLevel}/100 XP to Level {level + 1}</p>
      </motion.div>

      <Link href={`/quest/${nextQuest.slug}`} className="mx-auto mt-8 block">
        <motion.div className="mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-full bg-calix-accent shadow-xl" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span className="text-4xl">⚡</span>
          <span className="mt-1 text-lg font-bold text-white">QUICK QUEST</span>
          <span className="text-sm text-white/80">3 min</span>
        </motion.div>
      </Link>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm"><StreakFlame streak={streakDays} /><span className="mt-1 text-xs text-calix-ink/60">Streak</span></div>
        <div className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm"><span className="text-2xl font-bold text-calix-accent">{totalXp}</span><span className="mt-1 text-xs text-calix-ink/60">Total XP</span></div>
        <div className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm"><span className="text-2xl font-bold text-calix-good">{completedSlugs.length}</span><span className="mt-1 text-xs text-calix-ink/60">Completed</span></div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-calix-ink/70">This Week</h3>
        <ActivityChart data={demoWeek} />
      </div>
      <BottomNav />
    </main>
  );
}
