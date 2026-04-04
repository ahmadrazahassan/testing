import { Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/#product-operations', label: 'Product' },
  { to: '/contact', label: 'Contact' },
  { to: '/signin', label: 'Sign in' },
  { to: '/signup', label: 'Sign up' },
]

const linkClass =
  'text-sm font-semibold text-zinc-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50'

export function Footer() {
  return (
    <div className="bg-[var(--page-bg)] px-3 pb-3 pt-10 sm:px-4 sm:pb-4 md:px-6 md:pt-14">
      <footer className="overflow-hidden rounded-t-2xl bg-zinc-950 text-white sm:rounded-t-3xl">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-20 md:py-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">Gooomly</p>

          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl md:leading-[1.02]">
            Ship your next
            <br />
            digital product.
          </h2>

          <p className="mx-auto mt-6 max-w-md text-pretty text-base font-medium leading-relaxed text-zinc-400 sm:text-lg">
            The modern storefront for licensed assets—clear pricing, fast payouts, zero noise.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup" className="primary-btn px-8 py-3.5 text-sm sm:px-10 sm:py-4 sm:text-[15px]">
              Get started
            </Link>
            <Link
              to="/contact"
              className="btn-pill-outline-light px-8 py-3.5 text-sm sm:px-10 sm:py-4 sm:text-[15px]"
            >
              Book a demo
            </Link>
          </div>

          <nav className="mt-16 border-t border-white/[0.08] pt-14" aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-10 text-xs font-medium text-zinc-500 sm:flex-row sm:text-sm">
            <p>© {new Date().getFullYear()} Ahmed Raza</p>
            <div className="flex flex-wrap justify-center gap-6 text-zinc-500">
              <span className="cursor-default">Privacy</span>
              <span className="cursor-default">Terms</span>
              <span className="cursor-default">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
