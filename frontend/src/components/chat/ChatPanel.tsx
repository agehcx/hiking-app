"use client";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "🏔️ Hi! I'm your wilderness guide AI. I can help with trail recommendations, gear advice, weather warnings, and safety tips for your outdoor adventures!", 
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
    
    // Generate contextual wilderness reply
    const generateWildernessReply = (userInput: string) => {
      const input = userInput.toLowerCase();
      
      // Weather-based recommendations
      if (input.includes('rain') || input.includes('weather')) {
        return "🌧️ I see rain in the forecast! Pack a waterproof rain jacket, quick-dry pants, and waterproof boot covers. Pro tip: Bring anti-leech socks if you're heading to wet, forested areas. Rain probability is 78% in the next 2 days - consider postponing or choosing a sheltered trail.";
      }
      
      if (input.includes('wet') || input.includes('swamp') || input.includes('jungle')) {
        return "💧 For wet environments, I highly recommend: Anti-leech socks (essential!), waterproof gaiters, quick-dry hiking pants, and insect repellent with DEET. Choose boots with aggressive tread for muddy terrain. Bring extra dry socks in waterproof bags.";
      }
      
      if (input.includes('mountain') || input.includes('alpine') || input.includes('peak')) {
        return "⛰️ Mountain adventures require layered clothing! Pack a base layer, insulating mid-layer, and waterproof shell. Bring trekking poles, headlamp, emergency whistle, and extra food. Weather changes rapidly above treeline - always check conditions!";
      }
      
      if (input.includes('desert') || input.includes('hot') || input.includes('sun')) {
        return "🏜️ Desert hiking essentials: Wide-brimmed hat, UV-protective clothing, sunglasses, and LOTS of water (1L per hour of hiking). Start early morning, avoid midday heat, and bring electrolyte supplements. Sand gaiters prevent debris in boots.";
      }
      
      if (input.includes('gear') || input.includes('pack') || input.includes('equipment')) {
        return "🎒 Essential wilderness gear checklist: Navigation (map, compass, GPS), sun protection, insulation layers, illumination (headlamp + backup), first aid supplies, fire starter, repair kit, nutrition, hydration, emergency shelter. The 10 essentials save lives!";
      }
      
      if (input.includes('recommend') || input.includes('suggest') || input.includes('where')) {
        return "🗺️ I'd love to suggest some amazing wilderness spots! Tell me: What's your experience level? Do you prefer forests, mountains, or coastal areas? How many days are you planning? I can recommend trails in Yosemite, Olympic National Park, or hidden gems in the Cascades!";
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
