import { Link } from 'react-router-dom'

export function HomeClosingCta() {
  return (
    <section className="mt-16 border border-[var(--border-default)] bg-[var(--surface)] px-6 py-14 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Open a storefront</h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Onboard in minutes. Standard contracts, clear fees, and tooling for catalog operations.
        </p>
        <Link to="/signup" className="primary-btn mt-8 inline-flex px-6 py-2.5 text-sm font-medium">
          Create an account
        </Link>
      </div>
    </section>
  )
}
