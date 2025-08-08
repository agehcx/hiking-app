import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Hiking App</h1>
        <p className="text-gray-600">Plan routes, track hikes, use offline maps, and get voice navigation.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/trail/demo" className="rounded-lg border p-4 hover:bg-gray-50">
          <h2 className="font-semibold">Try a demo trail →</h2>
          <p className="text-sm text-gray-600">Open trail page with map and info.</p>
        </Link>
        <Link href="/api/v1/health" className="rounded-lg border p-4 hover:bg-gray-50">
          <h2 className="font-semibold">API health</h2>
          <p className="text-sm text-gray-600">Check backend route wiring.</p>
        </Link>
      </section>
    </main>
  );
}
