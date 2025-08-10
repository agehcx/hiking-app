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
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const o = `Trip to ${input.destination || "somewhere beautiful"} for ${input.durationDays} day(s). Style: ${input.style}. From ${input.start || "your location"}. Budget ${input.budget || "flexible"}.`;
    const steps = [
      "Day 1: Arrival and warm-up hike with lake view.",
      "Day 2: Main ridge trail — start early, bring layers.",
      "Day 3: Waterfall loop and local food spot.",
    ];
    setGenerated({ overview: o, steps });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="mb-6 flex items-center gap-2">
          <div className="text-2xl">🎯</div>
          <h2 className="text-xl font-bold">Trip Generator</h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
              🏔️ Destination
            </label>
            <input 
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
              placeholder="National park, city, region..."
              value={input.destination} 
              onChange={(e) => setInput({ ...input, destination: e.target.value })} 
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
              📍 Starting point
            </label>
            <input 
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
              placeholder="Your city or location"
              value={input.start} 
              onChange={(e) => setInput({ ...input, start: e.target.value })} 
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
              💰 Budget
            </label>
            <input 
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
              placeholder="$500, $$, flexible..."
              value={input.budget} 
              onChange={(e) => setInput({ ...input, budget: e.target.value })} 
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
              🎨 Style
            </label>
            <select 
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
              value={input.style} 
              onChange={(e) => setInput({ ...input, style: e.target.value as TripInput["style"] })}
            >
              <option value="adventure">🏃‍♂️ Adventure</option>
              <option value="rest">😌 Rest & Relaxation</option>
              <option value="dating">💑 Romantic</option>
              <option value="family">👨‍👩‍👧‍👦 Family</option>
              <option value="solo">🧘‍♀️ Solo Journey</option>
            </select>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
              📅 Duration (days)
            </label>
            <input 
              type="number" 
              min={1} 
              max={30}
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
              value={input.durationDays} 
              onChange={(e) => setInput({ ...input, durationDays: Number(e.target.value) })} 
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
              👥 Group size
            </label>
            <input 
              type="number" 
              min={1} 
              max={20}
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
              value={input.groupSize} 
              onChange={(e) => setInput({ ...input, groupSize: Number(e.target.value) })} 
            />
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3">
          <Button 
            onClick={generate} 
            variant="primary" 
            size="lg"
            loading={loading}
            disabled={!input.destination.trim()}
          >
            ✨ Generate Trip Plan
          </Button>
          <Button variant="outline">
            👥 Invite Friends
          </Button>
          <Button variant="outline">
            📄 Export PDF
          </Button>
        </div>
      </Card>

      {generated && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card padding="lg">
            <div className="mb-3 flex items-center gap-2">
              <div className="text-xl">📋</div>
              <h3 className="font-bold text-[var(--color-foreground)]">Trip Overview</h3>
            </div>
            <p className="mb-4 text-sm text-[color:var(--color-foreground)/0.85] leading-relaxed">
              {generated.overview}
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[color:var(--color-foreground)/0.7]">
                <span className="text-green-500">🌤️</span>
                <span>Weather looks mild with occasional rain</span>
              </div>
              <div className="flex items-center gap-2 text-[color:var(--color-foreground)/0.7]">
                <span className="text-blue-500">🎒</span>
                <span>Bring raincoat, warm layer, and anti-leech socks</span>
              </div>
              <div className="flex items-center gap-2 text-[color:var(--color-foreground)/0.7]">
                <span className="text-red-500">🚨</span>
                <span>Emergency contact: Park Rangers +1-555-0123</span>
              </div>
            </div>
          </Card>
          
          <Card padding="lg">
            <div className="mb-3 flex items-center gap-2">
              <div className="text-xl">🗺️</div>
              <h3 className="font-bold text-[var(--color-foreground)]">Route Steps</h3>
            </div>
            <ol className="space-y-3 text-sm">
              {generated.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[color:var(--color-foreground)/0.85]">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}
    </div>
  );
}
