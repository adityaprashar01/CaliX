"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useKidStore, useSessionStore } from "@/lib/store";

const tabs = [
  { label: "Hub", href: "/hub", icon: "🏠", enabled: true },
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
      className="fixed right-4 top-4 z-50 min-h-11 rounded-full bg-[var(--calix-ink)] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--calix-joy)]"
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
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--calix-ink)]/10 bg-white/95 px-3 pb-4 pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2">
          {tabs.map((tab) => {
            const isActive = tab.href === activeHref;
            const className = `flex min-h-11 flex-1 flex-col items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold transition ${
              isActive
                ? "bg-[var(--calix-soft)] text-[var(--calix-accent)]"
                : "text-[var(--calix-ink)]/65 hover:bg-[var(--calix-soft)]/70"
            }`;

            if (tab.enabled) {
              return (
                <Link key={tab.label} href={tab.href} className={className}>
                  <span aria-hidden="true">{tab.icon}</span>
                  <span>{tab.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={tab.label}
                type="button"
                className={className}
                onClick={() => setSheetTitle(tab.label)}
              >
                <span aria-hidden="true">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <AnimatePresence>
        {sheetTitle ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-[var(--calix-ink)]/35"
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
              <h3 className="text-xl font-bold text-[var(--calix-ink)]">{sheetTitle}</h3>
              <p className="mt-2 text-sm text-[var(--calix-ink)]/65">Coming soon for the next CaliX adventure.</p>
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
