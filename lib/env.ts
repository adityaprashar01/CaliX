import "server-only";

import { z } from "zod";

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  OPENROUTER_API_KEY: z.string().min(1),
  OPENROUTER_SITE_URL: z.url().catch("http://localhost:3000"),
  OPENROUTER_APP_NAME: z.string().default("CaliX"),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  COMPLETION_TOKEN_SECRET: z.string().min(32),
  DEMO_RESET_SECRET: z.string().min(32),
  POSTHOG_API_KEY: z.string().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.url().catch("http://localhost:3000"),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.url().catch("https://us.i.posthog.com"),
});

export const serverEnv = serverSchema.parse(process.env);

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});
