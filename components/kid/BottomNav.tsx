"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useKidStore, useSessionStore } from "@/lib/store";

const tabs = [
  { label: "Hub", href: "/hub", icon: "🏟️", enabled: true },
  { label: "Skills", href: "/skills", icon: "🌳", enabled: true },
  { label: "Friends", href: "#", icon: "👯", enabled: false },
  { label: "Profile", href: "#", icon: "🧢", enabled: false },
] as const;

export function ResetDemoButton() {
  const router = useRouter();
  const setRole = useSessionStore((state) => state.setRole);
  const resetToDemo = useKidStore((state) => state.resetToDemo);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        resetToDemo();
        setRole(null);
        router.push("/role-select");
      }}
      className="fixed right-4 top-4 z-50 min-h-11 rounded-full border border-white/60 bg-[var(--calix-ink)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[var(--calix-shadow)] transition hover:scale-[1.02]"
    >
      Reset Demo
    </button>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const [sheetTitle, setSheetTitle] = useState<string | null>(null);
  const activeHref = useMemo(() => (pathname === "/skills" ? "/skills" : "/hub"), [pathname]);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2 rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] px-2 py-2 shadow-[var(--calix-shadow)] backdrop-blur-lg">
          {tabs.map((tab) => {
            const isActive = tab.href === activeHref;
            const className = `flex min-h-11 flex-1 flex-col items-center justify-center rounded-[22px] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition ${
              isActive
                ? "bg-[var(--calix-ink)] text-white"
                : "text-[var(--calix-ink)]/58 hover:bg-white/70"
            }`;

            if (tab.enabled) {
              return (
                <Link key={tab.label} href={tab.href} className={className}>
                  <span aria-hidden="true" className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </Link>
              );
            }

            return (
              <button key={tab.label} type="button" className={className} onClick={() => setSheetTitle(tab.label)}>
                <span aria-hidden="true" className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <AnimatePresence>
        {sheetTitle ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-[var(--calix-ink)]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheetTitle(null)}
          >
            <motion.div
              className="w-full rounded-t-[32px] bg-white p-6 text-center shadow-2xl"
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[var(--calix-ink)]/10" />
              <div className="text-4xl">🏆</div>
              <h3 className="mt-3 text-xl font-black text-[var(--calix-ink)]">{sheetTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/62">Coming soon in the next CaliX club release.</p>
              <button
                type="button"
                onClick={() => setSheetTitle(null)}
                className="mt-5 min-h-11 rounded-full bg-[var(--calix-accent)] px-5 py-3 font-semibold text-white"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
