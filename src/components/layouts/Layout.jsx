import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'
import { Footer } from './Footer.jsx'

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTopOnRoute />
      <Navbar />
      <main className="flex-1 min-h-[50vh] bg-[var(--page-bg)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
