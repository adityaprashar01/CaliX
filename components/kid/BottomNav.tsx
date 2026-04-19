"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useKidStore, useSessionStore } from "@/lib/store";

const tabs = [
  { label: "Hub", href: "/hub", icon: "🏟️" },
  { label: "Skills", href: "/skills", icon: "🌳" },
  { label: "Challenges", href: "/challenges", icon: "⚔️" },
  { label: "Friends", href: "/friends", icon: "👯" },
  { label: "Profile", href: "/profile", icon: "🧢" },
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
  const activeHref = useMemo(() => {
    if (pathname === "/skills") return "/skills";
    if (pathname === "/challenges") return "/challenges";
    if (pathname === "/friends") return "/friends";
    if (pathname === "/profile") return "/profile";
    return "/hub";
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2 rounded-[28px] border border-[var(--calix-line)] bg-[var(--calix-surface)] px-2 py-2 shadow-[var(--calix-shadow)] backdrop-blur-lg">
        {tabs.map((tab) => {
          const isActive = tab.href === activeHref;
          const className = `flex min-h-11 flex-1 flex-col items-center justify-center rounded-[22px] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition ${
            isActive ? "bg-[var(--calix-ink)] text-white" : "text-[var(--calix-ink)]/58 hover:bg-white/70"
          }`;

          return (
            <Link key={tab.label} href={tab.href} className={className}>
              <span aria-hidden="true" className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
