export function HowItWorks() {
  const steps = [
    { t: "Plan", d: "Tell us your dates, style, and budget. Get a trip overview with routes and gear." },
    { t: "Navigate", d: "Use offline maps and voice guidance with checkpoints and safety alerts." },
    { t: "Share", d: "Invite friends, track progress, and export your plan for offline use." },
  ];
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">How it works</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="rounded-lg border bg-white p-4">
            <div className="text-sm font-semibold">{i + 1}. {s.t}</div>
            <p className="mt-1 text-sm text-[color:var(--color-foreground)/0.8]">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
