import { Card } from "@/components/ui/Card";
import { ChatPanel } from "@/components/chat/ChatPanel";
import Link from "next/link";
import { TripPlanner } from "@/components/plan/TripPlanner";

export default function PlanPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-6 p-4 sm:p-6 lg:p-8 lg:grid-cols-[1.6fr_1fr]">
      <section className="space-y-4">
        <Card>
          <h1 className="text-xl font-semibold">Generate Trip Plan</h1>
          <p className="text-sm text-gray-600">Enter trip conditions and get an overview with steps and safety notes.</p>
        </Card>

        <TripPlanner />

        <Card className="grid gap-4 sm:grid-cols-3">
          <div>
            <h3 className="mb-1 font-medium">Invite friends</h3>
            <p className="text-sm text-gray-600">Invite to earn points.</p>
          </div>
          <div>
            <h3 className="mb-1 font-medium">Route to destination</h3>
            <p className="text-sm text-gray-600">Step-by-step guide. Add custom route.</p>
          </div>
          <div>
            <h3 className="mb-1 font-medium">Export</h3>
            <p className="text-sm text-gray-600">Export PDF/offline plan.</p>
          </div>
        </Card>

        <Card>
          <Link className="text-blue-600 hover:underline" href="/trail/demo">Open demo trail →</Link>
        </Card>
      </section>

      <aside className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-500">Assistant</h2>
        <ChatPanel />
        <Card>
          <p className="text-sm text-gray-600">Pro tip: Use offline maps and voice nav in remote areas.</p>
        </Card>
      </aside>
    </main>
  );
}
