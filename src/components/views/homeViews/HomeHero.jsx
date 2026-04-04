import { Link } from 'react-router-dom'

export function HomeHero() {
  return (
    <section className="border-b border-[var(--border-default)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Marketplace</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
            Sell digital products with a clear, trusted storefront.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Gooomly connects creators with buyers for UI kits, 3D assets, templates, and licensed digital work—built for
            scale and operational control.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/signup" className="primary-btn inline-flex justify-center px-5 py-2.5 text-sm font-medium">
              Become a creator
            </Link>
            <Link to="/#product-operations" className="btn-pill-outline-dark justify-center px-6 py-2.5 text-sm dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800/50">
              View catalog tools
            </Link>
          </div>
        </div>
        <div className="mt-14 border border-[var(--border-default)] bg-[var(--surface-muted)] p-1 lg:mt-20">
          <div className="aspect-[21/9] min-h-[200px] bg-zinc-200 dark:bg-zinc-800">
            <img
              src="/assets/images/gooomly-hero.png"
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
