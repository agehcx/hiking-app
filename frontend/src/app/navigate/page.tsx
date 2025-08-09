import { NavigateControls } from "@/components/navigate/NavigateControls";

export default function NavigatePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Navigate</h1>
      <p className="mt-2 text-sm text-[color:var(--color-foreground)/0.8]">Real-time checkpoints, offline maps, and voice guidance.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="h-[60vh] rounded-lg border bg-[var(--color-primary-50)]/40" />
        <aside>
          <NavigateControls />
        </aside>
      </div>
    </main>
  );
}
