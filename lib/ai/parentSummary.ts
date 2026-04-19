import { createOpenRouterClient } from "@/lib/ai/client";
import { OPENROUTER_JSON_MODEL } from "@/lib/ai/models";

type WeekStats = {
  completions: number;
  totalMinutes: number;
  streakDays: number;
};

export type ParentSummaryInput = {
  childName: string;
  weekStats: WeekStats;
};

function fallbackSummary({ childName, weekStats }: ParentSummaryInput) {
  return `${childName} had a solid week — ${weekStats.completions} quests completed and ${weekStats.totalMinutes} active minutes, keeping a ${weekStats.streakDays}-day streak. Safety score stays strong at 9.8/10. This week's focus is core stability, which is the foundation for all future movement. Recommended next: try the Balance Beginner quest together tomorrow to build coordination alongside strength.`;
}

export async function getParentSummary({
  childName,
  weekStats,
}: ParentSummaryInput): Promise<string> {
  const client = createOpenRouterClient();

  if (!client) {
    return fallbackSummary({ childName, weekStats });
  }

  try {
    const completion = await client.chat.completions.create({
      model: OPENROUTER_JSON_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a warm, calm coach speaking to a parent about their child's fitness progress this week. Reference the actual numbers. Be reassuring about safety. End with one specific recommended next action. 80–120 words.",
        },
        {
          role: "user",
          content: `Child: ${childName}\nCompletions: ${weekStats.completions}\nTotal active minutes: ${weekStats.totalMinutes}\nStreak days: ${weekStats.streakDays}\nSafety score: 9.8/10`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content?.trim();
    return content || fallbackSummary({ childName, weekStats });
  } catch {
    return fallbackSummary({ childName, weekStats });
  }
}
