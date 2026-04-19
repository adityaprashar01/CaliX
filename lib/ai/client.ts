import OpenAI from "openai";

const globalForOpenRouterWarning = globalThis as typeof globalThis & {
  __calixOpenRouterWarned?: boolean;
};

export function createOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    if (!globalForOpenRouterWarning.__calixOpenRouterWarned) {
      console.warn("[CaliX] OPENROUTER_API_KEY is missing. AI routes will use demo fallback copy.");
      globalForOpenRouterWarning.__calixOpenRouterWarned = true;
    }

    return null;
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    maxRetries: 0,
    timeout: 2500,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME ?? "CaliX",
    },
  });
}
