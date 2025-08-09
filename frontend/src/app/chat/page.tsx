import { ChatPanel } from "@/components/chat/ChatPanel";

export default function ChatbotPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Chatbot</h1>
      <p className="mt-2 text-sm text-[color:var(--color-foreground)/0.8]">Ask about destinations, weather, and routes.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <ChatPanel />
        </section>
        <aside className="space-y-3 text-sm">
          <div className="rounded-lg border bg-white p-4">
            <div className="font-semibold">Quick commands</div>
            <ul className="mt-2 list-disc pl-5 text-[color:var(--color-foreground)/0.8]">
              <li>Suggest a 3-day hike near <em>City</em></li>
              <li>Gear list for rainy mountain trip</li>
              <li>Best time to visit <em>Park</em></li>
              <li>Make a checkpoint plan for <em>Trail</em></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
