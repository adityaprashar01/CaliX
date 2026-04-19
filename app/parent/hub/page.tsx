"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useKidStore } from "@/lib/store";
import { demoWeek, demoWeekStats } from "@/lib/data/demoWeek";
import { SafetyGauge } from "@/components/parent/SafetyGauge";
import { ActivityChart } from "@/components/parent/ActivityChart";

export default function ParentHubPage() {
  const { totalXp, streakDays } = useKidStore();
  const level = Math.floor(totalXp / 100) + 1;
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    const fallback = `Aarav had a solid week — ${demoWeekStats.completions} quests completed and ${demoWeekStats.totalMinutes} active minutes, keeping a ${demoWeekStats.streakDays}-day streak. Safety score stays strong at 9.8/10. This week's focus is core stability, which is the foundation for all future movement. Recommended next: try the Balance Beginner quest together tomorrow to build coordination alongside strength.`;

    const timeout = setTimeout(() => { if (!summary) setSummary(fallback); }, 2500);

    fetch("/api/ai/parent-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childName: "Aarav", weekStats: demoWeekStats }),
    })
      .then((r) => r.json())
      .then((d: { summary: string }) => setSummary(d.summary))
      .catch(() => setSummary(fallback));

    return () => clearTimeout(timeout);
  }, [summary]);

  return (
    <main className="min-h-screen bg-calix-soft px-4 pb-8 pt-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-calix-ink">Aarav&apos;s Progress</h1>
            <p className="text-sm text-calix-ink/60">Level {level} &bull; Streak {streakDays} days</p>
          </div>
          <SafetyGauge score={9.8} />
        </div>

        <div className="mt-3 flex gap-4 text-center text-sm">
          <div className="flex-1 rounded-xl bg-white p-3 shadow-sm"><p className="text-lg font-bold text-calix-good">92%</p><p className="text-xs text-calix-ink/60">Consistency</p></div>
          <div className="flex-1 rounded-xl bg-white p-3 shadow-sm"><p className="text-lg font-bold text-calix-accent">9.8</p><p className="text-xs text-calix-ink/60">Safety</p></div>
          <div className="flex-1 rounded-xl bg-white p-3 shadow-sm"><p className="text-lg font-bold text-calix-ink">{totalXp}</p><p className="text-xs text-calix-ink/60">Total XP</p></div>
        </div>
      </motion.div>

      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-calix-ink/70">Activity Minutes</h3>
        <ActivityChart data={demoWeek} />
      </div>

      <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="mb-2 font-serif text-sm font-semibold text-calix-ink/70">This Week&apos;s Focus</h3>
        {summary ? (
          <motion.p className="font-serif text-sm leading-relaxed text-calix-ink/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{summary}</motion.p>
        ) : (
          <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-3 animate-pulse rounded bg-calix-soft" style={{ width: `${90 - i * 15}%` }} />)}</div>
        )}
      </div>

      <div className="mt-4 rounded-2xl bg-calix-accent/5 p-4 shadow-sm">
        <p className="text-sm font-semibold text-calix-ink">Recommended: Balance Beginner</p>
        <p className="text-xs text-calix-ink/60">Build coordination alongside strength</p>
      </div>

      <div className="mt-4 rounded-2xl border border-calix-ink/10 bg-white/50 p-4 text-center">
        <p className="text-sm text-calix-ink/50">Upgrade to CaliX+ — ₹500/mo</p>
      </div>
    </main>
  );
}
