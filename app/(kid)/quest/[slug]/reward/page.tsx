"use client";
import { useState, useEffect, useRef, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useKidStore } from "@/lib/store";
import { quests } from "@/lib/data/quests";
import { badges } from "@/lib/data/badges";
import { AvatarBadge } from "@/components/kid/AvatarBadge";
import { Confetti } from "@/components/Confetti";

const FALLBACKS = [
  { message: "You crushed it, champion! Keep going!", emoji: "💪" },
  { message: "That was awesome work — your core is getting stronger!", emoji: "⚡" },
  { message: "Another quest done! You're on fire!", emoji: "🔥" },
  { message: "Great moves! Your balance is improving every day!", emoji: "🌟" },
];

export default function RewardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const quest = quests.find((q) => q.slug === slug) ?? quests[0]!;
  const { displayName, totalXp, streakDays, completedSlugs, badgeSlugs, avatarColor, avatarStyle, completeQuest } = useKidStore();
  const [xpCount, setXpCount] = useState(0);
  const [aiMsg, setAiMsg] = useState(FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)]!);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    let badge: string | undefined;
    if (completedSlugs.length === 0) badge = "first-step";
    else if (streakDays >= 2 && !badgeSlugs.includes("3-day-streak")) badge = "3-day-streak";
    else if (completedSlugs.length >= 4 && !badgeSlugs.includes("quick-learner")) badge = "quick-learner";

    if (badge) setEarnedBadge(badge);
    completeQuest(slug, quest.xpReward, badge);

    fetch("/api/ai/kid-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: displayName || "Hero", questTitle: quest.title, xp: quest.xpReward, streak: streakDays + 1 }),
    })
      .then((r) => r.json())
      .then((d: { message: string; emoji: string }) => setAiMsg(d))
      .catch(() => {});

    let frame = 0;
    const total = quest.xpReward;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / 30, 1);
      setXpCount(Math.round(progress * total));
      if (progress >= 1) clearInterval(interval);
    }, 50);

    setTimeout(() => setShowConfetti(false), 2000);
    return () => clearInterval(interval);
  }, [slug, quest, displayName, streakDays, completedSlugs, badgeSlugs, completeQuest]);

  const badgeData = earnedBadge ? badges.find((b) => b.slug === earnedBadge) : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-calix-bg px-6 text-center">
      {showConfetti && <Confetti />}
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
        <span className="text-6xl">🎉</span>
        <h1 className="mt-4 text-3xl font-bold text-calix-ink">Quest Complete!</h1>
        <motion.p className="mt-4 text-5xl font-bold text-calix-accent">+{xpCount} XP</motion.p>
      </motion.div>

      {badgeData && (
        <motion.div className="mt-6 flex flex-col items-center rounded-2xl bg-calix-joy/20 p-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.5 }}>
          <span className="text-4xl">{badgeData.emoji}</span>
          <p className="mt-1 font-semibold text-calix-ink">{badgeData.title}</p>
          <p className="text-xs text-calix-ink/60">{badgeData.description}</p>
        </motion.div>
      )}

      <motion.div className="mt-6 flex items-center gap-2 text-lg font-semibold text-calix-ink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        🔥 {streakDays + 1}-day streak!
      </motion.div>

      <motion.div className="mt-6 flex max-w-xs items-start gap-3 rounded-2xl bg-white p-4 shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <AvatarBadge color={avatarColor} style={avatarStyle} size="sm" />
        <p className="text-left text-sm text-calix-ink">{aiMsg.message} {aiMsg.emoji}</p>
      </motion.div>

      <Link href="/hub" className="mt-8 rounded-full bg-calix-accent px-8 py-3 font-semibold text-white transition-transform active:scale-95" aria-label="Continue to hub">Continue</Link>
    </main>
  );
}
