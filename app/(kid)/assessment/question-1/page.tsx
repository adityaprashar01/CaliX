"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const options = [
  "I&apos;m just starting out",
  "I can do a few bodyweight moves",
  "I already train often",
] as const;

export default function AssessmentQuestionOnePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section className="rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] px-6 py-6 shadow-[var(--calix-shadow)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Assessment Question 1</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--calix-ink)]">How confident do you feel with bodyweight moves?</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--calix-ink)]/62">Tap the option that feels most like you right now.</p>
        </motion.section>

        <div className="grid gap-3">
          {options.map((option, index) => (
            <motion.button
              key={option}
              type="button"
              onClick={() => router.push(index === 2 ? "/assessment/question-2?track=advanced" : "/assessment/question-2?track=beginner")}
              className="rounded-[28px] bg-white px-5 py-4 text-left text-[var(--calix-ink)] shadow-[var(--calix-shadow)]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="text-sm font-black leading-6">{option}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
