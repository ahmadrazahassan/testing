import { Link } from 'react-router-dom'
import { AboutLead } from '../views/aboutViews/AboutLead.jsx'
import { AboutMetrics } from '../views/aboutViews/AboutMetrics.jsx'
import { AboutMedia } from '../views/aboutViews/AboutMedia.jsx'
import { AboutPrinciples } from '../views/aboutViews/AboutPrinciples.jsx'

export default function About() {
  return (
    <div>
      <section className="border-b border-[var(--border-default)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <AboutLead />
            <AboutMetrics />
          </div>
          <AboutMedia />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AboutPrinciples />
        <div className="mt-12 flex justify-center border-t border-[var(--border-default)] pt-12">
          <Link to="/contact" className="primary-btn px-6 py-2.5 text-sm font-medium">
            Contact sales
          </Link>
        </div>
      </section>
    </div>
  )
}
