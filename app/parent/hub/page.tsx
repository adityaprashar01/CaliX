"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ActivityChart } from "@/components/parent/ActivityChart";
import { SafetyGauge } from "@/components/parent/SafetyGauge";
import { demoWeek, demoWeekTotals } from "@/lib/data/demoWeek";
import { useKidStore, useParentStore } from "@/lib/store";

const FALLBACK_CONSISTENCY = 92;

export default function ParentHubPage() {
  const { childName } = useParentStore();
  const kidState = useKidStore();
  const [summary, setSummary] = useState<string | null>(null);

  const weekStats = useMemo(
    () => ({ completions: 5, totalMinutes: demoWeekTotals.totalMinutes, streakDays: kidState.streakDays || 5 }),
    [kidState.streakDays],
  );

  useEffect(() => {
    const fallback = `${childName} had a solid week — ${weekStats.completions} quests completed and ${weekStats.totalMinutes} active minutes, keeping a ${weekStats.streakDays}-day streak. Safety score stays strong at 9.8/10. This week's focus is core stability, which is the foundation for all future movement. Recommended next: try the Balance Beginner quest together tomorrow to build coordination alongside strength.`;
    const timeout = window.setTimeout(() => setSummary((current) => current ?? fallback), 2500);

    void fetch("/api/ai/parent-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childName, weekStats }),
    })
      .then(async (response) => response.json() as Promise<{ summary: string }>)
      .then((payload) => setSummary(payload.summary || fallback))
      .catch(() => setSummary(fallback));

    return () => window.clearTimeout(timeout);
  }, [childName, weekStats]);

  const level = Math.floor((kidState.totalXp || 285) / 100) + 1;

  return (
    <main className="min-h-screen px-4 pb-10 pt-8 text-[var(--calix-ink)]">
      <div className="mx-auto max-w-3xl">
        <motion.section className="rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] px-5 py-5 shadow-[var(--calix-shadow)] backdrop-blur-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Coach View</div>
              <h1 className="mt-2 font-serif text-3xl font-bold tracking-[-0.03em]">{childName}&apos;s Progress</h1>
              <p className="mt-3 text-sm leading-7 text-[var(--calix-ink)]/62">Level {level} • Consistency {FALLBACK_CONSISTENCY}% • Safety 9.8/10. This view is designed to feel calm, premium, and reassuring.</p>
            </div>
            <SafetyGauge score={9.8} />
          </div>
        </motion.section>

        <div className="mt-5">
          <ActivityChart data={demoWeek} highlightDay="Sun" />
        </div>

        <motion.section className="mt-5 rounded-[36px] border border-[var(--calix-line)] bg-white px-5 py-5 shadow-[var(--calix-shadow)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">This Week&apos;s Focus</div>
          {summary ? (
            <p className="mt-3 font-serif text-[16px] leading-8 text-[var(--calix-ink)]/82">{summary}</p>
          ) : (
            <div className="mt-4 space-y-2">
              {[70, 92, 78].map((width) => (
                <div key={width} className="h-3 animate-pulse rounded-full bg-[var(--calix-soft)]" style={{ width: `${width}%` }} />
              ))}
            </div>
          )}
        </motion.section>

        <Link href="/quest/balance-beginner" className="mt-5 flex items-center justify-between rounded-[32px] bg-[var(--calix-ink)] px-5 py-5 text-white shadow-[var(--calix-shadow)]">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Recommended</div>
            <div className="mt-2 text-xl font-black">Balance Beginner</div>
            <div className="mt-2 text-sm leading-6 text-white/70">Try this together tomorrow to build coordination alongside strength.</div>
          </div>
          <div className="text-2xl">→</div>
        </Link>

        <section className="mt-5 rounded-[32px] border border-[var(--calix-line)] bg-white/72 px-5 py-4 text-center text-sm font-semibold text-[var(--calix-ink)]/58 shadow-sm backdrop-blur-sm">
          Upgrade to CaliX+ — ₹500/mo
        </section>
      </div>
    </main>
  );
}
