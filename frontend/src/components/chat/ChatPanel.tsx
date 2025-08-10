"use client";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "👋 Hi there! I'm your hiking assistant. Ask me about routes, gear, weather, or anything else for your adventure!", 
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { role: "user", content: input.trim(), timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Generate contextual reply
    const replies = [
      `Great question about "${userMsg.content}"! 🎯 For that kind of adventure, I'd suggest starting with a day pack, sturdy boots, and checking weather conditions. Would you like specific gear recommendations?`,
      `Interesting! 🤔 Based on what you're asking, I'd recommend checking the trail difficulty and bringing extra water. The area you mentioned has some amazing viewpoints. Need route suggestions?`,
      `Perfect timing to ask! 🌟 For "${userMsg.content}", here's what I'd suggest: Plan for changing weather, inform someone of your route, and consider the season. Want me to check current conditions?`,
      `Love that you're thinking ahead! 🏔️ That's exactly the kind of planning that makes for safe, amazing trips. Let me share some tips for "${userMsg.content}"...`
    ];
    
    const reply: Message = { 
      role: "assistant", 
      content: replies[Math.floor(Math.random() * replies.length)], 
      timestamp: new Date() 
    };
    
    setMessages((m) => [...m, reply]);
    setLoading(false);
    setTimeout(scrollToBottom, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="flex h-96 flex-col" padding="sm">
      <div className="mb-3 flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="text-lg">🤖</div>
        <h3 className="font-bold">Trip Assistant</h3>
        <div className="ml-auto flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-lg px-3 py-2 ${
              msg.role === "user" 
                ? "bg-[var(--color-primary-500)] text-white" 
                : "bg-[var(--color-primary-50)] text-[var(--color-foreground)]"
            }`}>
              <div className="break-words">{msg.content}</div>
              <div className={`mt-1 text-xs ${
                msg.role === "user" ? "text-white/70" : "text-[color:var(--color-foreground)/0.5]"
              }`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-[var(--color-primary-50)] px-3 py-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary-400)]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary-400)] [animation-delay:0.1s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary-400)] [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form ref={formRef} onSubmit={onSubmit} className="mt-3 flex gap-2 border-t border-[var(--color-border)] pt-3">
        <input
          className="flex-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]"
          placeholder="Ask about routes, gear, weather..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button 
          type="submit" 
          variant="primary" 
          size="sm"
          loading={loading}
          disabled={!input.trim()}
        >
          Send
        </Button>
      </form>
    </Card>
  );
}
