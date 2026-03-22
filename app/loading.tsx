export default function Loading() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)] pt-24">
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-3xl">
            <div className="h-4 w-32 animate-pulse rounded-full bg-[var(--color-surface-muted)]" />
            <div className="mt-6 h-10 w-full max-w-[620px] animate-pulse rounded-2xl bg-[var(--color-surface-muted)]" />
            <div className="mt-3 h-10 w-full max-w-[560px] animate-pulse rounded-2xl bg-[var(--color-surface-muted)]" />
            <div className="mt-6 h-5 w-full max-w-[520px] animate-pulse rounded-lg bg-[var(--color-surface-muted)]" />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="h-5 w-40 animate-pulse rounded-md bg-[var(--color-surface-muted)]" />
                <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-[var(--color-surface-muted)]" />
                <div className="mt-2 h-4 w-[86%] animate-pulse rounded-md bg-[var(--color-surface-muted)]" />
                <div className="mt-2 h-4 w-[68%] animate-pulse rounded-md bg-[var(--color-surface-muted)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
