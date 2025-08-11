import Link from 'next/link';
import { HomeSearchBar } from '@/components/home/HomeSearchBar';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { HowItWorks } from '@/components/home/HowItWorks';
import { DiscoverCard } from '@/components/home/DiscoverCard';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero Section */}
      <ScrollReveal direction="scale" className="animate-fade-in">
        <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-white via-[var(--color-primary-25)] to-[var(--color-primary-50)] p-12 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2 animate-slide-in-left">
              <Icon name="mountain" size={32} className="text-[var(--color-primary-600)] animate-float" />
              <span className="rounded-full bg-[var(--color-primary-100)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-700)] animate-bounce-soft">
                Beta Release
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-black tracking-tight text-[var(--color-foreground)] animate-fade-in-up">
              Navigate the outdoors
              <br />
              <span className="bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-400)] bg-clip-text text-transparent animate-glow">
                confidently
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-[color:var(--color-foreground)/0.75] leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Discover hidden trails, plan perfect trips, and navigate with confidence using offline maps, 
              voice guidance, and AI-powered recommendations.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link href="/plan">
                <Button variant="primary" size="lg">
                  <Icon name="target" size={20} className="mr-2" />
                  Plan Your Adventure
                </Button>
              </Link>
              <Link href="/trail/demo">
                <Button variant="outline" size="lg">
                  <Icon name="activity" size={20} className="mr-2" />
                  Try Demo Trail
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--color-primary-200)] opacity-20 animate-float" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[var(--color-primary-300)] opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <ScrollReveal direction="up" delay={200}>
            <HomeSearchBar />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={400}>
            <FeaturedDestinations />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={600}>
            <HowItWorks />
          </ScrollReveal>
        </div>
        <div className="space-y-8">
          <ScrollReveal direction="right" delay={300}>
            <DiscoverCard />
          </ScrollReveal>
          
          {/* Stats Card */}
          <ScrollReveal direction="right" delay={500}>
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <Icon name="activity" size={20} className="text-[var(--color-primary-600)] group-hover:scale-110 transition-transform duration-200" />
                Community Stats
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="group hover:scale-105 transition-transform duration-200 cursor-default">
                  <div className="text-2xl font-bold text-[var(--color-primary-600)] animate-pulse-soft">2.1k+</div>
                  <div className="text-xs text-[color:var(--color-foreground)/0.6]">Trails mapped</div>
                </div>
                <div className="group hover:scale-105 transition-transform duration-200 cursor-default">
                  <div className="text-2xl font-bold text-[var(--color-primary-600)] animate-pulse-soft" style={{ animationDelay: '500ms' }}>850+</div>
                  <div className="text-xs text-[color:var(--color-foreground)/0.6]">Active hikers</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
