"use client";

import Link from "next/link";
import { animate, motion, useMotionValue } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { kidFallbackPool } from "@/lib/ai/kidMessage";
import { Confetti } from "@/components/Confetti";
import { AvatarBadge } from "@/components/kid/AvatarBadge";
import { getBadgeBySlug } from "@/lib/data/badges";
import { getQuestBySlug, quests } from "@/lib/data/quests";
import { useKidStore } from "@/lib/store";

const avatarEmojiMap = {
  striker: "🥊",
  balancer: "⚖️",
  mover: "🤸",
} as const;

function startOfTodayIso() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
}

export default function RewardPage() {
  const params = useParams<{ slug: string }>();
  const quest = getQuestBySlug(params.slug) ?? quests[0]!;
  const { displayName, streakDays, lastActivityIso, completedSlugs, badgeSlugs, avatarColor, avatarStyle, completeQuest } = useKidStore();
  const [xpCount, setXpCount] = useState(0);
  const [message, setMessage] = useState(kidFallbackPool[0]!);
  const [earnedBadgeSlug, setEarnedBadgeSlug] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const hasCompletedRef = useRef(false);
  const xpMotion = useMotionValue(0);

  const nextStreak = useMemo(() => (lastActivityIso === startOfTodayIso() ? streakDays : streakDays + 1), [lastActivityIso, streakDays]);

  useEffect(() => {
    const unsubscribe = xpMotion.on("change", (latest) => setXpCount(Math.round(latest)));
    const controls = animate(xpMotion, quest.xpReward, { duration: 1.5, ease: "easeOut" });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [quest.xpReward, xpMotion]);

  useEffect(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    let maybeBadgeSlug: string | undefined;
    if (completedSlugs.length === 0) maybeBadgeSlug = "first-step";
    else if (quest.skillPathSlug === "core-base" && !badgeSlugs.includes("core-starter")) maybeBadgeSlug = "core-starter";
    else if (quest.skillPathSlug === "balance" && !badgeSlugs.includes("balance-beginner")) maybeBadgeSlug = "balance-beginner";
    else if (quest.slug === "quick-core-battle" && !badgeSlugs.includes("quick-learner")) maybeBadgeSlug = "quick-learner";
    else if (nextStreak >= 3 && !badgeSlugs.includes("3-day-streak")) maybeBadgeSlug = "3-day-streak";
    else if (nextStreak >= 5 && !badgeSlugs.includes("week-warrior")) maybeBadgeSlug = "week-warrior";

    setEarnedBadgeSlug(maybeBadgeSlug ?? null);
    completeQuest(quest.slug, quest.xpReward, maybeBadgeSlug);

    void fetch("/api/ai/kid-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: displayName || "Aarav", questTitle: quest.title, xp: quest.xpReward, streak: nextStreak }),
    })
      .then(async (response) => response.json() as Promise<{ message: string; emoji: string }>)
      .then((payload) => {
        if (payload.message && payload.emoji) setMessage(payload);
      })
      .catch(() => undefined);

    const timer = window.setTimeout(() => setShowConfetti(false), 1500);
    return () => window.clearTimeout(timer);
  }, [badgeSlugs, completeQuest, completedSlugs.length, displayName, nextStreak, quest]);

  const earnedBadge = earnedBadgeSlug ? getBadgeBySlug(earnedBadgeSlug) : undefined;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {showConfetti ? <Confetti /> : null}

      <div className="relative w-full max-w-md rounded-[40px] bg-[var(--calix-ink)] px-6 py-8 text-white shadow-[var(--calix-shadow)]">
        <div className="absolute inset-x-10 top-6 h-28 rounded-full bg-[radial-gradient(circle,rgba(255,207,84,0.3),transparent_70%)] blur-2xl" />
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 190, damping: 18 }}>
          <div className="text-6xl">🏆</div>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.05em]">Quest Complete!</h1>
          <div className="mt-4 text-5xl font-black text-[#ffcf54]">+{xpCount} XP</div>
        </motion.div>

        {earnedBadge ? (
          <motion.div className="mt-6 rounded-[28px] bg-white px-6 py-5 text-[var(--calix-ink)] shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 }}>
            <div className="text-5xl">{earnedBadge.icon}</div>
            <div className="mt-2 text-lg font-black">{earnedBadge.title}</div>
            <div className="mt-1 text-sm leading-6 text-[var(--calix-ink)]/60">{earnedBadge.description}</div>
          </motion.div>
        ) : null}

        <motion.div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[var(--calix-ink)] shadow-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span>🔥</span>
          <span>{nextStreak}-day streak</span>
        </motion.div>

        <motion.div className="mt-6 flex items-start gap-3 rounded-[28px] bg-white px-4 py-4 text-left text-[var(--calix-ink)] shadow-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <AvatarBadge color={avatarColor} styleEmoji={avatarEmojiMap[avatarStyle]} size={56} />
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Coach says</div>
            <div className="mt-2 text-sm leading-6">{message.message} {message.emoji}</div>
          </div>
        </motion.div>
      </div>

      <Link href="/hub" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#4f72ff_58%,#ffcf54_100%)] px-8 py-3 font-black uppercase tracking-[0.16em] text-white shadow-[var(--calix-shadow)]">
        Continue
      </Link>
    </main>
  );
}
