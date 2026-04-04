const items = [
  {
    title: 'Mission',
    body: 'Reduce friction between creators and buyers through transparent pricing, licensing, and delivery.',
  },
  {
    title: 'Operations',
    body: 'Reusable workflows, audit-friendly records, and tooling that scales from solo studios to enterprise procurement.',
  },
  {
    title: 'Quality',
    body: 'Product and interface standards that prioritize clarity, accessibility, and long-term maintainability.',
  },
]

export function AboutPrinciples() {
  return (
    <div className="grid gap-px bg-[var(--border-default)] md:grid-cols-3">
      {items.map((x) => (
        <article key={x.title} className="bg-[var(--surface)] p-8">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{x.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{x.body}</p>
        </article>
      ))}
    </div>
  )
}
