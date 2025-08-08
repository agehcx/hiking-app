import { z } from "zod";
import type { Trail } from "@/lib/types/trail";

const TrailSchema = z.object({
  id: z.string(),
  name: z.string(),
  summary: z.string(),
  distanceKm: z.number(),
  elevationGainM: z.number(),
  difficulty: z.enum(["easy", "moderate", "hard"]),
  offlineAvailable: z.boolean(),
  voiceNav: z.boolean(),
});

export async function getTrail(trailId: string): Promise<Trail> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/v1/trails/${trailId}`);
  if (!res.ok) throw new Error("Failed to fetch trail");
  const json = await res.json();
  return TrailSchema.parse(json);
}
