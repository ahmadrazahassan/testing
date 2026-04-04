export function ContactIntro() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Contact</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Talk to the team</h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Partnerships, onboarding, billing, and technical support. We route requests to the right owner and respond within
        one business day.
      </p>
      <div className="mt-8 space-y-4 border-t border-[var(--border-default)] pt-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Email</p>
          <a href="mailto:support@gooomly.com" className="mt-1 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
            support@gooomly.com
          </a>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Phone</p>
          <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">+92 300 0000000</p>
        </div>
      </div>
    </div>
  )
}
