"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getQuestBySlug, quests } from "@/lib/data/quests";

const skipReasons = ["Too Hard", "Feels Painful", "Boring", "Other"] as const;

export default function QuestPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const quest = getQuestBySlug(params.slug) ?? quests[0]!;
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quest.exercises[0]!.durationSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [showSafetyCue, setShowSafetyCue] = useState(true);
  const [showSkipReasons, setShowSkipReasons] = useState(false);

  const exercise = quest.exercises[exerciseIndex]!;
  const timerLabel = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  const advanceExercise = useCallback(() => {
    if (exerciseIndex < quest.exercises.length - 1) {
      const nextIndex = exerciseIndex + 1;
      setExerciseIndex(nextIndex);
      setTimeLeft(quest.exercises[nextIndex]!.durationSeconds);
      setShowSafetyCue(true);
      return;
    }

    router.push(`/quest/${quest.slug}/reward`);
  }, [exerciseIndex, quest, router]);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      advanceExercise();
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [advanceExercise, isPaused, timeLeft]);

  return (
    <main className="min-h-screen px-4 pb-10 pt-8">
      {process.env.NODE_ENV === "development" ? (
        <button type="button" onClick={() => router.push(`/quest/${quest.slug}/reward`)} className="fixed right-4 top-4 z-50 min-h-11 rounded-full bg-[var(--calix-joy)] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[var(--calix-ink)] shadow-md">
          Skip to reward
        </button>
      ) : null}

      <div className="mx-auto max-w-md rounded-[36px] bg-[var(--calix-ink)] px-5 py-6 text-center text-white shadow-[var(--calix-shadow)]">
        <div className="mb-5 flex justify-center gap-1.5">
          {quest.exercises.map((item, index) => (
            <div key={`${item.name}-${index}`} className="h-1.5 w-7 rounded-full" style={{ backgroundColor: index <= exerciseIndex ? "#ffcf54" : "rgba(255,255,255,0.14)" }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section key={`${exercise.name}-${exerciseIndex}`} initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -36 }}>
            <div className="text-[128px] leading-none">{exercise.emoji}</div>
            <div className="mt-4 text-[10px] font-black uppercase tracking-[0.24em] text-white/58">{quest.title}</div>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em]">{exercise.name}</h1>
            <p className="mt-3 text-base leading-7 text-white/74">{exercise.instruction}</p>
            {exercise.reps ? <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-[#ffcf54]">{exercise.reps}</p> : null}
            <div className="mt-8 text-6xl font-black tabular-nums text-[#ffcf54]">{timerLabel}</div>

            {showSafetyCue ? (
              <motion.button type="button" onClick={() => setShowSafetyCue(false)} className="mt-5 w-full rounded-[26px] bg-white px-4 py-4 text-left text-[var(--calix-ink)] shadow-sm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Safety cue</div>
                <div className="mt-2 text-sm font-semibold leading-6">{exercise.safetyCue}</div>
              </motion.button>
            ) : null}
          </motion.section>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={() => setIsPaused((current) => !current)} className="min-h-11 rounded-full bg-white px-6 py-3 font-black uppercase tracking-[0.14em] text-[var(--calix-ink)] shadow-sm">
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button type="button" onClick={() => setShowSkipReasons(true)} className="min-h-11 rounded-full bg-white/10 px-6 py-3 font-black uppercase tracking-[0.14em] text-white shadow-sm">
            Skip
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSkipReasons ? (
          <motion.div className="fixed inset-0 z-50 flex items-end bg-[var(--calix-ink)]/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSkipReasons(false)}>
            <motion.div className="w-full rounded-t-[32px] bg-white p-6 text-center shadow-2xl" initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} onClick={(event) => event.stopPropagation()}>
              <h3 className="text-xl font-black text-[var(--calix-ink)]">Why skip this move?</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {skipReasons.map((reason) => (
                  <button key={reason} type="button" onClick={() => { setShowSkipReasons(false); advanceExercise(); }} className="min-h-12 rounded-[22px] bg-[var(--calix-soft)] px-4 py-3 text-sm font-black text-[var(--calix-ink)]">
                    {reason}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
