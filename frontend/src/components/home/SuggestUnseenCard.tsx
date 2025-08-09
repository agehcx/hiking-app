import Link from "next/link";

export function SuggestUnseenCard() {
  return (
    <section className="rounded-xl border p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">Suggest an unseen place</h3>
          <p className="text-sm text-[color:var(--color-foreground)/0.75]">Tell the assistant what you’re into and find hidden gems.</p>
        </div>
        <Link href="/chat" className="rounded-md bg-[var(--color-primary-500)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-600)]">
          Ask the assistant
        </Link>
      </div>
    </section>
  );
}
