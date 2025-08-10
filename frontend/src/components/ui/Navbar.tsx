'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Plan Trip', href: '/plan' },
    { name: 'Navigate', href: '/navigate' },
    { name: 'Chat AI', href: '/chat' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group">
          <Logo variant="full" className="hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'text-[var(--color-foreground)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary)]'
              }`}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Profile */}
        <div className="hidden lg:flex items-center gap-3">
          <Link 
            href="/profile" 
            aria-label="Open profile" 
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 text-sm font-bold text-green-700 shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            H
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-[var(--color-foreground)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary)] transition-colors"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle main menu"
        >
          {!isMobileMenuOpen ? (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="border-t border-[var(--color-border)] bg-white px-4 py-3">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                    : 'text-[var(--color-foreground)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary)]'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-3 border-t border-[var(--color-border)] mt-3">
              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-[var(--color-foreground)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary)] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 flex items-center justify-center text-sm font-bold text-green-700">
                  H
                </div>
                <span>Your Profile</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
