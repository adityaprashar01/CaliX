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
    <main className="min-h-screen px-6 pb-10 pt-12">
      <div className="mx-auto max-w-md rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-5 shadow-[var(--calix-shadow)] backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Starter Draft</div>
            <div className="mt-1 text-2xl font-black text-[var(--calix-ink)]">Build your athlete card</div>
          </div>
          <div className="rounded-full bg-white px-3 py-2 text-sm font-black text-[var(--calix-ink)]">0{step + 1}/03</div>
        </div>

        <div className="mb-6 flex items-center justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="h-2.5 w-10 rounded-full"
              animate={{ backgroundColor: dot <= step ? "var(--calix-accent)" : "rgba(49,89,255,0.12)" }}
            />
          ))}
        </div>

        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => current - 1)}
            className="mb-4 min-h-11 text-sm font-black uppercase tracking-[0.16em] text-[var(--calix-accent)]"
          >
            ← Back
          </button>
        ) : null}

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.section key="step-0" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }} className="space-y-5">
              <div>
                <h1 className="text-3xl font-black tracking-[-0.04em] text-[var(--calix-ink)]">How old are you?</h1>
                <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/62">Your club path tunes itself to your age in one tap.</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {ageOptions.map((option) => (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      setAgeBucket(option);
                      setStep(1);
                    }}
                    className="min-h-14 rounded-[24px] border border-[var(--calix-line)] bg-white px-5 py-4 text-lg font-black text-[var(--calix-ink)] shadow-sm"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.section>
          ) : null}

          {step === 1 ? (
            <motion.section key="step-1" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }} className="space-y-5">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--calix-ink)]">Create your hero</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/62">Draft a premium athlete card in under 15 seconds.</p>
              </div>

              <div className="rounded-[30px] bg-[var(--calix-ink)] px-5 py-6 text-white shadow-lg">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/62">Live preview</div>
                <div className="mt-4 flex items-center gap-4">
                  <AvatarBadge color={avatarColor} styleEmoji={styleEmojiMap[avatarStyle]} size={88} />
                  <div>
                    <div className="text-2xl font-black">{displayName || "Aarav"}</div>
                    <div className="mt-1 text-sm text-white/68">Age {ageBucket} • Club rookie</div>
                  </div>
                </div>
              </div>

              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="min-h-12 w-full rounded-[22px] border border-[var(--calix-line)] bg-white px-4 text-center text-lg font-semibold text-[var(--calix-ink)]"
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
                          ? "linear-gradient(135deg, #3159ff 0%, #8aa2ff 100%)"
                          : option === "green"
                            ? "linear-gradient(135deg, #2fbf71 0%, #83e2aa 100%)"
                            : option === "purple"
                              ? "linear-gradient(135deg, #9753ff 0%, #d2a7ff 100%)"
                              : option === "orange"
                                ? "linear-gradient(135deg, #f59e0b 0%, #ffd479 100%)"
                                : "linear-gradient(135deg, #ec4899 0%, #ff9dd1 100%)",
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
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setAvatarStyle(option.id)}
                    className={`min-h-20 rounded-[24px] px-3 py-3 text-center ${
                      avatarStyle === option.id ? "bg-[var(--calix-soft)] ring-2 ring-[var(--calix-accent)]" : "bg-white"
                    }`}
                  >
                    <div className="text-3xl">{option.emoji}</div>
                    <div className="mt-2 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--calix-ink)]">{option.label}</div>
                  </motion.button>
                ))}
              </div>

              <button type="button" onClick={() => setStep(2)} className="min-h-12 w-full rounded-full bg-[var(--calix-accent)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white">
                Next
              </button>
            </motion.section>
          ) : null}

          {step === 2 ? (
            <motion.section key="step-2" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }} className="space-y-5">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--calix-ink)]">What&apos;s your goal?</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/62">Choose the energy you want this club run to build.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map((goal) => (
                  <motion.button
                    key={goal.id}
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => finish(goal.id)}
                    className="flex min-h-24 flex-col items-center justify-center rounded-[26px] border border-[var(--calix-line)] bg-white px-3 py-4 text-center shadow-sm"
                  >
                    <div className="text-3xl">{goal.emoji}</div>
                    <div className="mt-2 text-sm font-black text-[var(--calix-ink)]">{goal.label}</div>
                  </motion.button>
                ))}
              </div>
              <button type="button" onClick={() => finish("stronger")} className="min-h-12 w-full rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#4f72ff_58%,#ffcf54_100%)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white">
                Ready to Grow!
              </button>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
