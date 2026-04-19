import { demoWeek, type DemoDay } from "@/lib/data/demoWeek";

type ActivityChartProps = {
  data?: DemoDay[];
  highlightDay?: DemoDay["day"];
};

export function ActivityChart({ data = demoWeek, highlightDay }: ActivityChartProps) {
  const maxMinutes = Math.max(...data.map((item) => item.minutes), 1);

  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--calix-ink)]">Activity Minutes</h2>
        <span className="text-xs text-[var(--calix-ink)]/60">Last 7 days</span>
      </div>
      <div className="flex h-36 items-end justify-between gap-3">
        {data.map((item) => {
          const height = `${Math.max((item.minutes / maxMinutes) * 100, item.minutes === 0 ? 10 : 18)}%`;
          const isHighlighted = item.day === highlightDay;

          return (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end justify-center rounded-full bg-[var(--calix-soft)]/80 px-1 pb-1">
                <div
                  className="w-full rounded-full transition-all"
                  style={{
                    height,
                    background: isHighlighted
                      ? "var(--calix-accent)"
                      : item.completed
                        ? "var(--calix-good)"
                        : "rgba(15, 28, 63, 0.18)",
                  }}
                />
              </div>
              <div className="text-xs font-semibold text-[var(--calix-ink)]/70">{item.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
