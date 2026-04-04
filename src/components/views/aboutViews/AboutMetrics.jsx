const metrics = [
  { label: 'Active creators', value: '1,200+' },
  { label: 'Average satisfaction', value: '4.8 / 5' },
]

export function AboutMetrics() {
  return (
    <dl className="mt-10 grid grid-cols-2 gap-px bg-[var(--border-default)] sm:max-w-md">
      {metrics.map((m) => (
        <div key={m.label} className="bg-[var(--surface)] p-5">
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{m.label}</dt>
          <dd className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{m.value}</dd>
        </div>
      ))}
    </dl>
  )
}
