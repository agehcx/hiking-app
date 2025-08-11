import { NavigateControls } from "@/components/navigate/NavigateControls";
import { Icon } from "@/components/ui/Icon";

export default function NavigatePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="compass" size={24} className="text-[var(--color-primary-600)]" />
          <h1 className="text-3xl font-black text-[var(--color-foreground)]">Navigate</h1>
        </div>
        <p className="text-[color:var(--color-foreground)/0.7]">
          Real-time tracking with offline maps and voice guidance
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary-25)] to-[var(--color-primary-50)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-[color:var(--color-foreground)/0.5]">
              <Icon name="map" size={48} className="mx-auto mb-2 text-[var(--color-primary-400)]" />
              <p className="text-sm">Interactive map will load here</p>
              <p className="text-xs">Offline maps • GPS tracking • Route visualization</p>
            </div>
          </div>
          <div className="h-[65vh] w-full" />
        </section>
        
        <aside>
          <NavigateControls />
        </aside>
      </div>
    </main>
  );
}
