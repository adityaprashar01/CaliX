import { createOpenRouterClient } from "@/lib/ai/client";
import { OPENROUTER_JSON_MODEL } from "@/lib/ai/models";

export type KidMessageInput = {
  name: string;
  questTitle: string;
  xp: number;
  streak: number;
};

export type KidMessageResult = {
  message: string;
  emoji: string;
};

export const kidFallbackPool: KidMessageResult[] = [
  { message: "You crushed it, champion! Keep going!", emoji: "💪" },
  {
    message: "That was awesome work — your core is getting stronger!",
    emoji: "⚡",
  },
  { message: "Another quest done! You're on fire!", emoji: "🔥" },
  {
    message: "Great moves! Your balance is improving every day!",
    emoji: "🌟",
  },
];

function randomFallback() {
  return kidFallbackPool[Math.floor(Math.random() * kidFallbackPool.length)] || kidFallbackPool[0]!;
}

export async function getKidEncouragement({
  name,
  questTitle,
  xp,
  streak,
}: KidMessageInput): Promise<KidMessageResult> {
  const client = createOpenRouterClient();

  if (!client) {
    return randomFallback();
  }

  try {
    const completion = await client.chat.completions.create({
      model: OPENROUTER_JSON_MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a warm, energetic coach for kids 8–13. Write ONE sentence of encouragement (max 15 words), no medical terms, no comparisons to other kids, end with one emoji. Return JSON {message, emoji}.",
        },
        {
          role: "user",
          content: `Name: ${name}\nQuest: ${questTitle}\nXP earned: ${xp}\nCurrent streak: ${streak}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return randomFallback();
    }

    const parsed = JSON.parse(content) as Partial<KidMessageResult>;
    if (typeof parsed.message !== "string" || typeof parsed.emoji !== "string") {
      return randomFallback();
    }

    return {
      message: parsed.message,
      emoji: parsed.emoji,
    };
  } catch {
    return randomFallback();
  }
}
