import { Card } from "@/components/ui/Card";

export function HowItWorks() {
  const steps = [
    { 
      icon: "🎯", 
      title: "Plan", 
      description: "Tell us your dates, style, and budget. Get a personalized trip overview with routes and gear recommendations." 
    },
    { 
      icon: "🧭", 
      title: "Navigate", 
      description: "Use offline maps and voice guidance with real-time checkpoints and safety alerts to stay on track." 
    },
    { 
      icon: "🤝", 
      title: "Share", 
      description: "Invite friends, track progress together, and export your plan for offline use anywhere." 
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-2xl">✨</div>
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">How it works</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <Card key={i} className="text-center">
            <div className="mb-4 text-4xl">{step.icon}</div>
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-xs font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-semibold text-[var(--color-foreground)]">{step.title}</h3>
            </div>
            <p className="text-sm text-[color:var(--color-foreground)/0.7] leading-relaxed">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
