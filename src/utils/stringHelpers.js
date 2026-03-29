// ============================================================
// Utility — String Helper Methods (15 string methods demonstrated)
// ============================================================

/**
 * 1. trim() — removes whitespace from user inputs
 */
const cleanInput = (value) => value.trim();

/**
 * 2. toLowerCase() — normalizes strings for case-insensitive search
 */
const normalizeSearch = (value) => value.toLowerCase();

/**
 * 3. toUpperCase() — converts category names for tag display
 */
const formatCategoryTag = (category) => category.toUpperCase();

/**
 * 4. includes() — checks whether a substring exists (used in search)
 */
const titleMatchesQuery = (title, query) => normalizeSearch(title).includes(normalizeSearch(query));

/**
 * 5. startsWith() — validates that product title starts with a letter
 */
const titleStartsWithLetter = (title) => /^[a-zA-Z]/.test(title) && title.startsWith(title.charAt(0));

/**
 * 6. endsWith() — checks file-extension style suffixes (e.g. "Pro", "Kit")
 */
const titleEndsWith = (title, suffix) => title.endsWith(suffix);

/**
 * 7. slice() — truncates long titles for card previews
 */
const truncateTitle = (title, maxLength = 28) =>
    title.length > maxLength ? title.slice(0, maxLength).concat("…") : title;

/**
 * 8. split() — splits comma-separated tag strings into arrays
 */
const parseTags = (tagString) => tagString.split(",").map((t) => cleanInput(t));

/**
 * 9. replace() — cleans special characters from input
 */
const sanitizeInput = (value) => value.replace(/[<>]/g, "");

/**
 * 10. replaceAll() — normalizes multiple spaces to single space
 */
const normalizeSpaces = (value) => value.replaceAll(/\s+/g, " ");

/**
 * 11. charAt() — gets initial letter for avatar placeholder
 */
const getInitial = (title) => title.charAt(0).toUpperCase();

/**
 * 12. indexOf() — finds position of a keyword in title
 */
const findKeywordPosition = (title, keyword) => normalizeSearch(title).indexOf(normalizeSearch(keyword));

/**
 * 13. padStart() — formats prices with leading zeros (display utility)
 */
const formatPrice = (price) => String(price).padStart(6, " ");

/**
 * 14. repeat() — generates star characters for rating display
 */
const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return "★".repeat(fullStars) + (halfStar ? "☆" : "") + "☆".repeat(emptyStars);
};

/**
 * 15. substring() — extracts a readable excerpt from title
 */
const getExcerpt = (title, start = 0, end = 15) =>
    title.length > end ? title.substring(start, end).concat("...") : title;

/**
 * Master sanitizer — chains trim, sanitize, normalizeSpaces
 * Used on all form inputs before creating / updating products.
 */
const sanitizeFormValue = (value) => normalizeSpaces(sanitizeInput(cleanInput(value)));
