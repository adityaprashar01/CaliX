import { NextResponse } from "next/server";
import { getParentSummary } from "@/lib/ai/parentSummary";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    childName?: string;
    weekStats?: {
      completions?: number;
      totalMinutes?: number;
      streakDays?: number;
    };
  };

  const summary = await getParentSummary({
    childName: body.childName ?? "Aarav",
    weekStats: {
      completions: body.weekStats?.completions ?? 5,
      totalMinutes: body.weekStats?.totalMinutes ?? 33,
      streakDays: body.weekStats?.streakDays ?? 5,
    },
  });

  return NextResponse.json({ summary });
}
