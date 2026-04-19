export type Badge = {
  slug: string;
  title: string;
  icon: string;
  description: string;
};

export const badges: Badge[] = [
  { slug: "first-step", title: "First Step", icon: "🎯", description: "Completed the first quest." },
  { slug: "3-day-streak", title: "3-Day Streak", icon: "🔥", description: "Kept moving for three active days." },
  { slug: "core-starter", title: "Core Starter", icon: "💪", description: "Finished a Core Base quest." },
  { slug: "balance-beginner", title: "Balance Beginner", icon: "⚖️", description: "Finished a Balance quest." },
  { slug: "quick-learner", title: "Quick Learner", icon: "⚡", description: "Finished the fast quest challenge." },
  { slug: "week-warrior", title: "Week Warrior", icon: "👑", description: "Showed up strong through the week." },
];

export function getBadgeBySlug(slug: string) {
  return badges.find((badge) => badge.slug === slug);
}
