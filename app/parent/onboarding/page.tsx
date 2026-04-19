"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useParentStore, useSessionStore } from "@/lib/store";

const mythCards = [
  { title: "Growth", blurb: "Good technique builds coordination and confidence — not stunt risk." },
  { title: "Injury", blurb: "Short, guided bodyweight progressions are safer than random stunts." },
  { title: "Too Young", blurb: "Ages 6+ can start with playful basics, balance, and mobility." },
] as const;

export default function ParentOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [childName, setChildName] = useState("Aarav");
  const completeParentOnboarding = useParentStore((state) => state.completeParentOnboarding);

  const finish = () => {
    useSessionStore.getState().setRole("parent");
    completeParentOnboarding(childName);
    router.push("/parent/hub");
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-6 shadow-[var(--calix-shadow)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Parent Onboarding</div>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--calix-ink)]">Coach setup</h1>
          </div>
          <div className="rounded-full bg-white px-3 py-2 text-sm font-black text-[var(--calix-ink)]">0{step + 1}/03</div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.section key="parent-step-0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
              <div>
                <h2 className="text-2xl font-black text-[var(--calix-ink)]">Consent</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/62">I understand CaliX is a guided fitness demo for children and I will supervise movement appropriately.</p>
              </div>
              <label className="flex items-start gap-3 rounded-[24px] bg-white p-4 shadow-sm">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-5 w-5" />
                <span className="text-sm leading-6 text-[var(--calix-ink)]/72">I consent to using CaliX as a parent or guardian for demo purposes.</span>
              </label>
              <button type="button" disabled={!consent} onClick={() => setStep(1)} className="min-h-12 w-full rounded-full bg-[var(--calix-accent)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white disabled:opacity-40">
                Continue
              </button>
            </motion.section>
          ) : null}

          {step === 1 ? (
            <motion.section key="parent-step-1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
              <div>
                <h2 className="text-2xl font-black text-[var(--calix-ink)]">Safety explainer</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/62">A premium calm summary of the myths most parents worry about.</p>
              </div>
              <div className="grid gap-3">
                {mythCards.map((card) => (
                  <div key={card.title} className="rounded-[24px] bg-white p-4 shadow-sm">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--calix-accent)]">{card.title}</div>
                    <div className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/72">{card.blurb}</div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setStep(2)} className="min-h-12 w-full rounded-full bg-[var(--calix-accent)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white">
                Continue
              </button>
            </motion.section>
          ) : null}

          {step === 2 ? (
            <motion.section key="parent-step-2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
              <div>
                <h2 className="text-2xl font-black text-[var(--calix-ink)]">Create your kid profile</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/62">For the demo, we instantly prepare a linked profile and code-based flow.</p>
              </div>
              <input value={childName} onChange={(event) => setChildName(event.target.value)} className="min-h-12 w-full rounded-[22px] border border-[var(--calix-line)] bg-white px-4 text-[var(--calix-ink)]" aria-label="Child name" />
              <div className="rounded-[28px] bg-[var(--calix-ink)] px-5 py-5 text-white">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Demo Invite Code</div>
                <div className="mt-3 text-4xl font-black tracking-[0.28em]">AARAV5</div>
                <div className="mt-2 text-sm text-white/72">Your kid can enter this in the kid sign-in demo flow.</div>
              </div>
              <button type="button" onClick={finish} className="min-h-12 w-full rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#4f72ff_58%,#ffcf54_100%)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white">
                Finish setup
              </button>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
