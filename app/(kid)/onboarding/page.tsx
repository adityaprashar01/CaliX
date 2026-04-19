"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AvatarBadge } from "@/components/kid/AvatarBadge";
import { useKidStore, type AgeBucket, type AvatarColor, type AvatarStyle } from "@/lib/store";

const ageOptions = ["6-9", "10-12", "13-15"] as const satisfies readonly Exclude<AgeBucket, null>[];
const colorOptions = ["blue", "green", "purple", "orange", "pink"] as const satisfies readonly AvatarColor[];
const styleOptions = [
  { id: "striker", emoji: "🥊", label: "Striker" },
  { id: "balancer", emoji: "⚖️", label: "Balancer" },
  { id: "mover", emoji: "🤸", label: "Mover" },
] as const satisfies readonly { id: AvatarStyle; emoji: string; label: string }[];
const goalOptions = [
  { id: "stronger", label: "Get Stronger", emoji: "💪" },
  { id: "balance", label: "Improve Balance", emoji: "⚖️" },
  { id: "flexible", label: "Feel Flexible", emoji: "🤸" },
  { id: "fun", label: "Just Have Fun", emoji: "🎮" },
] as const;

const styleEmojiMap: Record<AvatarStyle, string> = {
  striker: "🥊",
  balancer: "⚖️",
  mover: "🤸",
};

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useKidStore((state) => state.completeOnboarding);
  const [step, setStep] = useState(0);
  const [ageBucket, setAgeBucket] = useState<Exclude<AgeBucket, null>>("10-12");
  const [displayName, setDisplayName] = useState("Aarav");
  const [avatarColor, setAvatarColor] = useState<AvatarColor>("blue");
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>("striker");

  const finish = (goalType: (typeof goalOptions)[number]["id"]) => {
    completeOnboarding({
      displayName: displayName.trim() || "Aarav",
      ageBucket,
      avatarColor,
      avatarStyle,
      goalType,
    });
    router.push("/hub");
  };

  return (
    <main className="min-h-screen bg-[var(--calix-bg)] px-6 pb-10 pt-12">
      <div className="mx-auto max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="h-2.5 w-8 rounded-full"
              animate={{ backgroundColor: dot <= step ? "var(--calix-accent)" : "rgba(59,91,255,0.15)" }}
            />
          ))}
        </div>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => current - 1)}
            className="mb-4 min-h-11 text-sm font-semibold text-[var(--calix-accent)]"
          >
            ← Back
          </button>
        ) : null}

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.section
              key="step-0"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-[var(--calix-ink)]">How old are you?</h1>
                <p className="mt-2 text-sm text-[var(--calix-ink)]/60">Tap once and move fast — this should take seconds.</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {ageOptions.map((option) => (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setAgeBucket(option);
                      setStep(1);
                    }}
                    className="min-h-14 rounded-3xl bg-white px-5 py-4 text-lg font-semibold text-[var(--calix-ink)] shadow-md"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.section>
          ) : null}

          {step === 1 ? (
            <motion.section
              key="step-1"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--calix-ink)]">Create your hero!</h2>
                <p className="mt-2 text-sm text-[var(--calix-ink)]/60">Pick a color and style that feels like you.</p>
              </div>
              <div className="flex justify-center">
                <AvatarBadge color={avatarColor} styleEmoji={styleEmojiMap[avatarStyle]} size={88} />
              </div>
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="min-h-12 w-full rounded-2xl border border-[var(--calix-soft)] bg-white px-4 text-center text-lg text-[var(--calix-ink)]"
                placeholder="Your hero name"
                aria-label="Hero name"
              />
              <div className="flex items-center justify-center gap-3">
                {colorOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAvatarColor(option)}
                    className={`h-11 w-11 rounded-full border-4 ${avatarColor === option ? "border-[var(--calix-ink)]" : "border-white"}`}
                    style={{
                      background:
                        option === "blue"
                          ? "linear-gradient(135deg, #3B5BFF, #8AA2FF)"
                          : option === "green"
                            ? "linear-gradient(135deg, #2FBF71, #83E2AA)"
                            : option === "purple"
                              ? "linear-gradient(135deg, #A855F7, #D2A7FF)"
                              : option === "orange"
                                ? "linear-gradient(135deg, #F59E0B, #FFD479)"
                                : "linear-gradient(135deg, #EC4899, #FF9DD1)",
                    }}
                    aria-label={`Choose ${option} avatar color`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {styleOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAvatarStyle(option.id)}
                    className={`min-h-16 rounded-2xl px-3 py-3 text-center ${
                      avatarStyle === option.id ? "bg-[var(--calix-soft)] ring-2 ring-[var(--calix-accent)]" : "bg-white"
                    }`}
                  >
                    <div className="text-3xl">{option.emoji}</div>
                    <div className="mt-1 text-xs font-semibold text-[var(--calix-ink)]">{option.label}</div>
                  </motion.button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="min-h-12 w-full rounded-full bg-[var(--calix-accent)] px-5 py-3 font-semibold text-white"
              >
                Next
              </button>
            </motion.section>
          ) : null}

          {step === 2 ? (
            <motion.section
              key="step-2"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--calix-ink)]">What&apos;s your goal?</h2>
                <p className="mt-2 text-sm text-[var(--calix-ink)]/60">One tap and you&apos;re ready to grow.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map((goal) => (
                  <motion.button
                    key={goal.id}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => finish(goal.id)}
                    className="flex min-h-24 flex-col items-center justify-center rounded-3xl bg-white px-3 py-4 text-center shadow-md"
                  >
                    <div className="text-3xl">{goal.emoji}</div>
                    <div className="mt-2 text-sm font-semibold text-[var(--calix-ink)]">{goal.label}</div>
                  </motion.button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => finish("stronger")}
                className="min-h-12 w-full rounded-full bg-[var(--calix-joy)] px-5 py-3 font-bold text-[var(--calix-ink)]"
              >
                Ready to Grow!
              </button>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
