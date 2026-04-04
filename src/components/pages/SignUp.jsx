import { Link } from 'react-router-dom'

const logoSrc = '/favicon.svg'

const inputClass =
  'w-full rounded-full border border-[var(--border-default)] bg-[var(--surface)] px-5 py-3.5 text-[15px] text-zinc-900 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300 dark:focus:ring-white/10'

const labelClass = 'mb-2 block text-left text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400'

export default function SignUp() {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] w-full lg:grid-cols-2">
      <aside className="relative order-2 flex flex-col justify-between border-t border-[var(--border-default)] bg-zinc-950 px-8 py-10 text-white sm:px-10 sm:py-12 lg:order-1 lg:border-t-0 lg:px-14 lg:py-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5 font-semibold tracking-tight transition-opacity hover:opacity-90">
            <img src={logoSrc} alt="" width={36} height={36} className="h-9 w-9" />
            <span className="text-lg">Gooomly</span>
          </Link>
        </div>

        <div className="my-12 max-w-md lg:my-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Join the marketplace</p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Everything you need to sell digital work.
          </h2>
          <p className="mt-5 text-base font-medium leading-relaxed text-zinc-400">
            Onboarding, storefront, and payouts—structured for creators and small teams.
          </p>
          <ul className="mt-10 space-y-3 text-sm font-medium text-zinc-400">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
              Publish listings with clear licensing and pricing
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
              Track sales and withdraw on your schedule
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
              Support from a team that understands digital goods
            </li>
          </ul>
        </div>

        <p className="text-xs font-medium text-zinc-600">© {new Date().getFullYear()} Gooomly</p>
      </aside>

      <div className="order-1 flex flex-col justify-center bg-[var(--page-bg)] px-6 py-12 sm:px-10 lg:order-2 lg:border-l lg:border-[var(--border-default)] lg:px-16 lg:py-16">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Create your account</h1>
          <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
            Start listing in minutes. No credit card required to register.
          </p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
            <div>
              <label htmlFor="signup-name" className={labelClass}>
                Full name
              </label>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={inputClass}
                placeholder="Jordan Lee"
              />
            </div>
            <div>
              <label htmlFor="signup-email" className={labelClass}>
                Work email
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputClass}
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className={labelClass}>
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={inputClass}
                placeholder="At least 8 characters"
                minLength={8}
              />
              <p className="mt-2 text-left text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Use 8 or more characters with a mix of letters and numbers.
              </p>
            </div>

            <button type="submit" className="primary-btn mt-2 h-12 w-full text-[15px]">
              Create account
            </button>
          </form>

          <p className="mt-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">
              Sign in
            </Link>
          </p>

          <p className="mt-10 text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
