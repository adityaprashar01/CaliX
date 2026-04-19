"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AssessmentResultIntermediatePage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section className="rounded-[36px] bg-[var(--calix-ink)] px-6 py-7 text-white shadow-[var(--calix-shadow)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ffcf54]">Intermediate Result</div>
          <div className="mt-4 text-6xl">🔥</div>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Good start! Let’s level up</h1>
          <p className="mt-4 text-sm leading-7 text-white/74">You&apos;ve got momentum already. We&apos;ll sharpen your form and push your next level with a balanced path.</p>
        </motion.section>
        <Link href="/quest/balance-beginner" className="flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#f6d301_0%,#ffaa00_100%)] px-5 py-4 font-black uppercase tracking-[0.16em] text-[var(--calix-ink)] shadow-[var(--calix-shadow)]">Continue</Link>
      </div>
    </main>
  );
}
