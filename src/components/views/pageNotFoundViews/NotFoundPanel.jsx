import { Link } from 'react-router-dom'

export function NotFoundPanel() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col justify-center px-4 py-16 text-center sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        The requested URL is not available. Check the address or return to the home page.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="primary-btn inline-flex px-5 py-2.5 text-sm font-medium">
          Home
        </Link>
        <Link to="/contact" className="btn-pill-outline-dark px-6 py-2.5 text-sm dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800/50">
          Contact
        </Link>
      </div>
    </div>
  )
}
