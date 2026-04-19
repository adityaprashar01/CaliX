"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AssessmentResultAdvancedPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section className="rounded-[36px] bg-[var(--calix-ink)] px-6 py-7 text-white shadow-[var(--calix-shadow)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ffcf54]">Advanced Assessment Result</div>
          <div className="mt-4 text-6xl">⚡</div>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Hero Track Ready</h1>
          <p className="mt-4 text-sm leading-7 text-white/74">You move like someone who can handle faster sessions, bigger goals, and more intense club-style progressions.</p>
          <div className="mt-6 rounded-[26px] bg-white/10 px-5 py-5 backdrop-blur-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffcf54]">Recommended path</div>
            <div className="mt-2 text-lg font-black">Quick Core Battle + Mobility Flow</div>
          </div>
        </motion.section>
        <Link href="/quest/quick-core-battle" className="flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#4f72ff_58%,#ffcf54_100%)] px-5 py-4 font-black uppercase tracking-[0.16em] text-white shadow-[var(--calix-shadow)]">Start Hero Challenge</Link>
      </div>
    </main>
  );
}
