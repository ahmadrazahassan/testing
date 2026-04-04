import { ContactIntro } from '../views/contactViews/ContactIntro.jsx'
import { ContactFormEmbed } from '../views/contactViews/ContactFormEmbed.jsx'

export default function Contact() {
  return (
    <div className="border-b border-[var(--border-default)] bg-[var(--page-bg)]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="border border-[var(--border-default)] bg-[var(--surface)] p-8 lg:col-span-2">
            <ContactIntro />
          </div>
          <div className="lg:col-span-3">
            <ContactFormEmbed />
          </div>
        </div>
      </section>
    </div>
  )
}
