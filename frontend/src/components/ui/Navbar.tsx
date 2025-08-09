import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2 font-semibold text-[var(--color-foreground)]">
          <Image src="/globe.svg" alt="Hiking App" width={22} height={22} className="opacity-90 transition group-hover:scale-105" />
          <span>Hiking App</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-[color:var(--color-foreground)/0.75]">
          <Link href="/" className="rounded-md px-3 py-2 hover:bg-[var(--color-primary-50)] hover:text-[var(--color-foreground)]">Home</Link>
          <Link href="/plan" className="rounded-md px-3 py-2 hover:bg-[var(--color-primary-50)] hover:text-[var(--color-foreground)]">Plan Trip</Link>
          <Link href="/navigate" className="rounded-md px-3 py-2 hover:bg-[var(--color-primary-50)] hover:text-[var(--color-foreground)]">Navigate</Link>
          <Link href="/chat" className="rounded-md px-3 py-2 hover:bg-[var(--color-primary-50)] hover:text-[var(--color-foreground)]">Chatbot</Link>
          <Link href="/profile" className="rounded-md px-3 py-2 hover:bg-[var(--color-primary-50)] hover:text-[var(--color-foreground)]">Profile</Link>
        </nav>
        <Link href="/profile" aria-label="Open profile" className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-xs font-medium text-[var(--color-foreground)] shadow-sm hover:ring-2 hover:ring-[var(--color-primary-200)]">
          H
        </Link>
      </div>
    </header>
  );
}
