import Link from 'next/link';
import { HomeSearchBar } from '@/components/home/HomeSearchBar';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SuggestUnseenCard } from '@/components/home/SuggestUnseenCard';

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="rounded-2xl border border-[var(--color-border)] bg-white p-10 shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight">Navigate the outdoors confidently</h1>
        <p className="mt-3 text-[color:var(--color-foreground)/0.75] text-lg">
          Offline maps, voice navigation, live tracking, and AR peaks.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/plan" className="rounded-md bg-[var(--color-primary-500)] px-5 py-3 text-white hover:bg-[var(--color-primary-600)]">
            Plan a trip
          </Link>
          <Link href="/trail/demo" className="rounded-md border border-[var(--color-border)] px-5 py-3 hover:bg-[var(--color-primary-50)]">
            Try demo trail
          </Link>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <HomeSearchBar />
          <FeaturedDestinations />
          <HowItWorks />
        </div>
        <div className="space-y-6">
          <SuggestUnseenCard />
        </div>
      </div>
    </main>
  );
}
