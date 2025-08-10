import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo variant="full" size="md" />
            </div>
            <p className="text-[color:var(--color-foreground)/0.75] max-w-md mb-4 leading-relaxed">
              Your ultimate companion for wilderness adventures in Thailand. Plan trips, navigate safely, and discover amazing outdoor destinations from Doi Inthanon to Erawan Falls with AI-powered guidance.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center text-green-600 hover:text-green-700 transition-colors">
                📧
              </Link>
              <Link href="#" className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center text-green-600 hover:text-green-700 transition-colors">
                🐦
              </Link>
              <Link href="#" className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center text-green-600 hover:text-green-700 transition-colors">
                📷
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <span>🗺️</span>
              <span>Explore</span>
            </h3>
            <nav className="space-y-2">
              <Link href="/plan" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                Plan Your Trip
              </Link>
              <Link href="/navigate" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                Navigate Trails
              </Link>
              <Link href="/chat" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                AI Assistant
              </Link>
              <Link href="/profile" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                Your Profile
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <span>🛟</span>
              <span>Support</span>
            </h3>
            <nav className="space-y-2">
              <Link href="#" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                Safety Guidelines
              </Link>
              <Link href="#" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                Emergency Contacts
              </Link>
              <Link href="#" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                Help Center
              </Link>
              <Link href="#" className="block text-[color:var(--color-foreground)/0.75] hover:text-[var(--color-primary)] transition-colors py-1">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-border)] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-[color:var(--color-foreground)/0.6]">
            © {new Date().getFullYear()} WildGuide. Made with ❤️ for outdoor enthusiasts.
          </div>
          <div className="flex gap-4 text-xs text-[color:var(--color-foreground)/0.6]">
            <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
