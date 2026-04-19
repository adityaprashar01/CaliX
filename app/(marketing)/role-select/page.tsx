"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useKidStore, useParentStore, useSessionStore } from "@/lib/store";

const roles = [
  {
    id: "kid" as const,
    label: "I'm a Kid",
    icon: "🧒",
    title: "Athlete Mode",
    detail: "Fast, gamey, full of badges and quests.",
    accent: "linear-gradient(135deg, #3159ff 0%, #6281ff 100%)",
    enabled: true,
  },
  {
    id: "parent" as const,
    label: "I'm a Parent",
    icon: "👨‍👩‍👧",
    title: "Coach View",
    detail: "Calm weekly insight, progress, and safety-first storytelling.",
    accent: "linear-gradient(135deg, #0f1c3f 0%, #22346c 100%)",
    enabled: true,
  },
  {
    id: null,
    label: "School / Teacher",
    icon: "🏫",
    title: "Coming Soon",
    detail: "Club programs and classroom movement lanes are next.",
    accent: "linear-gradient(135deg, #dadde8 0%, #eff1f7 100%)",
    enabled: false,
  },
] as const;

export default function RoleSelectPage() {
  const router = useRouter();
  const setRole = useSessionStore((state) => state.setRole);

  const handleSelect = (role: "kid" | "parent") => {
    setRole(role);
    if (role === "kid") {
      const onboarded = useKidStore.getState().onboarded;
      router.push(onboarded ? "/hub" : "/onboarding");
      return;
    }

    const onboarded = useParentStore.getState().onboarded;
    router.push(onboarded ? "/parent/hub" : "/parent/onboarding");
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <div className="inline-flex rounded-full border border-white/70 bg-white/72 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[var(--calix-ink)]/65 shadow-[var(--calix-shadow)]">
            Who&apos;s using CaliX?
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-[var(--calix-ink)]">Pick your lane</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--calix-ink)]/62">Every role gets its own premium club experience.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {roles.map((role, index) => (
            <motion.button
              key={role.title}
              type="button"
              disabled={!role.enabled}
              onClick={() => role.id && handleSelect(role.id)}
              className={`overflow-hidden rounded-[30px] border border-[var(--calix-line)] bg-white text-left shadow-[var(--calix-shadow)] ${role.enabled ? "" : "opacity-55"}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileTap={role.enabled ? { scale: 0.985 } : undefined}
            >
              <div className="p-1">
                <div className="rounded-[26px] p-5" style={{ background: role.accent }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`text-[10px] font-black uppercase tracking-[0.24em] ${role.enabled ? "text-white/70" : "text-[var(--calix-ink)]/45"}`}>{role.title}</div>
                      <div className={`mt-2 text-2xl font-black ${role.enabled ? "text-white" : "text-[var(--calix-ink)]"}`}>{role.label}</div>
                      <div className={`mt-2 text-sm leading-6 ${role.enabled ? "text-white/82" : "text-[var(--calix-ink)]/62"}`}>{role.detail}</div>
                    </div>
                    <div className="text-5xl">{role.icon}</div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
