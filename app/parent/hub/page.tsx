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
    () => ({
      completions: 5,
      totalMinutes: demoWeekTotals.totalMinutes,
      streakDays: kidState.streakDays || 5,
    }),
    [kidState.streakDays],
  );

  useEffect(() => {
    const fallback = `${childName} had a solid week — ${weekStats.completions} quests completed and ${weekStats.totalMinutes} active minutes, keeping a ${weekStats.streakDays}-day streak. Safety score stays strong at 9.8/10. This week's focus is core stability, which is the foundation for all future movement. Recommended next: try the Balance Beginner quest together tomorrow to build coordination alongside strength.`;

    const timeout = window.setTimeout(() => {
      setSummary((current) => current ?? fallback);
    }, 2500);

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
    <main className="min-h-screen bg-[var(--calix-soft)] px-4 pb-10 pt-8 text-[var(--calix-ink)]">
      <div className="mx-auto max-w-3xl">
        <motion.section
          className="rounded-[32px] bg-white px-5 py-5 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl font-bold">{childName}&apos;s Progress — Level {level} • Consistency {FALLBACK_CONSISTENCY}% • Safety 9.8/10</h1>
              <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/60">
                Calm, safety-first insight into this week&apos;s movement progress.
              </p>
            </div>
            <SafetyGauge score={9.8} />
          </div>
        </motion.section>

        <div className="mt-5">
          <ActivityChart data={demoWeek} highlightDay="Sun" />
        </div>

        <motion.section
          className="mt-5 rounded-[32px] bg-white px-5 py-5 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <h2 className="font-serif text-xl font-semibold">This Week&apos;s Focus</h2>
          {summary ? (
            <p className="mt-3 font-serif text-[15px] leading-7 text-[var(--calix-ink)]/80">{summary}</p>
          ) : (
            <div className="mt-4 space-y-2">
              {[70, 92, 78].map((width) => (
                <div key={width} className="h-3 animate-pulse rounded-full bg-[var(--calix-soft)]" style={{ width: `${width}%` }} />
              ))}
            </div>
          )}
        </motion.section>

        <Link
          href="/quest/balance-beginner"
          className="mt-5 flex items-center justify-between rounded-[32px] bg-white px-5 py-4 shadow-sm"
        >
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--calix-accent)]">Recommended</div>
            <div className="mt-1 text-lg font-semibold">Balance Beginner</div>
            <div className="text-sm text-[var(--calix-ink)]/60">Try this together tomorrow to build coordination alongside strength.</div>
          </div>
          <div className="text-2xl">→</div>
        </Link>

        <section className="mt-5 rounded-[32px] border border-[var(--calix-ink)]/10 bg-white/60 px-5 py-4 text-center text-sm text-[var(--calix-ink)]/55">
          Upgrade to CaliX+ — ₹500/mo
        </section>
      </div>
    </main>
  );
}
