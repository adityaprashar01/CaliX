"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BottomNav } from "@/components/kid/BottomNav";
import { quests } from "@/lib/data/quests";
import { skillPaths } from "@/lib/data/skillTree";
import { useKidStore } from "@/lib/store";

export default function SkillPathDetailPage() {
  const params = useParams<{ pathSlug: string }>();
  const path = skillPaths.find((item) => item.slug === params.pathSlug) ?? skillPaths[0]!;
  const totalXp = useKidStore((state) => state.totalXp);
  const pathQuests = quests.filter((quest) => quest.skillPathSlug === path.slug);

  return (
    <main className="min-h-screen px-4 pb-28 pt-8">
      <div className="mx-auto max-w-md space-y-5">
        <section className="rounded-[36px] bg-[var(--calix-ink)] px-5 py-6 text-white shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: path.color }}>Your Journey</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">{path.title}</h1>
          <p className="mt-3 text-sm leading-6 text-white/72">Track every unlock, every quest, and every XP threshold in this path.</p>
          <div className="mt-5 rounded-[24px] bg-white/10 px-4 py-4">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/58">Current XP</div>
            <div className="mt-2 text-4xl font-black">{totalXp}</div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--calix-line)] bg-[var(--calix-surface)] p-5 shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Nodes</div>
          <div className="mt-4 space-y-3">
            {path.nodes.map((node) => {
              const unlocked = totalXp >= node.unlockXp;
              return (
                <div key={node.id} className="flex items-center justify-between rounded-[22px] bg-white px-4 py-3 shadow-sm">
                  <div>
                    <div className="text-sm font-black text-[var(--calix-ink)]">{node.title}</div>
                    <div className="text-xs text-[var(--calix-ink)]/52">Unlock at {node.unlockXp} XP</div>
                  </div>
                  <div className={`text-2xl ${unlocked ? '' : 'opacity-40'}`}>{unlocked ? node.icon : '🔒'}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--calix-line)] bg-white p-5 shadow-[var(--calix-shadow)]">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--calix-accent)]">Qualifying Quests</div>
          <div className="mt-4 space-y-3">
            {pathQuests.map((quest) => (
              <Link key={quest.slug} href={`/quest/${quest.slug}`} className="flex items-center justify-between rounded-[22px] bg-[var(--calix-soft)] px-4 py-3">
                <div>
                  <div className="text-sm font-black text-[var(--calix-ink)]">{quest.title}</div>
                  <div className="text-xs text-[var(--calix-ink)]/52">{quest.xpReward} XP • {quest.durationSeconds / 60} min</div>
                </div>
                <div className="text-xl">→</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
