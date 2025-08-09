import { Card } from "@/components/ui/Card";

export default function ProfilePage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-6 p-4 sm:p-6 lg:p-8">
      <Card>
        <h1 className="text-xl font-semibold">Profile Dashboard</h1>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-700">
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Total distance</div>
            <div className="text-lg font-semibold">— km</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Visited batch</div>
            <div className="text-lg font-semibold">—</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Points</div>
            <div className="text-lg font-semibold">—</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Travel style</div>
            <div className="text-lg font-semibold">—</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent trips</h2>
          <ul className="mt-3 divide-y text-sm">
            {["Scenic Ridge Loop", "Emerald Falls Track", "Azure Lake Circuit"].map((t, i) => (
              <li key={i} className="flex items-center justify-between py-2">
                <span className="text-[color:var(--color-foreground)/0.85]">{t}</span>
                <button className="rounded-md border px-2 py-1 text-xs hover:bg-[var(--color-primary-50)]">View</button>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Preferences</h2>
          <div className="mt-2 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Enable voice guidance
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Offline mode by default
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Share trip progress with friends
            </label>
          </div>
        </Card>
      </div>
    </main>
  );
}
