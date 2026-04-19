"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AssessmentIntroPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section
          className="rounded-[36px] bg-[var(--calix-ink)] px-6 py-7 text-white shadow-[var(--calix-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Fitness Quiz Introduction</div>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Find your starting level</h1>
          <p className="mt-4 text-sm leading-7 text-white/74">
            This quick assessment helps CaliX pick the right first challenge, so the demo feels tailored from the first tap.
          </p>
          <div className="mt-6 rounded-[28px] bg-white/10 px-5 py-5 backdrop-blur-sm">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffcf54]">What you&apos;ll do</div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-white/74">
              <li>• Answer 2 fast questions</li>
              <li>• Get a beginner or advanced track result</li>
              <li>• Jump into a matching quest path</li>
            </ul>
          </div>
        </motion.section>

        <Link href="/assessment/question-1" className="flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#4f72ff_58%,#ffcf54_100%)] px-5 py-4 font-black uppercase tracking-[0.16em] text-white shadow-[var(--calix-shadow)]">
          Start assessment
        </Link>
      </div>
    </main>
  );
}
