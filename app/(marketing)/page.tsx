"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useKidStore, useSessionStore } from "@/lib/store";

const emojis = ["💪", "⚖️", "🤸", "🌳"];

export default function LandingPage() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx((i) => (i + 1) % emojis.length), 1200); return () => clearInterval(t); }, []);

  const handleReset = () => {
    useKidStore.getState().resetToDemo();
    useSessionStore.getState().setRole(null);
    localStorage.removeItem("calix-kid");
    localStorage.removeItem("calix-session");
    window.location.href = "/";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-calix-bg px-6 text-center">
      <button onClick={handleReset} className="fixed right-4 top-4 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700" type="button">Reset Demo</button>
      <motion.h1 className="text-6xl font-extrabold tracking-tight text-calix-ink" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>CaliX</motion.h1>
      <motion.p className="mt-2 text-xl font-medium text-calix-accent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Build Your Base</motion.p>
      <div className="mt-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-calix-soft shadow-lg">
        <AnimatePresence mode="wait">
          <motion.span key={idx} className="text-7xl" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 30 }} transition={{ duration: 0.3 }}>{emojis[idx]}</motion.span>
        </AnimatePresence>
      </div>
      <Link href="/role-select" className="mt-10 inline-flex items-center rounded-full bg-calix-accent px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105 active:scale-95" aria-label="Get started">Next</Link>
      <p className="mt-6 max-w-xs text-sm text-calix-ink/60">India&apos;s first digital calisthenics platform for children</p>
    </main>
  );
}
