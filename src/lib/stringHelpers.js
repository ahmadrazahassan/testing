export const cleanInput = (value) => value.trim()
export const normalizeSearch = (value) => value.toLowerCase()
export const formatCategoryTag = (category) => category.toUpperCase()
export const titleMatchesQuery = (title, query) =>
  normalizeSearch(title).includes(normalizeSearch(query))
export const titleStartsWithLetter = (title) => /^[a-zA-Z]/.test(title) && title.startsWith(title.charAt(0))
export const truncateTitle = (title, maxLength = 28) =>
  title.length > maxLength ? title.slice(0, maxLength).concat('…') : title
export const sanitizeInput = (value) => value.replace(/[<>]/g, '')
export const normalizeSpaces = (value) => value.replaceAll(/\s+/g, ' ')
export const getInitial = (title) => title.charAt(0).toUpperCase()
/** Numeric rating for UI (avoids decorative star glyphs). */
export const formatRating = (rating) => `${Number(rating).toFixed(1)} / 5`

export const renderStars = formatRating

export const sanitizeFormValue = (value) =>
  normalizeSpaces(sanitizeInput(cleanInput(value)))
