export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      <div className="mb-10 h-44 rounded-2xl bg-border/60" />

      <section className="grid gap-6 lg:grid-cols-2">
        {[1, 2].map((col) => (
          <div
            key={col}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="mb-6 h-6 w-40 rounded bg-border/70" />

            {[1, 2].map((item) => (
              <div
                key={item}
                className="mb-4 rounded-xl border border-border p-5"
              >
                <div className="mb-3 h-5 w-3/4 rounded bg-border/70" />
                <div className="mb-4 h-4 w-1/2 rounded bg-border/70" />
                <div className="flex items-center justify-between">
                  <div className="h-7 w-24 rounded-full bg-border/70" />
                  <div className="h-9 w-24 rounded-lg bg-border/70" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
