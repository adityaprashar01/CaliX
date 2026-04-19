type SafetyGaugeProps = {
  score: number;
};

export function SafetyGauge({ score }: SafetyGaugeProps) {
  const safeScore = Math.max(0, Math.min(score, 10));
  const radius = 44;
  const circumference = Math.PI * radius;
  const offset = circumference - (safeScore / 10) * circumference;

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <svg viewBox="0 0 120 70" className="h-24 w-32" aria-label={`Safety score ${safeScore} out of 10`}>
        <path
          d="M 16 58 A 44 44 0 0 1 104 58"
          fill="none"
          stroke="rgba(15, 28, 63, 0.12)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 16 58 A 44 44 0 0 1 104 58"
          fill="none"
          stroke="var(--calix-good)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text x="60" y="40" textAnchor="middle" className="fill-[var(--calix-ink)] text-[20px] font-bold">
          {safeScore.toFixed(1)}
        </text>
        <text x="60" y="58" textAnchor="middle" className="fill-[var(--calix-ink)]/60 text-[10px] font-medium">
          Safety
        </text>
      </svg>
    </div>
  );
}
