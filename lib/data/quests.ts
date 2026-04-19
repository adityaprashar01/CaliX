export type Exercise = {
  order: number;
  name: string;
  instruction: string;
  durationSeconds: number;
  reps?: string;
  safetyCue: string;
  emoji: string;
};

export type Quest = {
  slug: string;
  title: string;
  category: string;
  durationSeconds: number;
  difficulty: "easy" | "medium";
  skillPathSlug: "core-base" | "balance" | "mobility";
  xpReward: number;
  safetyScore: number;
  exercises: Exercise[];
};

export const quests: Quest[] = [
  {
    slug: "core-base-starter",
    title: "Core Base Starter",
    category: "Core Base",
    durationSeconds: 180,
    difficulty: "easy",
    skillPathSlug: "core-base",
    xpReward: 30,
    safetyScore: 9.8,
    exercises: [
      {
        order: 1,
        name: "Plank Hold",
        instruction: "Hold a strong plank with shoulders stacked over elbows.",
        durationSeconds: 30,
        safetyCue: "Keep hips level, don't let them sag.",
        emoji: "💪",
      },
      {
        order: 2,
        name: "Dead Bug",
        instruction: "Alternate opposite arm and leg slowly, one side at a time.",
        durationSeconds: 30,
        reps: "alternate reps",
        safetyCue: "Press lower back into the floor the whole time.",
        emoji: "🐞",
      },
      {
        order: 3,
        name: "Bird Dog",
        instruction: "From hands and knees, reach one arm and the opposite leg long.",
        durationSeconds: 30,
        reps: "steady reps",
        safetyCue: "Reach far and stay controlled — don't rush.",
        emoji: "🐦",
      },
      {
        order: 4,
        name: "Glute Bridge",
        instruction: "Lift your hips up, pause, then lower with control.",
        durationSeconds: 30,
        safetyCue: "Squeeze glutes at the top and keep knees pointing forward.",
        emoji: "🌉",
      },
      {
        order: 5,
        name: "Knee Tuck Balance",
        instruction: "Stand on one foot and lift the other knee to hip height.",
        durationSeconds: 30,
        safetyCue: "Stand tall like a tree and keep your eyes forward.",
        emoji: "🌳",
      },
      {
        order: 6,
        name: "Relaxed Breathing",
        instruction: "Breathe in through your nose and out through your mouth.",
        durationSeconds: 30,
        safetyCue: "Slow in, slow out — let your shoulders relax.",
        emoji: "🌬️",
      },
    ],
  },
  {
    slug: "balance-beginner",
    title: "Balance Beginner",
    category: "Balance",
    durationSeconds: 180,
    difficulty: "easy",
    skillPathSlug: "balance",
    xpReward: 30,
    safetyScore: 9.7,
    exercises: [
      {
        order: 1,
        name: "Tree Pose",
        instruction: "Balance on one foot and press the other foot lightly against your leg.",
        durationSeconds: 30,
        reps: "15s each side",
        safetyCue: "Keep your standing knee soft and your chest lifted.",
        emoji: "⚖️",
      },
      {
        order: 2,
        name: "Heel-to-Toe Walk",
        instruction: "Walk in a straight line, placing heel right in front of toe.",
        durationSeconds: 30,
        safetyCue: "Take small steps and look ahead, not down.",
        emoji: "👣",
      },
      {
        order: 3,
        name: "Single Leg Stand",
        instruction: "Lift one foot a little off the floor and hold steady.",
        durationSeconds: 30,
        safetyCue: "Tighten your tummy and stay tall through your spine.",
        emoji: "🦩",
      },
      {
        order: 4,
        name: "Half Squat Hold",
        instruction: "Sit back into a tiny squat and freeze like a statue.",
        durationSeconds: 30,
        safetyCue: "Keep knees over toes and weight in the middle of your feet.",
        emoji: "🏋️",
      },
      {
        order: 5,
        name: "Stork Reach",
        instruction: "Balance on one foot and reach forward with both hands.",
        durationSeconds: 30,
        safetyCue: "Move slowly and keep your hips facing forward.",
        emoji: "🪽",
      },
      {
        order: 6,
        name: "Deep Breathing",
        instruction: "Finish by taking calm, deep breaths while standing tall.",
        durationSeconds: 30,
        safetyCue: "Breathe low into your belly and relax your jaw.",
        emoji: "🫁",
      },
    ],
  },
  {
    slug: "quick-core-battle",
    title: "Quick Core Battle",
    category: "Core Base",
    durationSeconds: 120,
    difficulty: "medium",
    skillPathSlug: "core-base",
    xpReward: 25,
    safetyScore: 9.6,
    exercises: [
      {
        order: 1,
        name: "Hollow Hold",
        instruction: "Lie back, lift arms and legs a little, and stay tight like a banana.",
        durationSeconds: 30,
        safetyCue: "Keep your lower back gently pressed into the floor.",
        emoji: "🍌",
      },
      {
        order: 2,
        name: "Mountain Climbers",
        instruction: "Drive knees forward one at a time with light, quick steps.",
        durationSeconds: 30,
        reps: "steady reps",
        safetyCue: "Keep shoulders over wrists and land softly.",
        emoji: "⛰️",
      },
      {
        order: 3,
        name: "Side Plank",
        instruction: "Hold your body in a straight line on one forearm.",
        durationSeconds: 30,
        reps: "15s each side",
        safetyCue: "Push the floor away and keep your hips lifted.",
        emoji: "🛡️",
      },
      {
        order: 4,
        name: "Bear Hold",
        instruction: "Hover your knees just off the floor and stay super still.",
        durationSeconds: 30,
        safetyCue: "Keep your back flat and knees under hips.",
        emoji: "🐻",
      },
    ],
  },
  {
    slug: "mobility-flow",
    title: "Mobility Flow",
    category: "Mobility",
    durationSeconds: 240,
    difficulty: "easy",
    skillPathSlug: "mobility",
    xpReward: 40,
    safetyScore: 9.9,
    exercises: [
      {
        order: 1,
        name: "Cat-Cow Stretch",
        instruction: "Round and arch your back slowly while breathing smoothly.",
        durationSeconds: 40,
        safetyCue: "Move one vertebra at a time and don't force the stretch.",
        emoji: "🐈",
      },
      {
        order: 2,
        name: "World's Greatest Stretch",
        instruction: "Step into a lunge and open your chest toward the front leg.",
        durationSeconds: 40,
        reps: "20s each side",
        safetyCue: "Keep your front heel down and breathe through the stretch.",
        emoji: "🌍",
      },
      {
        order: 3,
        name: "Hip Openers",
        instruction: "Sit tall and switch your knees side to side with control.",
        durationSeconds: 40,
        safetyCue: "Move from the hips and keep your chest proud.",
        emoji: "🌀",
      },
      {
        order: 4,
        name: "Shoulder Reach-Through",
        instruction: "From all fours, slide one arm under your body and reach long.",
        durationSeconds: 40,
        reps: "20s each side",
        safetyCue: "Let the stretch come from your upper back, not your neck.",
        emoji: "🧵",
      },
      {
        order: 5,
        name: "Squat Pry",
        instruction: "Drop into a deep squat and gently press your knees outward.",
        durationSeconds: 40,
        safetyCue: "Keep your heels grounded and chest lifted.",
        emoji: "🪑",
      },
      {
        order: 6,
        name: "Reach and Breathe",
        instruction: "Stand tall, reach overhead, and finish with calm breaths.",
        durationSeconds: 40,
        safetyCue: "Lengthen through your ribs without leaning backward.",
        emoji: "🤸",
      },
    ],
  },
];

export function getQuestBySlug(slug: string) {
  return quests.find((quest) => quest.slug === slug);
}
