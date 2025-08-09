import Link from "next/link";

const featured = [
  { id: "demo", name: "Scenic Ridge Loop", country: "US", distance: "12.4 km" },
  { id: "demo", name: "Emerald Falls Track", country: "NZ", distance: "8.7 km" },
  { id: "demo", name: "Azure Lake Circuit", country: "CA", distance: "15.2 km" },
];

export function FeaturedDestinations() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Featured destinations</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((f, i) => (
          <Link key={i} href={`/trail/${f.id}`} className="rounded-lg border p-4 hover:bg-[var(--color-primary-50)]">
            <div className="font-medium">{f.name}</div>
            <div className="text-xs text-[color:var(--color-foreground)/0.7]">{f.country} • {f.distance}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
