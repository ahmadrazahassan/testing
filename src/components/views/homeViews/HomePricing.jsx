const plans = [
  {
    name: 'Starter',
    price: '$9',
    cadence: '/ month',
    desc: 'Solo creators validating their first listings.',
    features: ['Up to 25 active listings', 'Standard payouts', 'Email support', 'Core analytics'],
    cta: 'Choose Starter',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$29',
    cadence: '/ month',
    desc: 'Growing catalogs with faster review and priority routing.',
    features: ['Unlimited listings', 'Priority payouts', 'Dedicated support window', 'Advanced reporting', 'API access'],
    cta: 'Choose Professional',
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    desc: 'Procurement, compliance, and white-glove onboarding.',
    features: ['Volume pricing', 'SLA & security review', 'Custom contracts', 'Solutions engineer'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

function CheckRow({ children }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
      <span>{children}</span>
    </li>
  )
}

export function HomePricing() {
  return (
    <section className="border-t border-[var(--border-default)] pt-16 lg:pt-24" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Pricing</p>
          <h2 id="pricing-heading" className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Plans that scale with your catalog
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Straightforward tiers. Upgrade when volume, support, or compliance requirements grow—no hidden usage traps.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                'relative flex flex-col border bg-[var(--surface)] p-8 lg:p-9',
                plan.highlighted
                  ? 'border-zinc-900 shadow-[0_0_0_1px_rgba(24,24,27,1)] dark:border-zinc-100 dark:shadow-[0_0_0_1px_rgba(250,250,250,0.2)]'
                  : 'border-[var(--border-default)]',
              ].join(' ')}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-8">
                  <span className="inline-block rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{plan.name}</h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{plan.desc}</p>
              </div>
              <div className="mt-8 flex items-baseline gap-1 border-b border-[var(--border-default)] pb-8">
                <span className="text-4xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
                  {plan.price}
                </span>
                {plan.cadence ? (
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{plan.cadence}</span>
                ) : null}
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <CheckRow key={f}>{f}</CheckRow>
                ))}
              </ul>
              <button
                type="button"
                className={[
                  'mt-10 w-full py-3.5 text-sm',
                  plan.highlighted ? 'primary-btn' : 'btn-pill-outline-dark dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800/50',
                ].join(' ')}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-500">
          All plans include secure checkout, buyer messaging, and standard fraud monitoring.
        </p>
      </div>
    </section>
  )
}
