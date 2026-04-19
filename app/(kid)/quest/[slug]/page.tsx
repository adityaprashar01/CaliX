"use client";
import { useState, useEffect, useCallback, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { quests } from "@/lib/data/quests";

export default function QuestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const quest = quests.find((q) => q.slug === slug) ?? quests[0]!;
  const [exIdx, setExIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quest.exercises[0]!.durationSeconds);
  const [paused, setPaused] = useState(false);
  const [showCue, setShowCue] = useState(true);
  const ex = quest.exercises[exIdx]!;

  const advance = useCallback(() => {
    if (exIdx < quest.exercises.length - 1) {
      const nextIdx = exIdx + 1;
      setExIdx(nextIdx);
      setTimeLeft(quest.exercises[nextIdx]!.durationSeconds);
      setShowCue(true);
    } else {
      router.push(`/quest/${slug}/reward`);
    }
  }, [exIdx, quest.exercises, router, slug]);

  useEffect(() => {
    if (paused) return;
    if (timeLeft <= 0) { advance(); return; }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, paused, advance]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <main className="flex min-h-screen flex-col items-center bg-calix-bg px-4 pt-8">
      <button onClick={() => router.push(`/quest/${slug}/reward`)} className="fixed right-4 top-4 z-50 rounded-lg bg-calix-joy/30 px-3 py-1.5 text-xs font-medium" type="button">Skip to reward</button>
      <div className="mb-2 flex gap-1">{quest.exercises.map((_, i) => <div key={i} className={`h-1.5 w-6 rounded-full ${i <= exIdx ? "bg-calix-accent" : "bg-calix-soft"}`} />)}</div>
      <AnimatePresence mode="wait">
        <motion.div key={exIdx} className="flex flex-col items-center" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
          <span className="mt-4 text-[120px] leading-none">{ex.emoji}</span>
          <h2 className="mt-4 text-2xl font-bold text-calix-ink">{ex.name}</h2>
          <p className="mt-1 text-center text-sm text-calix-ink/70">{ex.instruction}</p>
          <div className="mt-6 text-6xl font-bold tabular-nums text-calix-accent">{mins}:{secs.toString().padStart(2, "0")}</div>
          {showCue && (
            <motion.button onClick={() => setShowCue(false)} className="mt-4 rounded-xl bg-calix-joy/20 px-4 py-3 text-sm text-calix-ink" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} type="button" aria-label="Dismiss safety cue">
              ⚠️ {ex.safetyCue}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex gap-4">
        <button onClick={() => setPaused(!paused)} className="min-h-[44px] min-w-[44px] rounded-full bg-white px-6 py-3 font-semibold shadow-md" type="button">{paused ? "▶️ Resume" : "⏸️ Pause"}</button>
        <button onClick={advance} className="min-h-[44px] min-w-[44px] rounded-full bg-calix-soft px-6 py-3 font-semibold shadow-md" type="button">⏭️ Skip</button>
      </div>
    </main>
  );
}
