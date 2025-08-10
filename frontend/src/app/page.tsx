import Link from 'next/link';
import { HomeSearchBar } from '@/components/home/HomeSearchBar';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { HowItWorks } from '@/components/home/HowItWorks';
import { DiscoverCard } from '@/components/home/DiscoverCard';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-white via-[var(--color-primary-25)] to-[var(--color-primary-50)] p-12 shadow-xl">
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-2">
            <div className="text-4xl">🏔️</div>
            <span className="rounded-full bg-[var(--color-primary-100)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-700)]">
              Beta Release
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-black tracking-tight text-[var(--color-foreground)]">
            Navigate the outdoors
            <br />
            <span className="bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-400)] bg-clip-text text-transparent">
              confidently
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-[color:var(--color-foreground)/0.75] leading-relaxed">
            Discover hidden trails, plan perfect trips, and navigate with confidence using offline maps, 
            voice guidance, and AI-powered recommendations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/plan">
              <Button variant="primary" size="lg">
                🎯 Plan Your Adventure
              </Button>
            </Link>
            <Link href="/trail/demo">
              <Button variant="outline" size="lg">
                🏃‍♂️ Try Demo Trail
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--color-primary-200)] opacity-20" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[var(--color-primary-300)] opacity-20" />
      </section>

      {/* Main Content */}
      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <HomeSearchBar />
          <FeaturedDestinations />
          <HowItWorks />
        </div>
        <div className="space-y-8">
          <DiscoverCard />
          
          {/* Stats Card */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-bold">
              <span className="text-xl">📊</span>
              Community Stats
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[var(--color-primary-600)]">2.1k+</div>
                <div className="text-xs text-[color:var(--color-foreground)/0.6]">Trails mapped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-primary-600)]">850+</div>
                <div className="text-xs text-[color:var(--color-foreground)/0.6]">Active hikers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
