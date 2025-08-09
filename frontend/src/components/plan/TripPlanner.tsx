"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type TripInput = {
  destination: string;
  budget: string;
  style: "adventure" | "rest" | "dating" | "family" | "solo";
  durationDays: number;
  groupSize: number;
  start: string;
};

export function TripPlanner() {
  const [input, setInput] = useState<TripInput>({
    destination: "",
    budget: "",
    style: "adventure",
    durationDays: 3,
    groupSize: 2,
    start: "",
  });
  const [generated, setGenerated] = useState<null | { overview: string; steps: string[] }>(null);

  const generate = () => {
    const o = `Trip to ${input.destination || "somewhere beautiful"} for ${input.durationDays} day(s). Style: ${input.style}. From ${input.start || "your location"}. Budget ${input.budget || "flexible"}.`;
    const steps = [
      "Day 1: Arrival and warm-up hike with lake view.",
      "Day 2: Main ridge trail — start early, bring layers.",
      "Day 3: Waterfall loop and local food spot.",
    ];
    setGenerated({ overview: o, steps });
  };

  return (
    <Card className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Destination</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={input.destination} onChange={(e) => setInput({ ...input, destination: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Start point</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={input.start} onChange={(e) => setInput({ ...input, start: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Budget</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" placeholder="$" value={input.budget} onChange={(e) => setInput({ ...input, budget: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Style</label>
          <select className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={input.style} onChange={(e) => setInput({ ...input, style: e.target.value as TripInput["style"] })}>
            <option value="adventure">Adventure</option>
            <option value="rest">Rest</option>
            <option value="dating">Dating</option>
            <option value="family">Family</option>
            <option value="solo">Solo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (days)</label>
          <input type="number" min={1} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={input.durationDays} onChange={(e) => setInput({ ...input, durationDays: Number(e.target.value) })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Group size</label>
          <input type="number" min={1} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={input.groupSize} onChange={(e) => setInput({ ...input, groupSize: Number(e.target.value) })} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={generate} className="bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] border-transparent">Generate</Button>
        <Button>Invite friends</Button>
        <Button>Export PDF</Button>
      </div>

      {generated && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold">Overview</h3>
            <p className="mt-1 text-sm text-[color:var(--color-foreground)/0.85]">{generated.overview}</p>
            <p className="mt-2 text-xs text-[color:var(--color-foreground)/0.75]">Weather looks mild. Bring raincoat, warm layer, and anti-leech socks.</p>
          </Card>
          <Card>
            <h3 className="font-semibold">Route steps</h3>
            <ol className="mt-1 list-decimal pl-5 text-sm">
              {generated.steps.map((s, i) => (
                <li key={i} className="mb-1">{s}</li>
              ))}
            </ol>
          </Card>
        </div>
      )}
    </Card>
  );
}
