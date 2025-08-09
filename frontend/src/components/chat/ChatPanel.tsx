"use client";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ChatPanel() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hi! Ask anything about your trip. I can suggest routes, gear, and checkpoints." },
  ]);
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Mock AI reply (replace with real API later)
    const reply = `Suggestion based on: "${userMsg.content}" → Try a 2-day loop with scenic ridge and waterfall view. Bring anti-leech socks.`;
    setTimeout(() => setMessages((m) => [...m, { role: "assistant", content: reply }]), 400);
  };

  return (
    <Card className="space-y-3">
      <div className="max-h-72 space-y-2 overflow-y-auto pr-1 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span className={`inline-block rounded-md px-2 py-1 ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form ref={formRef} onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask trip tips, routes, weather, packing..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
}
