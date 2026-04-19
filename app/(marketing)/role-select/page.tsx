"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useKidStore, useSessionStore } from "@/lib/store";

const roles = [
  { id: "kid" as const, label: "I'm a Kid", icon: "🧒", enabled: true },
  { id: "parent" as const, label: "I'm a Parent", icon: "👨‍👩‍👧", enabled: true },
  { id: null, label: "School / Teacher", icon: "🏫", enabled: false },
];

export default function RoleSelectPage() {
  const router = useRouter();
  const setRole = useSessionStore((s) => s.setRole);

  const handleSelect = (role: "kid" | "parent") => {
    setRole(role);
    if (role === "kid") {
      const onboarded = useKidStore.getState().onboarded;
      router.push(onboarded ? "/hub" : "/onboarding");
    } else {
      router.push("/parent/hub");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-calix-bg px-6">
      <motion.h1 className="mb-8 text-3xl font-bold text-calix-ink" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>Who&apos;s using CaliX?</motion.h1>
      <div className="flex w-full max-w-sm flex-col gap-4">
        {roles.map((r, i) => (
          <motion.button
            key={r.label}
            disabled={!r.enabled}
            onClick={() => r.id && handleSelect(r.id)}
            className={`flex items-center gap-4 rounded-2xl p-6 text-left shadow-md transition-all ${r.enabled ? "bg-white hover:shadow-lg active:scale-[0.97]" : "bg-white/50 opacity-50"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: r.enabled ? 1 : 0.5, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={r.enabled ? { scale: 0.95 } : undefined}
            type="button"
            aria-label={r.label}
          >
            <span className="text-4xl">{r.icon}</span>
            <div>
              <p className="text-lg font-semibold text-calix-ink">{r.label}</p>
              {!r.enabled && <p className="text-sm text-calix-ink/50">Coming soon</p>}
            </div>
          </motion.button>
        ))}
      </div>
    </main>
  );
}
