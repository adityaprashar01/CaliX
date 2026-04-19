type SafetyGaugeProps = {
  score: number;
};

export function SafetyGauge({ score }: SafetyGaugeProps) {
  const safeScore = Math.max(0, Math.min(score, 10));
  const radius = 44;
  const circumference = Math.PI * radius;
  const offset = circumference - (safeScore / 10) * circumference;

  return (
    <div className="rounded-[28px] border border-[var(--calix-line)] bg-white/90 p-3 shadow-[var(--calix-shadow)] backdrop-blur-sm">
      <svg viewBox="0 0 120 70" className="h-24 w-32" aria-label={`Safety score ${safeScore} out of 10`}>
        <path
          d="M 16 58 A 44 44 0 0 1 104 58"
          fill="none"
          stroke="rgba(15, 28, 63, 0.1)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 16 58 A 44 44 0 0 1 104 58"
          fill="none"
          stroke="url(#safetyGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="safetyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2fbf71" />
            <stop offset="100%" stopColor="#3159ff" />
          </linearGradient>
        </defs>
        <text x="60" y="38" textAnchor="middle" className="fill-[var(--calix-ink)] text-[22px] font-black">
          {safeScore.toFixed(1)}
        </text>
        <text x="60" y="56" textAnchor="middle" className="fill-[var(--calix-ink)]/58 text-[10px] font-bold uppercase tracking-[0.2em]">
          Safety
        </text>
      </svg>
    </div>
  );
}
