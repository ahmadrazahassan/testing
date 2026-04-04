import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { THEME } from '../constants/theme.js'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return THEME.LIGHT
    const saved = localStorage.getItem(THEME.STORAGE_KEY)
    if (saved === THEME.DARK || saved === THEME.LIGHT) return saved
    return THEME.LIGHT
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === THEME.DARK) root.classList.add(THEME.DARK_CLASS)
    else root.classList.remove(THEME.DARK_CLASS)
    localStorage.setItem(THEME.STORAGE_KEY, theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === THEME.DARK ? THEME.LIGHT : THEME.DARK))
  }, [])

  const value = useMemo(() => ({ theme, toggle, isDark: theme === THEME.DARK }), [theme, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
