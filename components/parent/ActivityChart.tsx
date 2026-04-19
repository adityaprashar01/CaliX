import { demoWeek, type DemoDay } from "@/lib/data/demoWeek";

type ActivityChartProps = {
  data?: DemoDay[];
  highlightDay?: DemoDay["day"];
};

export function ActivityChart({ data = demoWeek, highlightDay }: ActivityChartProps) {
  const maxMinutes = Math.max(...data.map((item) => item.minutes), 1);

  return (
    <div className="rounded-[30px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-5 shadow-[var(--calix-shadow)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--calix-ink)]/72">Activity Minutes</h2>
        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--calix-ink)]/45">Last 7 Days</span>
      </div>
      <div className="flex h-40 items-end justify-between gap-3">
        {data.map((item) => {
          const height = `${Math.max((item.minutes / maxMinutes) * 100, item.minutes === 0 ? 8 : 18)}%`;
          const isHighlighted = item.day === highlightDay;

          return (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-30 w-full items-end justify-center rounded-[22px] bg-[rgba(255,255,255,0.78)] p-1">
                <div
                  className="w-full rounded-[18px] transition-all"
                  style={{
                    height,
                    background: isHighlighted
                      ? "linear-gradient(180deg, #3159ff 0%, #ffcf54 100%)"
                      : item.completed
                        ? "linear-gradient(180deg, rgba(47,191,113,1) 0%, rgba(117,223,160,1) 100%)"
                        : "rgba(15, 28, 63, 0.14)",
                  }}
                />
              </div>
              <div className={`text-xs font-bold ${isHighlighted ? "text-[var(--calix-accent)]" : "text-[var(--calix-ink)]/60"}`}>{item.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
