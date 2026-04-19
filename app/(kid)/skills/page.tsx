"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BottomNav } from "@/components/kid/BottomNav";
import { quests } from "@/lib/data/quests";
import { skillPaths, type SkillNode, type SkillPathSlug } from "@/lib/data/skillTree";
import { useKidStore } from "@/lib/store";

function getQuestHref(pathSlug: SkillPathSlug) {
  return quests.find((quest) => quest.skillPathSlug === pathSlug)?.slug ?? "core-base-starter";
}

export default function SkillsPage() {
  const router = useRouter();
  const totalXp = useKidStore((state) => state.totalXp);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const currentNodeIds = useMemo(() => {
    return new Set(
      skillPaths
        .map((path) => path.nodes.find((node, index) => totalXp < node.unlockXp && (index === 0 || totalXp >= path.nodes[index - 1]!.unlockXp))?.id)
        .filter((value): value is string => Boolean(value)),
    );
  }, [totalXp]);

  return (
    <main className="min-h-screen px-4 pb-28 pt-8">
      <div className="mx-auto max-w-5xl rounded-[36px] bg-[var(--calix-ink)] p-5 text-white shadow-[var(--calix-shadow)]">
        <div className="text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/58">Club Progression</div>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em]">Skill Tree</h1>
          <p className="mt-2 text-sm leading-6 text-white/68">See what unlocks next and how your training path branches across strength, balance, and mobility.</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {skillPaths.map((path) => (
            <section key={path.slug} className="rounded-[28px] bg-white/8 p-3 backdrop-blur-sm">
              <Link href={`/skills/${path.slug}`} className="mb-4 block text-center text-xs font-black uppercase tracking-[0.18em]" style={{ color: path.color }}>
                {path.title}
              </Link>
              <div className="flex flex-col items-center gap-1">
                {path.nodes.map((node, index) => {
                  const unlocked = totalXp >= node.unlockXp;
                  const isCurrent = currentNodeIds.has(node.id);

                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      {index > 0 ? <div className="h-6 w-1 rounded-full" style={{ backgroundColor: path.color, opacity: unlocked ? 0.9 : 0.18 }} /> : null}
                      <button
                        type="button"
                        onClick={() => setSelectedNode(node)}
                        className="flex flex-col items-center"
                        aria-label={`${node.title} unlocks at ${node.unlockXp} XP`}
                      >
                        <motion.div
                          className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl shadow-sm ${
                            unlocked ? "opacity-100" : isCurrent ? "opacity-100" : "opacity-56"
                          }`}
                          style={{
                            backgroundColor: unlocked ? path.color : isCurrent ? "#ffffff" : "rgba(255,255,255,0.18)",
                            borderColor: isCurrent ? path.color : "transparent",
                            color: unlocked ? "white" : isCurrent ? "var(--calix-ink)" : "white",
                          }}
                          animate={isCurrent ? { scale: [1, 1.08, 1] } : undefined}
                          transition={isCurrent ? { repeat: Number.POSITIVE_INFINITY, duration: 1.4 } : undefined}
                        >
                          {unlocked ? node.icon : isCurrent ? node.icon : "🔒"}
                        </motion.div>
                        <span className="mt-2 text-center text-[10px] font-black leading-tight text-white">{node.title}</span>
                        <span className="text-[9px] text-white/46">{node.unlockXp} XP</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedNode ? (
          <motion.div className="fixed inset-0 z-50 flex items-end bg-[var(--calix-ink)]/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedNode(null)}>
            <motion.div
              className="w-full rounded-t-[32px] bg-white p-6 text-center shadow-2xl"
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="text-5xl">{selectedNode.icon}</div>
              <h3 className="mt-3 text-xl font-black text-[var(--calix-ink)]">{selectedNode.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--calix-ink)]/60">Unlock at {selectedNode.unlockXp} XP</p>
              {currentNodeIds.has(selectedNode.id) ? (
                <button
                  type="button"
                  onClick={() => router.push(`/quest/${getQuestHref(selectedNode.pathSlug)}`)}
                  className="mt-5 min-h-11 rounded-full bg-[var(--calix-accent)] px-5 py-3 font-black uppercase tracking-[0.16em] text-white"
                >
                  Start next quest
                </button>
              ) : null}
              <button type="button" onClick={() => setSelectedNode(null)} className="mt-3 min-h-11 rounded-full bg-[var(--calix-soft)] px-5 py-3 font-semibold text-[var(--calix-ink)]">
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <BottomNav />
    </main>
  );
}
