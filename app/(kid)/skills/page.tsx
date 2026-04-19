"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useKidStore } from "@/lib/store";
import { skillPaths } from "@/lib/data/skillTree";
import { BottomNav } from "@/components/kid/BottomNav";

export default function SkillsPage() {
  const totalXp = useKidStore((s) => s.totalXp);

  return (
    <main className="min-h-screen bg-calix-bg px-4 pb-24 pt-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-calix-ink">Skill Tree</h1>
      <div className="grid grid-cols-3 gap-3">
        {skillPaths.map((path) => (
          <div key={path.slug} className="flex flex-col items-center gap-1">
            <h3 className="mb-2 text-xs font-bold" style={{ color: path.color }}>{path.name}</h3>
            {path.nodes.map((node, i) => {
              const unlocked = totalXp >= node.unlockXp;
              const prevUnlocked = i === 0 || totalXp >= path.nodes[i - 1]!.unlockXp;
              const isCurrent = !unlocked && prevUnlocked;

              return (
                <div key={node.id} className="flex flex-col items-center">
                  {i > 0 && <div className="h-4 w-0.5" style={{ backgroundColor: unlocked ? path.color : "#EEF1FF" }} />}
                  <Link href={unlocked || isCurrent ? "/quest/core-base-starter" : "#"} aria-label={`${node.title} - ${unlocked ? "unlocked" : isCurrent ? "current" : "locked"}`}>
                    <motion.div
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${unlocked ? "shadow-lg" : isCurrent ? "ring-2" : "opacity-50"}`}
                      style={{ backgroundColor: unlocked ? path.color : isCurrent ? "white" : "#EEF1FF", ringColor: isCurrent ? path.color : undefined }}
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : undefined}
                      transition={isCurrent ? { repeat: Infinity, duration: 1.5 } : undefined}
                    >
                      {unlocked ? node.icon : isCurrent ? node.icon : "🔒"}
                    </motion.div>
                  </Link>
                  <span className="mt-0.5 text-center text-[9px] leading-tight text-calix-ink/60">{node.title}</span>
                  <span className="text-[8px] text-calix-ink/40">{node.unlockXp} XP</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <BottomNav />
    </main>
  );
}
