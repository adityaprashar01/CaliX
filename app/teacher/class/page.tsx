"use client";

import { motion } from "framer-motion";

const leaderboard = [
  { rank: '01', name: 'Jordan L.', score: '4,500', role: 'Seeder' },
  { rank: '02', name: 'Sarah A.', score: '2,210', role: 'Guardian' },
  { rank: '03', name: 'Marcus K.', score: '1,980', role: 'Coordinator' },
] as const;

export default function TeacherClassPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section
          className="rounded-[36px] bg-[var(--calix-ink)] px-5 py-6 text-white shadow-[var(--calix-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Instructor Dashboard</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">Morning Class Hub</h1>
          <button className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#ff4d82] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg">
            <span>🚀</span>
            Launch Class Challenge
          </button>
        </motion.section>

        <section className="rounded-[32px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-5 shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Participation rate</div>
          <div className="mt-2 text-5xl font-black text-[#ff4d82]">92%</div>
          <div className="mt-1 text-sm text-[var(--calix-ink)]/58">+4% vs last week</div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#ff4d82] to-[#ffb1c0]" />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-[28px] bg-[var(--calix-surface)] p-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-ink)]/45">Active Heroes</div>
            <div className="mt-2 text-4xl font-black text-[var(--calix-ink)]">34<span className="text-xl text-[var(--calix-ink)]/45">/38</span></div>
          </div>
          <div className="rounded-[28px] bg-[var(--calix-surface)] p-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-ink)]/45">Class Energy</div>
            <div className="mt-2 text-3xl font-black text-[var(--calix-ink)]">High Pulse</div>
            <div className="mt-1 text-sm text-[var(--calix-ink)]/58">Average BPM 124</div>
          </div>
        </section>

        <section className="rounded-[32px] bg-[var(--calix-surface)] p-5 shadow-[var(--calix-shadow)]">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Top Heroes</div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--calix-ink)]/48">View all leaderboard</div>
          </div>
          <div className="mt-4 space-y-3">
            {leaderboard.map((item) => (
              <div key={item.rank} className="flex items-center justify-between rounded-[22px] bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-black text-[#ff4d82]">{item.rank}</div>
                  <div>
                    <div className="text-sm font-black text-[var(--calix-ink)]">{item.name}</div>
                    <div className="text-xs text-[var(--calix-ink)]/52">{item.role}</div>
                  </div>
                </div>
                <div className="text-sm font-black text-[var(--calix-ink)]">{item.score}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
