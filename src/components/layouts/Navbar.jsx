import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../ThemeToggle.jsx'
import { IconClose, IconMenu } from '../icons.jsx'

const logoSrc = '/favicon.svg'

const linkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100',
  ].join(' ')

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-[var(--surface)]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logoSrc} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Gooomly</span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          <li>
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </li>
          <li>
            <Link
              to="/#product-operations"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
            >
              Products
            </Link>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            to="/signin"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/80 sm:inline-block"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="primary-btn hidden px-4 py-2 text-sm font-medium sm:inline-block"
          >
            Get started
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 md:hidden dark:border-zinc-700 dark:text-zinc-200"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--border-default)] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-0.5">
            <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
              About
            </NavLink>
            <Link
              to="/#product-operations"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
              Contact
            </NavLink>
            <Link
              to="/signin"
              className="rounded-md px-3 py-2 text-sm text-zinc-700 dark:text-zinc-200"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="primary-btn mt-1 px-4 py-2.5 text-center text-sm"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
