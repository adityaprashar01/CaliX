"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AssessmentResultBeginnerPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section className="rounded-[36px] bg-white px-6 py-7 text-[var(--calix-ink)] shadow-[var(--calix-shadow)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Beginner Assessment Result</div>
          <div className="mt-4 text-6xl">🌱</div>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Foundation Starter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--calix-ink)]/68">You&apos;re ready to build the base layer first: clean form, strong balance, and confidence-building wins.</p>
          <div className="mt-6 rounded-[26px] bg-[var(--calix-soft)] px-5 py-5">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-accent)]">Recommended path</div>
            <div className="mt-2 text-lg font-black">Core Base + Balance Beginner</div>
          </div>
        </motion.section>
        <Link href="/quest/core-base-starter" className="flex items-center justify-center rounded-full bg-[var(--calix-accent)] px-5 py-4 font-black uppercase tracking-[0.16em] text-white shadow-[var(--calix-shadow)]">Start Core Base Starter</Link>
      </div>
    </main>
  );
}
