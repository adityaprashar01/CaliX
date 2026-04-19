"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const emojis = ["💪", "⚖️", "🤸", "🌳"] as const;
const highlightStats = [
  { label: "Quick Demo", value: "3 min" },
  { label: "Kid First", value: "8–13" },
  { label: "Safety", value: "9.8/10" },
] as const;

export default function LandingPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % emojis.length);
    }, 1200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 text-center">
      <div className="absolute inset-x-0 top-12 mx-auto h-56 max-w-lg rounded-full bg-[radial-gradient(circle,rgba(255,207,84,0.55),transparent_70%)] blur-2xl" />
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
        <motion.div
          className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--calix-ink)]/72 shadow-[var(--calix-shadow)] backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Playful Premium Sports Club
        </motion.div>

        <motion.h1
          className="mt-6 text-6xl font-black tracking-[-0.06em] text-[var(--calix-ink)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CaliX
        </motion.h1>
        <motion.p
          className="mt-3 text-xl font-black uppercase tracking-[0.18em] text-[var(--calix-accent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Build Your Base
        </motion.p>
        <p className="mt-5 max-w-sm text-base leading-7 text-[var(--calix-ink)]/66">
          India&apos;s first digital calisthenics club for kids — designed to feel like a premium sports program, not homework.
        </p>

        <div className="mt-8 grid w-full grid-cols-3 gap-3">
          {highlightStats.map((item) => (
            <div key={item.label} className="rounded-[26px] border border-[var(--calix-line)] bg-[var(--calix-surface)] px-3 py-4 shadow-[var(--calix-shadow)] backdrop-blur-sm">
              <div className="text-lg font-black text-[var(--calix-ink)]">{item.value}</div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-ink)]/48">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-[38px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))] shadow-[var(--calix-shadow)]">
          <AnimatePresence mode="wait">
            <motion.span
              key={emojis[index]}
              className="text-8xl"
              initial={{ scale: 0.72, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.72, rotate: 12, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {emojis[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-8 w-full rounded-[30px] border border-[var(--calix-line)] bg-[var(--calix-ink)] px-5 py-5 text-left text-white shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/62">Club Promise</div>
          <div className="mt-3 text-lg font-bold leading-7">Fast onboarding. Real movement. Safety cues parents trust. Progress kids can feel.</div>
        </div>

        <Link
          href="/role-select"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#4f72ff_60%,#ffcf54_100%)] px-8 py-4 text-lg font-black uppercase tracking-[0.16em] text-white shadow-[var(--calix-shadow)] transition hover:scale-[1.02] active:scale-[0.98]"
        >
          Enter Club
        </Link>
      </div>
    </main>
  );
}
