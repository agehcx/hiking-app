'use client';

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "🇹🇭 สวัสดี! I'm your Thailand hiking guide AI. I can help with trail recommendations in places like Doi Inthanon, Khao Yai, Erawan Falls, gear advice for tropical conditions, weather warnings, and safety tips for your Thai outdoor adventures!", 
      timestamp: new Date() 
    }
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
    
    // Generate contextual wilderness reply
    const generateWildernessReply = (userInput: string) => {
      const input = userInput.toLowerCase();
      
      // Weather-based recommendations
      if (input.includes('rain') || input.includes('weather')) {
        return "🌧️ Thailand's rainy season (May-October) requires special preparation! Pack a waterproof rain jacket, quick-dry pants, and waterproof boot covers. Pro tip: Bring anti-leech socks - they're essential in Thai forests! Rain probability is high during monsoon season.";
      }
      
      if (input.includes('wet') || input.includes('swamp') || input.includes('jungle') || input.includes('forest')) {
        return "🌿 For Thailand's tropical forests, I highly recommend: Anti-leech socks (absolute must!), waterproof gaiters, quick-dry hiking pants, and DEET-based insect repellent. Watch for leeches especially in places like Khao Yai and Doi Inthanon. Bring extra dry socks in waterproof bags.";
      }
      
      if (input.includes('mountain') || input.includes('doi') || input.includes('peak')) {
        return "⛰️ Mountain adventures in Thailand (like Doi Inthanon or Doi Suthep) require layered clothing! Mornings can be cool (10-15°C) but afternoons get warm. Bring trekking poles, headlamp, emergency whistle. Weather changes rapidly at altitude - always check conditions!";
      }
      
      if (input.includes('beach') || input.includes('island') || input.includes('koh') || input.includes('hot')) {
        return "�️ Island/beach hiking essentials for places like Koh Samui or Koh Phangan: Wide-brimmed hat, UV-protective clothing, sunglasses, and LOTS of water (Thailand heat is intense!). Start early morning, avoid 11am-3pm heat, and bring electrolyte supplements.";
      }
      
      if (input.includes('gear') || input.includes('pack') || input.includes('equipment')) {
        return "🎒 Essential gear for Thailand hiking: Navigation tools, sun protection, quick-dry layers, headlamp + backup, first aid (include anti-diarrhea meds), fire starter, repair kit, snacks, hydration, emergency shelter. Don't forget: anti-leech socks, DEET repellent, and electrolyte tablets!";
      }
      
      if (input.includes('recommend') || input.includes('suggest') || input.includes('where') || input.includes('thailand')) {
        return "🇹🇭 Amazing Thailand destinations! For beginners: Erawan Falls (Kanchanaburi) - beautiful 7-tier waterfalls. Intermediate: Khao Yai National Park - wildlife and waterfalls. Advanced: Doi Inthanon - Thailand's highest peak. Beach lovers: Koh Samui temple trails. What's your experience level and preferred region?";
      }
      
      // Default responses with practical tips
      const practicalTips = [
        `Great question about "${userInput}"! � For wilderness adventures, always inform someone of your route and expected return. Check weather conditions and pack accordingly. Need specific gear recommendations for your trip type?`,
        `Interesting area you're asking about! 🤔 I'd recommend checking trail conditions and seasonal accessibility. Bring layers for temperature changes and extra water. Would you like me to suggest some specific trails or camping spots?`,
        `Perfect timing to plan ahead! 🌟 For "${userInput}", consider the season - some areas require special permits or have seasonal closures. Pack the 10 essentials and check fire restrictions. Want current weather and trail condition updates?`,
        `Love the outdoor spirit! 🏔️ Safety first: tell someone your plans, check weather, bring navigation tools. For wet conditions, anti-leech socks are a game-changer! What specific type of wilderness experience are you planning?`
      ];
      
      return practicalTips[Math.floor(Math.random() * practicalTips.length)];
    };
    
    const reply: Message = { 
      role: "assistant", 
      content: generateWildernessReply(userMsg.content), 
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
