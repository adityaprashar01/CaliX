"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("priya+demo@calix.app");

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-6 shadow-[var(--calix-shadow)]">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Parent Sign-In</div>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--calix-ink)]">Magic link demo</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--calix-ink)]/62">Enter your parent email and we&apos;ll send a premium club access link.</p>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-6 min-h-12 w-full rounded-[22px] border border-[var(--calix-line)] bg-white px-4 text-base text-[var(--calix-ink)]"
          aria-label="Parent email"
        />
        <button
          type="button"
          onClick={() => router.push(`/sign-in/check-email?email=${encodeURIComponent(email)}`)}
          className="mt-5 min-h-12 w-full rounded-full bg-[var(--calix-accent)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white"
        >
          Send magic link
        </button>
        <Link href="/sign-in/kid" className="mt-4 block text-center text-sm font-semibold text-[var(--calix-ink)]/62">
          Kid with a code? Enter here.
        </Link>
      </div>
    </main>
  );
}
