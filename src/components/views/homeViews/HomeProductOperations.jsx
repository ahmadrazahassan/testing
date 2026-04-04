import { useMemo, useState } from 'react'
import { INITIAL_PRODUCTS } from '../../../data/productsSeed.js'
import {
  STATUS_LABELS,
  STATUS_STYLES,
  allProductsAboveRating,
  createProductRecord,
  deleteProductRecord,
  findProductById,
  getCatalogStats,
  getFilteredProducts,
  hasProductInCategory,
  updateProductRecord,
} from '../../../lib/productCatalog.js'
import { IconClose } from '../../icons.jsx'
import { formatCategoryTag, formatRating, getInitial, truncateTitle } from '../../../lib/stringHelpers.js'

const defaultFilters = {
  query: '',
  category: 'all',
  status: 'all',
  price: 'all',
  rating: 'all',
  sort: 'default',
}

const fieldClass =
  'rounded-md border border-[var(--border-default)] bg-[var(--surface)] px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100'

function MessageBanner({ type, children }) {
  const styles =
    type === 'success'
      ? 'border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
      : type === 'danger'
        ? 'border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
        : 'border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'

  return <div className={`rounded-md border px-4 py-3 text-sm ${styles}`}>{children}</div>
}

export function HomeProductOperations() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [filters, setFilters] = useState(defaultFilters)
  const [message, setMessage] = useState({ text: 'Catalog workspace ready.', type: 'info' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(null)

  const visible = useMemo(() => getFilteredProducts(products, filters), [products, filters])

  const combined = useMemo(() => {
    let premium = 0
    let standard = 0
    let draft = 0
    for (let i = 0; i < products.length; i += 1) {
      if (products[i].status === 'draft') draft += 1
      else if (products[i].price >= 40) premium += 1
      else standard += 1
    }
    const allRated4 = allProductsAboveRating(products, 4)
    const has3D = hasProductInCategory(products, '3D Asset')
    return { premium, standard, draft, allRated4, has3D }
  }, [products])

  const catalogStats = useMemo(() => getCatalogStats(products), [products])

  function onCreate(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const formData = {
      title: fd.get('title'),
      category: fd.get('category'),
      price: fd.get('price'),
      rating: fd.get('rating'),
      downloads: fd.get('downloads'),
      status: fd.get('status'),
    }
    const result = createProductRecord(products, formData)
    if (result.error) {
      setMessage({ text: result.error, type: 'danger' })
      return
    }
    setProducts(result.products)
    e.target.reset()
    setMessage({ text: 'Product added to catalog.', type: 'success' })
  }

  function onDelete(id) {
    setProducts((p) => deleteProductRecord(p, id))
    setMessage({ text: 'Product removed.', type: 'danger' })
  }

  function openEdit(id) {
    const p = findProductById(products, id)
    if (!p) return
    setEditingId(id)
    setEditForm({ ...p })
  }

  function closeEdit() {
    setEditingId(null)
    setEditForm(null)
  }

  function onUpdate(e) {
    e.preventDefault()
    if (!editingId || !editForm) return
    setProducts((p) => updateProductRecord(p, editingId, editForm))
    closeEdit()
    setMessage({ text: 'Product updated.', type: 'success' })
  }

  return (
    <section id="product-operations" className="scroll-mt-24 space-y-10 border-t border-[var(--border-default)] pt-16">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Product operations</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Catalog records, filters, and reporting in a single workspace.
        </p>
      </div>

      {message.text && <MessageBanner type={message.type}>{message.text}</MessageBanner>}

      <div className="border border-[var(--border-default)] bg-[var(--surface)] p-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Create product</h3>
        <form onSubmit={onCreate} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <input name="title" required placeholder="Title" className={fieldClass} />
          <input name="category" required placeholder="Category" className={fieldClass} />
          <input name="price" type="number" min={1} required placeholder="Price (USD)" className={fieldClass} />
          <input name="rating" type="number" step="0.1" min={1} max={5} required placeholder="Rating" className={fieldClass} />
          <input name="downloads" type="number" min={0} required placeholder="Downloads" className={fieldClass} />
          <select name="status" className={fieldClass}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button type="submit" className="primary-btn md:col-span-2 px-5 py-2.5 text-sm font-medium">
            Create product
          </button>
        </form>
      </div>

      <div className="border border-[var(--border-default)] bg-[var(--surface)] p-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Search and filters</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            value={filters.query}
            onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
            placeholder="Search by title"
            className={fieldClass}
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            className={fieldClass}
          >
            <option value="all">All categories</option>
            <option value="UI Kit">UI Kit</option>
            <option value="3D Asset">3D Asset</option>
            <option value="Template">Template</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            className={fieldClass}
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={filters.price}
            onChange={(e) => setFilters((f) => ({ ...f, price: e.target.value }))}
            className={fieldClass}
          >
            <option value="all">All prices</option>
            <option value="low">Under $25</option>
            <option value="mid">$25–$50</option>
            <option value="high">Above $50</option>
          </select>
          <select
            value={filters.rating}
            onChange={(e) => setFilters((f) => ({ ...f, rating: e.target.value }))}
            className={fieldClass}
          >
            <option value="all">All ratings</option>
            <option value="4plus">4.0+</option>
            <option value="3plus">3.0+</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
            className={fieldClass}
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price ascending</option>
            <option value="priceDesc">Price descending</option>
            <option value="ratingDesc">Rating</option>
            <option value="dateDesc">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.length === 0 && (
          <div className="col-span-full border border-dashed border-[var(--border-default)] p-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No products match the current filters.
          </div>
        )}
        {visible.map((product) => {
          const statusLabel = STATUS_LABELS[product.status] || product.status
          const statusStyle = STATUS_STYLES[product.status] || ''
          const initial = getInitial(product.title)
          const displayTitle = truncateTitle(product.title, 30)
          const categoryTag = formatCategoryTag(product.category)
          return (
            <div key={product.id} className="border border-[var(--border-default)] bg-[var(--surface)] p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {initial}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{displayTitle}</h4>
                  <span className="mt-1 inline-block rounded border border-[var(--border-default)] px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {categoryTag}
                  </span>
                </div>
              </div>
              <dl className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between gap-2">
                  <dt>Price</dt>
                  <dd className="font-medium text-zinc-900 dark:text-zinc-100">${product.price}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Rating</dt>
                  <dd className="font-medium text-zinc-900 dark:text-zinc-100">{formatRating(product.rating)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Downloads</dt>
                  <dd>{product.downloads.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Added</dt>
                  <dd>{product.createdAt}</dd>
                </div>
                <div className="pt-1">
                  <dt className="sr-only">Status</dt>
                  <dd className={`text-sm font-medium ${statusStyle}`}>{statusLabel}</dd>
                </div>
              </dl>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => openEdit(product.id)} className="primary-btn px-4 py-2 text-xs font-medium">
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  className="btn-pill-outline-dark px-4 py-2 text-xs dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border border-[var(--border-default)] bg-[var(--surface)] p-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Multi-view catalog</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {products.map((item) => (
            <div key={item.id} className="border border-[var(--border-default)] bg-[var(--surface-muted)] p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {getInitial(item.title)}
                </span>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">{truncateTitle(item.title, 22)}</p>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatCategoryTag(item.category)} — ${item.price}
              </p>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{formatRating(item.rating)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">List</h4>
          <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            {products.map((item) => (
              <li key={item.id}>
                {item.title} ({item.category}) — ${item.price} — {formatRating(item.rating)}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 overflow-x-auto">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Table</h4>
          <table className="mt-2 min-w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="border-b border-[var(--border-default)] text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              <tr>
                <th className="px-3 py-2 font-medium">Title</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b border-[var(--border-default)]">
                  <td className="px-3 py-2">{item.title}</td>
                  <td className="px-3 py-2">{item.category}</td>
                  <td className="px-3 py-2">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-[var(--border-default)] bg-[var(--surface)] p-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Segment summary</h3>
        <div className="mt-4 grid grid-cols-2 gap-px bg-[var(--border-default)] md:grid-cols-4">
          <div className="bg-[var(--surface-muted)] p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Catalog size</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{catalogStats.productCount}</p>
          </div>
          <div className="bg-[var(--surface-muted)] p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Average price</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">${catalogStats.avgPrice}</p>
          </div>
          <div className="bg-[var(--surface-muted)] p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Average rating</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{catalogStats.avgRating}</p>
          </div>
          <div className="bg-[var(--surface-muted)] p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Estimated revenue</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              ${catalogStats.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
        <ul className="mt-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            All products rated at least 4.0: <span className="font-medium text-zinc-900 dark:text-zinc-200">{combined.allRated4 ? 'Yes' : 'No'}</span>
          </li>
          <li>
            Includes 3D assets: <span className="font-medium text-zinc-900 dark:text-zinc-200">{combined.has3D ? 'Yes' : 'No'}</span>
          </li>
          <li>
            Premium / standard / draft:{' '}
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              {combined.premium} / {combined.standard} / {combined.draft}
            </span>
          </li>
        </ul>
      </div>

      {editingId && editForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && closeEdit()}
        >
          <div className="w-full max-w-lg border border-[var(--border-default)] bg-[var(--surface)]">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Edit product</h3>
              <button
                type="button"
                className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={closeEdit}
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>
            <form onSubmit={onUpdate} className="grid gap-3 p-4">
              <input
                required
                value={editForm.title}
                onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                className={fieldClass}
              />
              <input
                required
                value={editForm.category}
                onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                className={fieldClass}
              />
              <input
                type="number"
                min={1}
                required
                value={editForm.price}
                onChange={(e) => setEditForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className={fieldClass}
              />
              <input
                type="number"
                step="0.1"
                min={1}
                max={5}
                required
                value={editForm.rating}
                onChange={(e) => setEditForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className={fieldClass}
              />
              <input
                type="number"
                min={0}
                required
                value={editForm.downloads}
                onChange={(e) => setEditForm((f) => ({ ...f, downloads: Number(e.target.value) }))}
                className={fieldClass}
              />
              <select
                value={editForm.status}
                onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                className={fieldClass}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="primary-btn px-5 py-2.5 text-sm font-medium">
                  Save
                </button>
                <button type="button" onClick={closeEdit} className="btn-pill-outline-dark px-6 py-2.5 text-sm dark:border-zinc-600 dark:text-zinc-200">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
