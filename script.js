// ============================================================
// Main Entry Point — Orchestrator
// Loads after all module scripts and wires everything together.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme
    initTheme();
    initThemeToggle();

    // 2. Home-page specific logic (only runs if elements exist)
    populateDOM();

    const btnSummary = document.getElementById("btnShowSummary");
    if (btnSummary) btnSummary.addEventListener("click", showMarketplaceSummary);

    const btnToggle = document.getElementById("btnToggleStatus");
    if (btnToggle) btnToggle.addEventListener("click", toggleMarketplaceStatus);

    // 3. CRUD system (only runs on home page where form exists)
    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", handleProductAdd);
        document.getElementById("editForm").addEventListener("submit", handleProductUpdate);

        const filterIds = ["searchInput", "categoryFilter", "statusFilter", "priceFilter", "ratingFilter", "sortFilter"];
        filterIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener("input", renderProducts);
                el.addEventListener("change", renderProducts);
            }
        });

        document.getElementById("cancelEdit").addEventListener("click", closeEditModal);
        document.getElementById("cancelEditTop").addEventListener("click", closeEditModal);
        document.getElementById("editModal").addEventListener("click", (event) => {
            if (event.target.id === "editModal") closeEditModal();
        });

        renderProducts();
        renderControlStructures();
        showLabMessage("Catalog manager loaded successfully.", "info");
    }

    // 4. Mobile menu toggle
    const mobileToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
        });
    }
});
