import { useTheme } from '../context/ThemeContext.jsx'

function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  )
}

export function ThemeToggle() {
  const { toggle, isDark } = useTheme()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggle}
      className="relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border border-zinc-200/90 bg-zinc-100/90 p-0.5 shadow-inner transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-600/90 dark:bg-zinc-800/90 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-100"
    >
      <span
        className={[
          'pointer-events-none absolute left-0.5 top-0.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-900/5 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:bg-zinc-200 dark:ring-white/10',
          isDark ? 'translate-x-6' : 'translate-x-0',
        ].join(' ')}
      >
        {isDark ? <MoonIcon className="h-3.5 w-3.5 text-zinc-800" /> : <SunIcon className="h-3.5 w-3.5 text-zinc-600" />}
      </span>
      <span className="flex w-full justify-between px-1 opacity-30 dark:opacity-25" aria-hidden>
        <SunIcon className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
        <MoonIcon className="h-3 w-3 text-zinc-500 dark:text-zinc-300" />
      </span>
    </button>
  )
}
