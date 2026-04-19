type CheckEmailPageProps = {
  searchParams?: Promise<{
    email?: string;
  }>;
};

export default async function CheckEmailPage({ searchParams }: CheckEmailPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const email = resolved?.email || "priya+demo@calix.app";

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md rounded-[36px] bg-[var(--calix-ink)] p-6 text-white shadow-[var(--calix-shadow)]">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Check your email</div>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">We sent a link</h1>
        <p className="mt-4 text-sm leading-7 text-white/74">A demo magic link is on the way to <span className="font-black">{email}</span>.</p>
        <a href="/auth/callback" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#3159ff_0%,#4f72ff_58%,#ffcf54_100%)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white">
          Simulate open link
        </a>
      </div>
    </main>
  );
}
