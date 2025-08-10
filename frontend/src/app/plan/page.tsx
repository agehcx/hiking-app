import { Card } from "@/components/ui/Card";
import { ChatPanel } from "@/components/chat/ChatPanel";
import Link from "next/link";
import { TripPlanner } from "@/components/plan/TripPlanner";

export default function PlanPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-2xl">🎯</div>
          <h1 className="text-3xl font-black text-[var(--color-foreground)]">Plan Your Trip</h1>
        </div>
        <p className="text-[color:var(--color-foreground)/0.7]">
          Create personalized hiking adventures with AI-powered recommendations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="space-y-6">
          <TripPlanner />

          <Card padding="lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="text-xl">🤝</div>
              <h3 className="text-lg font-bold">Share & Export</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-primary-25)] p-4 text-center">
                <div className="mb-2 text-2xl">👥</div>
                <h4 className="mb-1 font-semibold">Invite Friends</h4>
                <p className="text-xs text-[color:var(--color-foreground)/0.6]">
                  Invite companions and earn adventure points
                </p>
              </div>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-primary-25)] p-4 text-center">
                <div className="mb-2 text-2xl">🗺️</div>
                <h4 className="mb-1 font-semibold">Custom Routes</h4>
                <p className="text-xs text-[color:var(--color-foreground)/0.6]">
                  Add waypoints and customize your path
                </p>
              </div>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-primary-25)] p-4 text-center">
                <div className="mb-2 text-2xl">📄</div>
                <h4 className="mb-1 font-semibold">Export Plans</h4>
                <p className="text-xs text-[color:var(--color-foreground)/0.6]">
                  PDF guides and offline maps
                </p>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">🏃‍♂️ Ready to hit the trails?</h3>
                <p className="text-sm text-[color:var(--color-foreground)/0.7]">
                  Try our demo trail to see the navigation features in action
                </p>
              </div>
              <Link 
                href="/trail/demo" 
                className="rounded-lg bg-[var(--color-primary-500)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--color-primary-600)] hover:scale-105"
              >
                Demo Trail →
              </Link>
            </div>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card padding="lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="text-lg">🤖</div>
              <h3 className="font-bold">AI Assistant</h3>
            </div>
            <ChatPanel />
          </Card>
          
          <Card padding="lg">
            <div className="mb-3 flex items-center gap-2">
              <div className="text-lg">💡</div>
              <h3 className="font-bold">Pro Tips</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Download offline maps before heading out</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Enable voice navigation for hands-free guidance</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Share your route with emergency contacts</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Check weather conditions before departure</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
