// ============================================================
// Database — Product Catalog (Array of Objects)
// ============================================================

// Default product template — frozen so it cannot be mutated
const DEFAULT_PRODUCT_TEMPLATE = Object.freeze({
    id: 0,
    title: "",
    category: "",
    price: 0,
    rating: 0,
    downloads: 0,
    status: "draft",
    createdAt: new Date().toISOString().slice(0, 10),
});

// Initial seed data — each object includes all required properties
let products = [
    {
        id: 1,
        title: "Starter UI Kit",
        category: "UI Kit",
        price: 19,
        rating: 4.3,
        downloads: 320,
        status: "published",
        createdAt: "2024-01-15",
    },
    {
        id: 2,
        title: "3D Social Icons",
        category: "3D Asset",
        price: 29,
        rating: 4.7,
        downloads: 540,
        status: "published",
        createdAt: "2024-02-10",
    },
    {
        id: 3,
        title: "Portfolio Mockup Pack",
        category: "Template",
        price: 39,
        rating: 4.1,
        downloads: 190,
        status: "draft",
        createdAt: "2024-03-05",
    },
    {
        id: 4,
        title: "Landing Page Blocks",
        category: "UI Kit",
        price: 59,
        rating: 4.9,
        downloads: 860,
        status: "published",
        createdAt: "2024-01-28",
    },
    {
        id: 5,
        title: "Animated Illustrations",
        category: "3D Asset",
        price: 45,
        rating: 4.5,
        downloads: 410,
        status: "published",
        createdAt: "2024-04-12",
    },
    {
        id: 6,
        title: "Dashboard Template Pro",
        category: "Template",
        price: 69,
        rating: 4.8,
        downloads: 720,
        status: "published",
        createdAt: "2024-02-20",
    },
];
