"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function HomeSearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();
  return (
    <div className="rounded-xl border p-4">
      <label className="mb-2 block text-sm font-medium text-[var(--color-foreground)]">Search destination</label>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
          placeholder="City, park, or trail name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          onClick={() => router.push(`/plan?q=${encodeURIComponent(q)}`)}
          className="rounded-md bg-[var(--color-primary-500)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-600)]"
        >
          Search
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[color:var(--color-foreground)/0.8]">
        <span className="rounded-full border px-2 py-1">Mountains</span>
        <span className="rounded-full border px-2 py-1">Waterfalls</span>
        <span className="rounded-full border px-2 py-1">Lakes</span>
        <span className="rounded-full border px-2 py-1">Forests</span>
      </div>
    </div>
  );
}
