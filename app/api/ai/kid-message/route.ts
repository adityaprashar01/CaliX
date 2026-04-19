import { NextResponse } from "next/server";
import { getKidEncouragement } from "@/lib/ai/kidMessage";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    questTitle?: string;
    xp?: number;
    streak?: number;
  };

  const result = await getKidEncouragement({
    name: body.name ?? "Aarav",
    questTitle: body.questTitle ?? "Quest",
    xp: typeof body.xp === "number" ? body.xp : 0,
    streak: typeof body.streak === "number" ? body.streak : 0,
  });

  return NextResponse.json(result);
}
