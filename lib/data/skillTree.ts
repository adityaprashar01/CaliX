export type SkillPathSlug = "core-base" | "balance" | "mobility";

export type SkillNode = {
  id: string;
  title: string;
  unlockXp: number;
  icon: string;
  pathSlug: SkillPathSlug;
  order: number;
};

export type SkillPath = {
  slug: SkillPathSlug;
  title: string;
  color: string;
  nodes: SkillNode[];
};

export const skillPaths: SkillPath[] = [
  {
    slug: "core-base",
    title: "Core Base",
    color: "var(--calix-core)",
    nodes: [
      { id: "core-1", title: "First Plank", unlockXp: 0, icon: "💪", pathSlug: "core-base", order: 1 },
      { id: "core-2", title: "Steady Core", unlockXp: 50, icon: "🛡️", pathSlug: "core-base", order: 2 },
      { id: "core-3", title: "Core Warrior", unlockXp: 150, icon: "⚔️", pathSlug: "core-base", order: 3 },
      { id: "core-4", title: "Core Master", unlockXp: 300, icon: "🏆", pathSlug: "core-base", order: 4 },
      { id: "core-5", title: "Core Legend", unlockXp: 500, icon: "🌟", pathSlug: "core-base", order: 5 },
    ],
  },
  {
    slug: "balance",
    title: "Balance",
    color: "var(--calix-balance)",
    nodes: [
      { id: "balance-1", title: "First Balance", unlockXp: 0, icon: "⚖️", pathSlug: "balance", order: 1 },
      { id: "balance-2", title: "Steady Steps", unlockXp: 50, icon: "👣", pathSlug: "balance", order: 2 },
      { id: "balance-3", title: "Balance Warrior", unlockXp: 150, icon: "🦩", pathSlug: "balance", order: 3 },
      { id: "balance-4", title: "Balance Master", unlockXp: 300, icon: "🎯", pathSlug: "balance", order: 4 },
      { id: "balance-5", title: "Balance Legend", unlockXp: 500, icon: "👑", pathSlug: "balance", order: 5 },
    ],
  },
  {
    slug: "mobility",
    title: "Mobility",
    color: "var(--calix-mobility)",
    nodes: [
      { id: "mobility-1", title: "First Stretch", unlockXp: 0, icon: "🤸", pathSlug: "mobility", order: 1 },
      { id: "mobility-2", title: "Loose Moves", unlockXp: 50, icon: "🌀", pathSlug: "mobility", order: 2 },
      { id: "mobility-3", title: "Mobility Warrior", unlockXp: 150, icon: "🌈", pathSlug: "mobility", order: 3 },
      { id: "mobility-4", title: "Mobility Master", unlockXp: 300, icon: "🧘", pathSlug: "mobility", order: 4 },
      { id: "mobility-5", title: "Mobility Legend", unlockXp: 500, icon: "✨", pathSlug: "mobility", order: 5 },
    ],
  },
];
