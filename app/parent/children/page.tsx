"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParentStore } from "@/lib/store";

export default function ParentChildrenPage() {
  const { children, childName, selectChild } = useParentStore();

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <motion.section className="rounded-[36px] bg-[var(--calix-ink)] px-5 py-6 text-white shadow-[var(--calix-shadow)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Child Switcher</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">Choose your athlete</h1>
          <p className="mt-3 text-sm leading-6 text-white/72">Switch between linked children without losing the calm parent view.</p>
        </motion.section>

        <section className="grid gap-3">
          {children.map((child, index) => {
            const active = child.name === childName;
            return (
              <motion.button
                key={child.id}
                type="button"
                onClick={() => selectChild(child.name)}
                className={`rounded-[28px] p-4 text-left shadow-sm ${active ? "bg-[var(--calix-accent)] text-white" : "border border-[var(--calix-line)] bg-[var(--calix-surface)] text-[var(--calix-ink)]"}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-black">{child.name}</div>
                    <div className={`mt-1 text-sm ${active ? "text-white/82" : "text-[var(--calix-ink)]/58"}`}>Level {child.level} • {child.focus}</div>
                  </div>
                  <div className={`rounded-[20px] px-3 py-2 text-center ${active ? "bg-white/16" : "bg-white"}`}>
                    <div className={`text-[10px] font-black uppercase tracking-[0.18em] ${active ? "text-white/58" : "text-[var(--calix-ink)]/45"}`}>Streak</div>
                    <div className="mt-1 text-xl font-black">{child.streak}</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </section>

        <Link href="/parent/hub" className="flex items-center justify-center rounded-full bg-[var(--calix-ink)] px-5 py-4 font-black uppercase tracking-[0.16em] text-white shadow-[var(--calix-shadow)]">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
