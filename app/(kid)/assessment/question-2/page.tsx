import Link from "next/link";

const options = [
  { label: "I prefer short focused sessions", beginnerHref: "/assessment/result-beginner", advancedHref: "/assessment/result-beginner" },
  { label: "I can stay locked in for a full challenge", beginnerHref: "/assessment/result-beginner", advancedHref: "/assessment/result-advanced" },
] as const;

type AssessmentQuestionTwoPageProps = {
  searchParams?: Promise<{
    track?: string;
  }>;
};

export default async function AssessmentQuestionTwoPage({ searchParams }: AssessmentQuestionTwoPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const track = resolved?.track === "advanced" ? "advanced" : "beginner";

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md space-y-5">
        <section className="rounded-[36px] border border-[var(--calix-line)] bg-[var(--calix-surface)] px-6 py-6 shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Assessment Question 2</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--calix-ink)]">What kind of pace feels best?</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--calix-ink)]/62">This helps us pick your first growth track.</p>
        </section>

        <div className="grid gap-3">
          {options.map((option) => (
            <Link
              key={option.label}
              href={track === "advanced" ? option.advancedHref : option.beginnerHref}
              className="rounded-[28px] bg-white px-5 py-4 text-left text-sm font-black leading-6 text-[var(--calix-ink)] shadow-[var(--calix-shadow)]"
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
