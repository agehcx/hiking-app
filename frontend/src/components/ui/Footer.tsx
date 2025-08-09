import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 text-sm text-[color:var(--color-foreground)/0.75] md:grid-cols-3">
        <div>
          <div className="font-semibold text-[var(--color-foreground)]">Hiking App</div>
          <p className="mt-2 max-w-xs">Plan trips, navigate offline, and track your adventures with a friendly hiking companion.</p>
        </div>
        <nav className="space-y-1">
          <div className="font-semibold text-[var(--color-foreground)]">Product</div>
          <Link href="/plan" className="block rounded px-2 py-1 hover:bg-[var(--color-primary-50)]">Plan</Link>
          <Link href="/navigate" className="block rounded px-2 py-1 hover:bg-[var(--color-primary-50)]">Navigate</Link>
          <Link href="/chat" className="block rounded px-2 py-1 hover:bg-[var(--color-primary-50)]">Chatbot</Link>
        </nav>
        <nav className="space-y-1">
          <div className="font-semibold text-[var(--color-foreground)]">Company</div>
          <Link href="#" className="block rounded px-2 py-1 hover:bg-[var(--color-primary-50)]">Contact</Link>
          <Link href="#" className="block rounded px-2 py-1 hover:bg-[var(--color-primary-50)]">Privacy</Link>
          <Link href="#" className="block rounded px-2 py-1 hover:bg-[var(--color-primary-50)]">Terms</Link>
        </nav>
      </div>
      <div className="border-t border-[var(--color-border)] py-3 text-center text-xs text-[color:var(--color-foreground)/0.6]">© {new Date().getFullYear()} Hiking App</div>
    </footer>
  );
}
