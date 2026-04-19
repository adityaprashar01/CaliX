"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BottomNav } from "@/components/kid/BottomNav";
import { StreakFlame } from "@/components/kid/StreakFlame";
import { XpBar } from "@/components/kid/XpBar";
import { ActivityChart } from "@/components/parent/ActivityChart";
import { demoWeek } from "@/lib/data/demoWeek";
import { quests } from "@/lib/data/quests";
import { useKidStore } from "@/lib/store";

export default function HubPage() {
  const { displayName, totalXp, streakDays, completedSlugs } = useKidStore();
  const level = Math.floor(totalXp / 100) + 1;
  const xpInLevel = totalXp % 100;
  const nextQuest = quests.find((quest) => !completedSlugs.includes(quest.slug)) ?? quests[0]!;

  return (
    <main className="min-h-screen px-4 pb-28 pt-8">
      <div className="mx-auto max-w-md">
        <motion.section
          className="rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] px-5 py-5 shadow-[var(--calix-shadow)] backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Club Dashboard</div>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--calix-ink)]">Hi, {displayName || "Aarav"}!</h1>
              <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/60">You&apos;re building a stronger base one session at a time.</p>
            </div>
            <div className="rounded-[24px] bg-[var(--calix-ink)] px-4 py-3 text-center text-white shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/62">Level</div>
              <div className="mt-1 text-3xl font-black">{level}</div>
            </div>
          </div>

          <div className="mt-5">
            <XpBar current={xpInLevel} max={100} />
            <div className="mt-2 text-right text-[11px] font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/48">
              {xpInLevel}/100 XP to Level {level + 1}
            </div>
          </div>
        </motion.section>

        <Link href={`/quest/${nextQuest.slug}`} className="mt-7 block">
          <motion.section
            className="relative overflow-hidden rounded-[40px] bg-[var(--calix-ink)] px-6 py-8 text-center text-white shadow-[var(--calix-shadow)]"
            animate={{ y: [0, -2, 0], boxShadow: ["0 20px 40px rgba(15,28,63,0.18)", "0 28px 60px rgba(15,28,63,0.24)", "0 20px 40px rgba(15,28,63,0.18)"] }}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="absolute inset-x-10 top-4 h-24 rounded-full bg-[radial-gradient(circle,rgba(255,207,84,0.28),transparent_70%)] blur-xl" />
            <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-white/18 bg-[radial-gradient(circle,#3a60ff_0%,#203a8b_60%,#14224d_100%)] shadow-2xl">
              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border border-white/20 bg-[rgba(255,255,255,0.06)] backdrop-blur-sm">
                <div className="text-4xl">⚡</div>
                <div className="mt-3 text-xl font-black uppercase tracking-[0.16em]">Quick Quest</div>
                <div className="mt-1 text-sm font-semibold text-white/72">3 min club sprint</div>
              </div>
            </div>
          </motion.section>
        </Link>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-[26px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 text-center shadow-sm backdrop-blur-sm">
            <div className="flex justify-center"><StreakFlame streak={streakDays} /></div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-ink)]/48">Streak</div>
          </div>
          <div className="rounded-[26px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 text-center shadow-sm backdrop-blur-sm">
            <div className="text-2xl font-black text-[var(--calix-accent)]">{totalXp}</div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-ink)]/48">XP</div>
          </div>
          <div className="rounded-[26px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-4 text-center shadow-sm backdrop-blur-sm">
            <div className="text-2xl font-black text-[var(--calix-good)]">{completedSlugs.length}</div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-ink)]/48">Done</div>
          </div>
        </div>

        <div className="mt-6">
          <ActivityChart data={demoWeek} highlightDay="Sun" />
        </div>

        <Link href="/challenges" className="mt-6 block">
          <section className="rounded-[32px] border border-[var(--calix-line)] bg-white px-5 py-4 shadow-[var(--calix-shadow)]">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Weekly Challenge</div>
            <div className="mt-1 text-lg font-black text-[var(--calix-ink)]">Core Battle</div>
            <div className="mt-1 text-sm text-[var(--calix-ink)]/58">One weekly sprint, one leaderboard-worthy effort.</div>
          </section>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
