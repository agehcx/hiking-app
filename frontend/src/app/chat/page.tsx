import { ChatPanel } from "@/components/chat/ChatPanel";
import { Card } from "@/components/ui/Card";

export default function ChatbotPage() {
  const quickCommands = [
    { icon: "🏔️", text: "Suggest a 3-day hike near Yosemite", category: "Planning" },
    { icon: "🎒", text: "Gear list for rainy mountain trip", category: "Equipment" },
    { icon: "🌤️", text: "Best time to visit Zion National Park", category: "Weather" },
    { icon: "📍", text: "Make a checkpoint plan for Angel's Landing", category: "Navigation" },
    { icon: "🥾", text: "What boots for rocky terrain?", category: "Equipment" },
    { icon: "🆘", text: "Emergency procedures for solo hiking", category: "Safety" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-2xl">🤖</div>
          <h1 className="text-3xl font-black text-[var(--color-foreground)]">AI Assistant</h1>
        </div>
        <p className="text-[color:var(--color-foreground)/0.7]">
          Get instant help with routes, gear, weather, and safety tips
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <ChatPanel />
        </section>
        
        <aside className="space-y-4">
          <Card padding="lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="text-lg">⚡</div>
              <h3 className="font-bold">Quick Commands</h3>
            </div>
            <div className="space-y-3">
              {quickCommands.map((cmd, i) => (
                <button
                  key={i}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white p-3 text-left text-sm transition-all hover:border-[var(--color-primary-300)] hover:bg-[var(--color-primary-25)]"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{cmd.icon}</span>
                    <div>
                      <div className="font-medium text-[var(--color-foreground)]">
                        {cmd.text}
                      </div>
                      <div className="text-xs text-[color:var(--color-foreground)/0.5]">
                        {cmd.category}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
          
          <Card padding="lg">
            <div className="mb-3 flex items-center gap-2">
              <div className="text-lg">📚</div>
              <h3 className="font-bold">AI Features</h3>
            </div>
            <div className="space-y-2 text-sm text-[color:var(--color-foreground)/0.7]">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Real-time weather data</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Trail condition reports</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Equipment recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">🔄</span>
                <span>Live park alerts (coming soon)</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
