"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
               style={{
                 backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1571104508999-893933ded431?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
               }}>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Plan Safer & Smarter Treks<br />
              <span className="text-emerald-400">in Southeast Asia</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto">
              One platform for planning, booking, safety, and ranger support.
            </p>
            <Link href="/plan">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Your Adventure
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">The Problem</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg text-gray-700">Trail maps and reliable info are hard to find.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg text-gray-700">Booking requires juggling multiple platforms.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg text-gray-700">Safety registration is confusing and often skipped.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg text-gray-700">Rangers lack live updates on trekkers.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="text-6xl md:text-7xl font-bold text-emerald-600 mb-4">120,000+</div>
                <p className="text-lg text-gray-700">
                  Trekkers explore Southeast Asia yearly — but many face preventable safety risks.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <ScrollReveal direction="up" delay={100}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="mountain" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Set Up Your Trip</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose trek type, duration, interests, and budget.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal direction="up" delay={200}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="map" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Trip Planning</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get AI-powered trail info, transport & accommodation booking.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal direction="up" delay={300}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="shield" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Safety Registration</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Share itinerary & contacts with park rangers and local authorities.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal direction="up" delay={400}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="sun" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pre-Trip Prep</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Weather, checklist, safety tips, equipment rental.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Second Row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Step 5 */}
            <ScrollReveal direction="up" delay={500}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="bell" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Safety On Trail</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Daily check-ins, GPS tracking, emergency SOS button.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 6 */}
            <ScrollReveal direction="up" delay={600}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="messageCircle" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">During Trip</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Chat with AI for real-time updates & advice.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 7 */}
            <ScrollReveal direction="up" delay={700}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="star" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Post Trip</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leave reviews & share your trekking story.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 8 */}
            <ScrollReveal direction="up" delay={800}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Icon name="gift" size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rewards</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Earn points for safe trekking & community support.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">Key Features</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <ScrollReveal direction="left" delay={100}>
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="zap" size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-powered Planning</h3>
                <p className="text-gray-700">Smart trip recommendations tailored to you.</p>
              </div>
            </ScrollReveal>

            {/* Feature 2 */}
            <ScrollReveal direction="right" delay={100}>
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="map" size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrated Bookings</h3>
                <p className="text-gray-700">Transport, accommodation & guide booking in one place.</p>
              </div>
            </ScrollReveal>

            {/* Feature 3 */}
            <ScrollReveal direction="left" delay={200}>
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="navigation" size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ranger-linked Safety</h3>
                <p className="text-gray-700">Your itinerary & live alerts shared with rangers.</p>
              </div>
            </ScrollReveal>

            {/* Feature 4 */}
            <ScrollReveal direction="right" delay={200}>
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="gift" size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Reward System</h3>
                <p className="text-gray-700">Points & recognition for safe trekking & reviews.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                  &ldquo;Finally, one platform that connects travelers with rangers. I felt safe hiking Mount Kinabalu for the first time!&rdquo;
                </p>
                <div className="font-semibold text-gray-900">— Anna, Trekker</div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                  &ldquo;Safety registration makes my job easier. I can track hikers and respond faster.&rdquo;
                </p>
                <div className="font-semibold text-gray-900">— Ranger, Gunung Mulu National Park</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" 
               style={{
                 backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1571104508999-893933ded431?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
               }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to plan your next adventure?</h2>
            <p className="text-xl mb-12 text-gray-200">Plan smart. Trek safe. Explore more.</p>
            <Link href="/plan">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Planning Your Trek Now
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">© 2025 TrekSafe. All rights reserved.</p>
            <div className="flex justify-center space-x-8 text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/plan" className="text-gray-400 hover:text-white transition-colors">Features</Link>
              <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">Safety</Link>
              <Link href="/chat" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
