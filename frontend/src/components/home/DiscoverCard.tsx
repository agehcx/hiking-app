export function DiscoverCard() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 font-bold">
        <span className="text-xl">🌟</span>
        Discover Unseen
      </h3>
      <p className="mb-4 text-sm text-[color:var(--color-foreground)/0.7]">
        Explore hidden gems and secret trails in your area that few hikers have discovered.
      </p>
      <button className="w-full rounded-lg bg-[var(--color-primary-500)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-600)] transition-colors">
        🔍 Find Hidden Trails
      </button>
    </div>
  );
}
