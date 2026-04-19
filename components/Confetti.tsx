"use client";

const pieces = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${(index * 13) % 100}%`,
  delay: `${(index % 10) * 0.07}s`,
  duration: `${1 + (index % 5) * 0.12}s`,
  color: ["var(--calix-accent)", "var(--calix-joy)", "var(--calix-good)", "var(--calix-mobility)"][index % 4],
}));

export function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-[-10%] h-3 w-2 rounded-full"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            background: piece.color,
          }}
        />
      ))}
    </div>
  );
}
