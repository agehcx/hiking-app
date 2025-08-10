import Link from "next/link";
import { Card } from "@/components/ui/Card";

const featured = [
  { 
    id: "demo", 
    name: "Scenic Ridge Loop", 
    country: "US", 
    distance: "12.4 km",
    difficulty: "Moderate",
    image: "🏔️",
    description: "Stunning mountain views with crystal-clear alpine lakes"
  },
  { 
    id: "demo", 
    name: "Emerald Falls Track", 
    country: "NZ", 
    distance: "8.7 km",
    difficulty: "Easy",
    image: "💧",
    description: "Gentle trail to spectacular waterfall viewpoint"
  },
  { 
    id: "demo", 
    name: "Azure Lake Circuit", 
    country: "CA", 
    distance: "15.2 km",
    difficulty: "Hard",
    image: "🏞️",
    description: "Challenging loop through pristine wilderness"
  },
];

export function FeaturedDestinations() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-2xl">⭐</div>
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">Featured destinations</h2>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((destination, i) => (
          <Link key={i} href={`/trail/${destination.id}`} className="block">
            <Card hover className="h-full">
              <div className="mb-3 text-3xl">{destination.image}</div>
              <div className="space-y-2">
                <h3 className="font-semibold text-[var(--color-foreground)]">{destination.name}</h3>
                <p className="text-sm text-[color:var(--color-foreground)/0.7]">{destination.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[color:var(--color-foreground)/0.6]">{destination.country} • {destination.distance}</span>
                  <span className={`rounded-full px-2 py-1 ${
                    destination.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                    destination.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {destination.difficulty}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
