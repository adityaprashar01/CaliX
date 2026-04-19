export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1
        className="text-5xl font-extrabold tracking-tight sm:text-6xl"
        style={{ color: "var(--calix-ink)" }}
      >
        CaliX
      </h1>
      <p
        className="mt-4 text-xl font-medium sm:text-2xl"
        style={{ color: "var(--calix-accent)" }}
      >
        Level Up Your Body
      </p>
      <p
        className="mt-6 max-w-md text-lg"
        style={{ color: "var(--calix-ink)", opacity: 0.7 }}
      >
        India&apos;s first digital calisthenics platform for children. Build
        strength, balance, and flexibility through guided quests.
      </p>
      <div className="mt-10">
        <a
          href="/role-select"
          className="inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: "var(--calix-accent)" }}
          aria-label="Get started with CaliX"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
