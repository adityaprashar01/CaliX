import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Role = "kid" | "parent" | null;
type AgeBucket = "6-9" | "10-12" | "13-15" | null;
type AvatarColor = "blue" | "green" | "purple" | "orange" | "pink";
type AvatarStyle = "striker" | "balancer" | "mover";
type GoalType = "stronger" | "balance" | "flexible" | "fun" | null;

type SessionStore = {
  role: Role;
  setRole: (role: Role) => void;
};

type KidOnboardingInput = {
  displayName: string;
  ageBucket: Exclude<AgeBucket, null>;
  avatarColor: AvatarColor;
  avatarStyle: AvatarStyle;
  goalType: Exclude<GoalType, null>;
};

type KidStore = {
  role: "kid";
  displayName: string;
  ageBucket: AgeBucket;
  avatarColor: AvatarColor;
  avatarStyle: AvatarStyle;
  goalType: GoalType;
  totalXp: number;
  streakDays: number;
  lastActivityIso: string | null;
  completedSlugs: string[];
  badgeSlugs: string[];
  onboarded: boolean;
  completeOnboarding: (data: KidOnboardingInput) => void;
  completeQuest: (slug: string, xp: number, maybeBadgeSlug?: string) => void;
  resetToDemo: () => void;
};

type ParentChild = {
  id: string;
  name: string;
  level: number;
  streak: number;
  focus: string;
};

type ParentStore = {
  email: string;
  childName: string;
  onboarded: boolean;
  children: ParentChild[];
  completeParentOnboarding: (childName?: string) => void;
  selectChild: (childName: string) => void;
  resetParentDemo: () => void;
};

const createStorage = () => createJSONStorage(() => localStorage);

const startOfTodayIso = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
};

const initialKidState = {
  role: "kid" as const,
  displayName: "",
  ageBucket: null,
  avatarColor: "blue" as AvatarColor,
  avatarStyle: "striker" as AvatarStyle,
  goalType: null,
  totalXp: 0,
  streakDays: 0,
  lastActivityIso: null,
  completedSlugs: [] as string[],
  badgeSlugs: [] as string[],
  onboarded: false,
};

const demoChildren: ParentChild[] = [
  { id: "aarav", name: "Aarav", level: 3, streak: 5, focus: "Core Base" },
  { id: "myra", name: "Myra", level: 2, streak: 3, focus: "Balance" },
];

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
    }),
    {
      name: "calix-session",
      storage: createStorage(),
    },
  ),
);

export const useKidStore = create<KidStore>()(
  persist(
    (set, get) => ({
      ...initialKidState,
      completeOnboarding: (data) =>
        set({
          displayName: data.displayName.trim() || "Aarav",
          ageBucket: data.ageBucket,
          avatarColor: data.avatarColor,
          avatarStyle: data.avatarStyle,
          goalType: data.goalType,
          onboarded: true,
        }),
      completeQuest: (slug, xp, maybeBadgeSlug) => {
        const state = get();
        const todayIso = startOfTodayIso();
        const alreadyActiveToday = state.lastActivityIso === todayIso;
        const nextCompletedSlugs = [...state.completedSlugs, slug];
        const nextBadgeSlugs = maybeBadgeSlug
          ? Array.from(new Set([...state.badgeSlugs, maybeBadgeSlug]))
          : state.badgeSlugs;

        set({
          totalXp: state.totalXp + xp,
          streakDays: alreadyActiveToday ? state.streakDays : state.streakDays + 1,
          lastActivityIso: todayIso,
          completedSlugs: nextCompletedSlugs,
          badgeSlugs: nextBadgeSlugs,
          onboarded: true,
        });
      },
      resetToDemo: () =>
        set({
          role: "kid",
          displayName: "Aarav",
          ageBucket: "10-12",
          avatarColor: "blue",
          avatarStyle: "striker",
          goalType: "stronger",
          totalXp: 285,
          streakDays: 5,
          lastActivityIso: startOfTodayIso(),
          completedSlugs: [
            "core-base-starter",
            "balance-beginner",
            "quick-core-battle",
            "mobility-flow",
            "core-base-starter:repeat",
          ],
          badgeSlugs: ["first-step", "core-starter"],
          onboarded: true,
        }),
    }),
    {
      name: "calix-kid",
      storage: createStorage(),
    },
  ),
);

export const useParentStore = create<ParentStore>()(
  persist(
    (set) => ({
      email: "priya+demo@calix.app",
      childName: "Aarav",
      onboarded: true,
      children: demoChildren,
      completeParentOnboarding: (childName) =>
        set({
          onboarded: true,
          childName: childName || "Aarav",
        }),
      selectChild: (childName) => set({ childName }),
      resetParentDemo: () =>
        set({
          email: "priya+demo@calix.app",
          childName: "Aarav",
          onboarded: true,
          children: demoChildren,
        }),
    }),
    {
      name: "calix-parent",
      storage: createStorage(),
    },
  ),
);

export type { AgeBucket, AvatarColor, AvatarStyle, GoalType, ParentChild };
