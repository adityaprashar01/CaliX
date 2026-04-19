"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useKidStore } from "@/lib/store";
import { AvatarBadge } from "@/components/kid/AvatarBadge";

const ages = ["6-9", "10-12", "13-15"];
const colors = ["blue", "red", "green", "purple", "orange"];
const colorHex: Record<string, string> = { blue: "#3B82F6", red: "#EF4444", green: "#22C55E", purple: "#A855F7", orange: "#F97316" };
const styles = [{ id: "striker", emoji: "🥊" }, { id: "balancer", emoji: "⚖️" }, { id: "mover", emoji: "🤸" }];
const goals = [{ id: "strength", label: "Get Stronger", emoji: "💪" }, { id: "balance", label: "Improve Balance", emoji: "⚖️" }, { id: "flexibility", label: "Feel Flexible", emoji: "🤸" }, { id: "fun", label: "Just Have Fun", emoji: "🎮" }];

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useKidStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [ageBucket, setAgeBucket] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarColor, setAvatarColor] = useState("blue");
  const [avatarStyle, setAvatarStyle] = useState("striker");

  const finish = (goalType: string) => {
    completeOnboarding({ displayName: displayName || "Hero", ageBucket, avatarColor, avatarStyle, goalType });
    router.push("/hub");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-calix-bg px-6 pt-12">
      <div className="mb-8 flex gap-2">
        {[0, 1, 2].map((i) => <div key={i} className={`h-2.5 w-2.5 rounded-full ${i <= step ? "bg-calix-accent" : "bg-calix-soft"}`} />)}
      </div>
      {step > 0 && <button onClick={() => setStep(step - 1)} className="mb-4 self-start text-sm text-calix-accent" type="button" aria-label="Go back">&larr; Back</button>}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" className="flex w-full max-w-sm flex-col items-center gap-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-calix-ink">How old are you?</h2>
            <div className="flex gap-3">{ages.map((a) => <button key={a} onClick={() => { setAgeBucket(a); setStep(1); }} className="min-h-[44px] min-w-[80px] rounded-2xl bg-white p-4 text-lg font-semibold shadow-md transition-transform active:scale-95" type="button">{a}</button>)}</div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="s1" className="flex w-full max-w-sm flex-col items-center gap-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-calix-ink">Create your hero!</h2>
            <AvatarBadge color={avatarColor} style={avatarStyle} size="lg" />
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your hero name" className="w-full rounded-xl border-2 border-calix-soft bg-white px-4 py-3 text-center text-lg focus:border-calix-accent focus:outline-none" aria-label="Hero name" />
            <div className="flex gap-3">{colors.map((c) => <button key={c} onClick={() => setAvatarColor(c)} className={`h-10 w-10 rounded-full border-2 transition-transform ${avatarColor === c ? "scale-110 border-calix-ink" : "border-transparent"}`} style={{ backgroundColor: colorHex[c] }} type="button" aria-label={`Color ${c}`} />)}</div>
            <div className="flex gap-4">{styles.map((s) => <button key={s.id} onClick={() => setAvatarStyle(s.id)} className={`min-h-[44px] min-w-[44px] rounded-xl p-3 text-2xl ${avatarStyle === s.id ? "bg-calix-accent/20 ring-2 ring-calix-accent" : "bg-white"}`} type="button" aria-label={s.id}>{s.emoji}</button>)}</div>
            <button onClick={() => setStep(2)} className="mt-2 rounded-full bg-calix-accent px-8 py-3 font-semibold text-white" type="button">Next</button>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="s2" className="flex w-full max-w-sm flex-col items-center gap-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-calix-ink">What&apos;s your goal?</h2>
            <div className="grid grid-cols-2 gap-3">{goals.map((g) => <button key={g.id} onClick={() => finish(g.id)} className="flex min-h-[80px] flex-col items-center justify-center gap-1 rounded-2xl bg-white p-4 shadow-md transition-transform active:scale-95" type="button" aria-label={g.label}><span className="text-3xl">{g.emoji}</span><span className="text-sm font-medium">{g.label}</span></button>)}</div>
            <p className="mt-4 text-xs text-calix-ink/50">Tap your goal to begin!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
