import { cleanInput, sanitizeFormValue, titleMatchesQuery, titleStartsWithLetter, truncateTitle } from './stringHelpers.js'
import { DEFAULT_PRODUCT_TEMPLATE } from '../data/productsSeed.js'

const STATUS_LABELS = Object.freeze({
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
})

const STATUS_STYLES = Object.freeze({
  published: 'text-zinc-900 dark:text-zinc-100',
  draft: 'text-zinc-600 dark:text-zinc-400',
  archived: 'text-zinc-500 dark:text-zinc-500',
})

export function getFilteredProducts(products, state) {
  let filtered = [...products].filter((p) => {
    const q = cleanInput(state.query || '').toLowerCase()
    if (q && !titleMatchesQuery(p.title, q)) return false
    if (state.category !== 'all' && p.category !== state.category) return false
    if (state.status !== 'all' && p.status !== state.status) return false
    if (state.price === 'low' && p.price >= 25) return false
    if (state.price === 'mid' && (p.price < 25 || p.price > 50)) return false
    if (state.price === 'high' && p.price <= 50) return false
    if (state.rating === '4plus' && p.rating < 4) return false
    if (state.rating === '3plus' && p.rating < 3) return false
    return true
  })

  if (state.sort === 'priceAsc') filtered.sort((a, b) => a.price - b.price)
  if (state.sort === 'priceDesc') filtered.sort((a, b) => b.price - a.price)
  if (state.sort === 'ratingDesc') filtered.sort((a, b) => b.rating - a.rating)
  if (state.sort === 'dateDesc')
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return filtered
}

export function getCatalogStats(products) {
  const stats = products.reduce(
    (acc, p) => {
      acc.totalRevenue += p.price * p.downloads
      acc.totalPrice += p.price
      acc.totalRating += p.rating
      acc.count += 1
      return acc
    },
    { totalRevenue: 0, totalPrice: 0, totalRating: 0, count: 0 }
  )
  return {
    totalRevenue: stats.totalRevenue,
    avgPrice: stats.count ? (stats.totalPrice / stats.count).toFixed(2) : 0,
    avgRating: stats.count ? (stats.totalRating / stats.count).toFixed(1) : 0,
    productCount: stats.count,
  }
}

export const allProductsAboveRating = (products, threshold) =>
  products.every((p) => p.rating >= threshold)

export const hasProductInCategory = (products, category) =>
  products.some((p) => p.category === category)

export function findProductById(products, id) {
  return products.find((p) => p.id === id)
}

export function createProductRecord(products, formData) {
  const title = sanitizeFormValue(formData.title)
  if (!titleStartsWithLetter(cleanInput(formData.title))) {
    return { error: 'Title must start with a letter.' }
  }
  const newProduct = Object.assign({}, DEFAULT_PRODUCT_TEMPLATE, {
    id: Date.now(),
    title,
    category: sanitizeFormValue(formData.category),
    price: Number(formData.price),
    rating: Number(formData.rating),
    downloads: Number(formData.downloads),
    status: formData.status,
    createdAt: new Date().toISOString().slice(0, 10),
  })
  return { products: [...products, newProduct], next: newProduct }
}

export function updateProductRecord(products, id, formData) {
  return products.map((item) =>
    item.id === id
      ? Object.assign({}, item, {
          title: sanitizeFormValue(formData.title),
          category: sanitizeFormValue(formData.category),
          price: Number(formData.price),
          rating: Number(formData.rating),
          downloads: Number(formData.downloads),
          status: formData.status,
        })
      : item
  )
}

export function deleteProductRecord(products, id) {
  return products.filter((item) => item.id !== id)
}

export function getObjectMethodsReportLines(products) {
  if (!products.length) return [{ text: 'No products to analyze.' }]
  const sample = products[0]
  const keys = Object.keys(sample)
  const values = Object.values(sample)
  const entries = Object.entries(sample)
  const clone = Object.assign({}, sample, { status: 'cloned' })
  return [
    { text: `Object.keys(): [${keys.join(', ')}]` },
    {
      text: `Object.values(): [${values.map((v) => (typeof v === 'string' ? `"${truncateTitle(String(v), 15)}"` : v)).join(', ')}]`,
    },
    { text: `Object.entries(): ${entries.length} key-value pairs` },
    {
      text: `Object.assign(): Cloned "${truncateTitle(sample.title, 20)}" → status set to "${clone.status}"`,
    },
    {
      text: `Object.freeze(): DEFAULT_PRODUCT_TEMPLATE is frozen (${Object.isFrozen(DEFAULT_PRODUCT_TEMPLATE) ? '✓ immutable' : '✗ mutable'})`,
    },
    {
      text: `Object.freeze(): STATUS_LABELS is frozen (${Object.isFrozen(STATUS_LABELS) ? '✓ immutable' : '✗ mutable'})`,
    },
  ]
}

export { STATUS_LABELS, STATUS_STYLES }
