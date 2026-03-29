// ============================================================
// Utility — Search, Filter & Sort Engine
// Demonstrates: filter(), map(), sort(), reduce(), find(),
//               includes(), every(), some()
// ============================================================

/**
 * Reads current UI filter / search state from the DOM controls.
 */
const getSearchState = () => ({
    query: cleanInput(document.getElementById("searchInput")?.value || "").toLowerCase(),
    category: document.getElementById("categoryFilter")?.value || "all",
    status: document.getElementById("statusFilter")?.value || "all",
    price: document.getElementById("priceFilter")?.value || "all",
    rating: document.getElementById("ratingFilter")?.value || "all",
    sort: document.getElementById("sortFilter")?.value || "default",
});

/**
 * Returns a new array of products matching ALL active filters.
 *
 * Array methods used:
 *   • filter()   — main filtering
 *   • includes() — title substring search
 *   • sort()     — ordering
 *   • some()     — check if ANY product matches a condition
 *   • every()    — check if ALL products pass a threshold
 *   • find()     — locate a single product
 *   • map()      — projection (used in renderProducts)
 *   • reduce()   — aggregate stats
 */
const getFilteredProducts = () => {
    const state = getSearchState();

    // ── filter() + includes() ──────────────────────────
    let filtered = [...products].filter((p) => {
        // Search by title (uses includes from stringHelpers)
        if (state.query && !titleMatchesQuery(p.title, state.query)) return false;

        // Filter by category
        if (state.category !== "all" && p.category !== state.category) return false;

        // Filter by status
        if (state.status !== "all" && p.status !== state.status) return false;

        // Filter by price range
        if (state.price === "low" && p.price >= 25) return false;
        if (state.price === "mid" && (p.price < 25 || p.price > 50)) return false;
        if (state.price === "high" && p.price <= 50) return false;

        // Filter by rating
        if (state.rating === "4plus" && p.rating < 4) return false;
        if (state.rating === "3plus" && p.rating < 3) return false;

        return true;
    });

    // ── sort() ─────────────────────────────────────────
    if (state.sort === "priceAsc") filtered.sort((a, b) => a.price - b.price);
    if (state.sort === "priceDesc") filtered.sort((a, b) => b.price - a.price);
    if (state.sort === "ratingDesc") filtered.sort((a, b) => b.rating - a.rating);
    if (state.sort === "dateDesc") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return filtered;
};

/**
 * Computes aggregate catalog statistics using reduce().
 */
const getCatalogStats = () => {
    // ── reduce() — total revenue, avg price, avg rating ─
    const stats = products.reduce(
        (acc, p) => {
            acc.totalRevenue += p.price * p.downloads;
            acc.totalPrice += p.price;
            acc.totalRating += p.rating;
            acc.count += 1;
            return acc;
        },
        { totalRevenue: 0, totalPrice: 0, totalRating: 0, count: 0 }
    );

    return {
        totalRevenue: stats.totalRevenue,
        avgPrice: stats.count ? (stats.totalPrice / stats.count).toFixed(2) : 0,
        avgRating: stats.count ? (stats.totalRating / stats.count).toFixed(1) : 0,
        productCount: stats.count,
    };
};

/**
 * Checks if every product passes a quality threshold using every().
 */
const allProductsAboveRating = (threshold) => products.every((p) => p.rating >= threshold);

/**
 * Checks if some products match a condition using some().
 */
const hasProductInCategory = (category) => products.some((p) => p.category === category);

/**
 * Finds a single product by id using find().
 */
const findProductById = (id) => products.find((p) => p.id === id);
