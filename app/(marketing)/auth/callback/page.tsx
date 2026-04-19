"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParentStore, useSessionStore } from "@/lib/store";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    useSessionStore.getState().setRole("parent");
    const parentStore = useParentStore.getState();
    router.replace(parentStore.onboarded ? "/parent/hub" : "/parent/onboarding");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="rounded-[36px] bg-[var(--calix-ink)] px-6 py-8 text-white shadow-[var(--calix-shadow)]">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Authenticating</div>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">Opening coach view…</h1>
      </div>
    </main>
  );
}
