import { useState } from 'react'

const marketplaceName = 'Gooomly'
const totalCreators = 1250
const itemsForSale = 4800
const averageRating = 4.7
const topCategories = ['Graphic design', 'Web development', 'Video', '3D', 'Photography']
const creatorProfile = {
  name: 'Ahmad Raza Hassan',
  specialty: 'UI/UX design, web engineering',
  rating: 4.9,
  isOnline: true,
  itemsSold: 320,
}

function MessagePanel({ children, variant }) {
  const styles =
    variant === 'success'
      ? 'border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
      : variant === 'danger'
        ? 'border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
        : 'border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'

  return <div className={`rounded-md border px-4 py-3 text-sm ${styles}`}>{children}</div>
}

export function HomeMarketplaceOverview() {
  const [isOpen, setIsOpen] = useState(true)
  const [summaryHtml, setSummaryHtml] = useState(null)
  const [systemMsg, setSystemMsg] = useState(null)

  function showSummary() {
    const categoryList = topCategories.join(', ')
    setSummaryHtml(
      <div className="rounded-md border border-[var(--border-default)] bg-[var(--surface)] p-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Marketplace summary</h3>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-200">Name:</span> {marketplaceName}
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-200">Status:</span>{' '}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">{isOpen ? 'Open' : 'Closed'}</span>
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-200">Total creators:</span>{' '}
            {totalCreators.toLocaleString()}
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-200">Items for sale:</span>{' '}
            {itemsForSale.toLocaleString()}
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-200">Average rating:</span> {averageRating} / 5
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-200">Top categories:</span> {categoryList}
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-200">Featured creator:</span> {creatorProfile.name}{' '}
            ({creatorProfile.specialty})
          </li>
        </ul>
      </div>
    )
    setSystemMsg(
      <MessagePanel variant="success">
        Summary generated at <span className="font-medium">{new Date().toLocaleTimeString()}</span>
      </MessagePanel>
    )
  }

  function toggleStatus() {
    setIsOpen((prev) => {
      const next = !prev
      setSystemMsg(
        <MessagePanel>
          Marketplace marked as <span className="font-medium">{next ? 'open' : 'closed'}</span> at{' '}
          {new Date().toLocaleTimeString()}
        </MessagePanel>
      )
      return next
    })
  }

  return (
    <section className="space-y-10">
      <div className="border-b border-[var(--border-default)] pb-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Operations overview</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Live metrics and catalog signals for the Gooomly marketplace demo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px bg-[var(--border-default)] sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total creators', value: totalCreators.toLocaleString(), type: 'stat' },
          { label: 'Items for sale', value: itemsForSale.toLocaleString(), type: 'stat' },
          { label: 'Average rating', value: `${averageRating} / 5`, type: 'stat' },
          { label: 'Marketplace status', value: isOpen ? 'Open' : 'Closed', type: 'status', open: isOpen },
        ].map((card) => (
          <div key={card.label} className="bg-[var(--surface)] p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{card.label}</p>
            {card.type === 'status' ? (
              <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{card.value}</p>
            ) : (
              <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{card.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-[var(--border-default)] bg-[var(--surface)] p-6">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Top categories</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {topCategories.map((cat) => (
              <li
                key={cat}
                className="rounded-md border border-[var(--border-default)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[var(--border-default)] bg-[var(--surface)] p-6">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Featured creator</h3>
          <p className="mt-4 text-base font-medium text-zinc-900 dark:text-zinc-50">{creatorProfile.name}</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{creatorProfile.specialty}</p>
          <dl className="mt-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between gap-4">
              <dt>Rating</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-200">{creatorProfile.rating} / 5</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Items sold</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-200">{creatorProfile.itemsSold}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2">
              <dt>Presence</dt>
              <dd className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-200">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${creatorProfile.isOnline ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                  aria-hidden
                />
                {creatorProfile.isOnline ? 'Online' : 'Offline'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={showSummary} className="primary-btn px-5 py-2.5 text-sm font-medium">
          Generate summary
        </button>
        <button type="button" onClick={toggleStatus} className="btn-pill-outline-dark px-6 py-2.5 text-sm dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800/50">
          Toggle status
        </button>
      </div>
      {systemMsg && <div>{systemMsg}</div>}
      {summaryHtml && <div>{summaryHtml}</div>}
    </section>
  )
}
