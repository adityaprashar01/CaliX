"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useKidStore, useSessionStore } from "@/lib/store";

export default function KidSignInPage() {
  const router = useRouter();
  const setRole = useSessionStore((state) => state.setRole);
  const onboarded = useKidStore((state) => state.onboarded);
  const [code, setCode] = useState("AARAV5");

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-6 shadow-[var(--calix-shadow)] text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Kid Entry</div>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--calix-ink)]">Enter your club code</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--calix-ink)]/62">Type your 6-character invite and jump straight into training.</p>
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase().slice(0, 6))}
          className="mt-6 min-h-14 w-full rounded-[22px] border border-[var(--calix-line)] bg-white px-4 text-center text-2xl font-black uppercase tracking-[0.28em] text-[var(--calix-ink)]"
          aria-label="Kid invite code"
          inputMode="text"
          autoComplete="one-time-code"
        />
        <button
          type="button"
          onClick={() => {
            setRole("kid");
            router.push(onboarded ? "/hub" : "/onboarding");
          }}
          className="mt-5 min-h-12 w-full rounded-full bg-[var(--calix-accent)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white"
        >
          Join the club
        </button>
      </div>
    </main>
  );
}
