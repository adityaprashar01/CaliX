"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/kid/BottomNav";

export default function ChallengesPage() {
  return (
    <main className="min-h-screen px-4 pb-28 pt-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section
          className="rounded-[36px] bg-[var(--calix-ink)] px-5 py-6 text-white shadow-[var(--calix-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Weekly Challenge</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">Core Battle</h1>
          <p className="mt-3 text-sm leading-6 text-white/74">Hold your focus, beat your best, and finish before the challenge window closes.</p>
          <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[var(--calix-ink)]">Ends in 3 days</div>
        </motion.section>

        <section className="rounded-[32px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-5 shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Challenge Brief</div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--calix-ink)]/66">
            <li>• Complete Quick Core Battle in one smooth run.</li>
            <li>• Keep your streak alive for bonus club XP.</li>
            <li>• Unlock bragging rights in the squad feed.</li>
          </ul>
        </section>

        <Link href="/quest/quick-core-battle" className="flex items-center justify-between rounded-[32px] bg-white px-5 py-4 shadow-[var(--calix-shadow)]">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Launch</div>
            <div className="mt-1 text-lg font-black text-[var(--calix-ink)]">Start Quick Core Battle</div>
            <div className="text-sm text-[var(--calix-ink)]/58">Jump into the weekly challenge now.</div>
          </div>
          <div className="text-2xl">→</div>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
