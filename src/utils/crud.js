// ============================================================
// Utility — CRUD Operations + Object Methods
// ============================================================

let editingProductId = null;

// ── Object.freeze() — immutable status labels ──────────
const STATUS_LABELS = Object.freeze({
    published: "Published",
    draft: "Draft",
    archived: "Archived",
});

// ── Object.freeze() — immutable status CSS map ─────────
const STATUS_STYLES = Object.freeze({
    published: "text-green-600",
    draft: "text-yellow-600",
    archived: "text-gray-500",
});

// ────────────────────────────────────────────────────────
// Create
// ────────────────────────────────────────────────────────

const createProduct = (formData) => {
    // Object.assign() — merge default template with form values
    const newProduct = Object.assign({}, DEFAULT_PRODUCT_TEMPLATE, {
        id: Date.now(),
        title: sanitizeFormValue(formData.title),
        category: sanitizeFormValue(formData.category),
        price: Number(formData.price),
        rating: Number(formData.rating),
        downloads: Number(formData.downloads),
        status: formData.status,
        createdAt: new Date().toISOString().slice(0, 10),
    });

    // Array.push()
    products.push(newProduct);
    return newProduct;
};

// ────────────────────────────────────────────────────────
// Read — render product cards in the grid
// ────────────────────────────────────────────────────────

const renderProducts = () => {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const visibleProducts = getFilteredProducts();

    if (!visibleProducts.length) {
        grid.innerHTML = `<div class="col-span-full p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p class="text-gray-500 dark:text-gray-400">No products matched your filters.</p>
        </div>`;
        return;
    }

    // Array.map() — project each product into a card HTML string
    grid.innerHTML = visibleProducts
        .map((product) => {
            // String methods in action: getInitial, truncateTitle, formatCategoryTag, renderStars
            const initial = getInitial(product.title);
            const displayTitle = truncateTitle(product.title, 30);
            const categoryTag = formatCategoryTag(product.category);
            const stars = renderStars(product.rating);
            const statusLabel = STATUS_LABELS[product.status] || product.status;
            const statusStyle = STATUS_STYLES[product.status] || "";

            // Object.keys() — dynamically list product property names
            const propCount = Object.keys(product).length;

            // Object.entries() — for hover tooltip
            const tooltipPairs = Object.entries(product)
                .map(([key, val]) => `${key}: ${val}`)
                .join(" | ");

            return `<div class="bg-white border border-gray-200 rounded-lg shadow p-5 dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-lg" title="${tooltipPairs}">
                <div class="flex items-center gap-3 mb-3">
                    <span class="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold" style="background-color:#cafc4f;color:#111827;">${initial}</span>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">${displayTitle}</h4>
                        <span class="inline-block px-2 py-0.5 text-xs font-semibold rounded-full" style="background-color:#effecf;color:#3f4f1c;border:1px solid #d6ee9a;">${categoryTag}</span>
                    </div>
                </div>
                <div class="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                    <p>Price: <strong class="text-gray-900 dark:text-white">$${product.price}</strong></p>
                    <p>Rating: <span class="text-yellow-500">${stars}</span> (${product.rating})</p>
                    <p>Downloads: ${product.downloads.toLocaleString()}</p>
                    <p>Added: ${product.createdAt}</p>
                    <p class="${statusStyle} font-medium">Status: ${statusLabel}</p>
                    <p class="text-xs text-gray-400">Properties: ${propCount} fields</p>
                </div>
                <div class="flex gap-2 mt-4">
                    <button data-edit-id="${product.id}" class="edit-btn rounded-lg text-sm px-4 py-2" style="background-color:#cafc4f;color:#111827;border:1px solid #b7e642;">Edit</button>
                    <button data-delete-id="${product.id}" class="delete-btn text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-4 py-2">Delete</button>
                </div>
            </div>`;
        })
        .join("");

    bindProductCardActions();
};

// ────────────────────────────────────────────────────────
// Update
// ────────────────────────────────────────────────────────

const updateProduct = (id, formData) => {
    // Array.map() + Object.assign() — immutable update pattern
    products = products.map((item) =>
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
    );
};

// ────────────────────────────────────────────────────────
// Delete
// ────────────────────────────────────────────────────────

const deleteProduct = (id) => {
    // Array.filter() — remove by id
    products = products.filter((item) => item.id !== id);
};

// ────────────────────────────────────────────────────────
// Object Methods Showcase (displayed in Catalog Health)
// ────────────────────────────────────────────────────────

const getObjectMethodsReport = () => {
    if (!products.length) return "<li>No products to analyze.</li>";

    const sample = products[0];
    const lines = [];

    // Object.keys()
    const keys = Object.keys(sample);
    lines.push(`<li><strong>Object.keys():</strong> [${keys.join(", ")}]</li>`);

    // Object.values()
    const values = Object.values(sample);
    lines.push(`<li><strong>Object.values():</strong> [${values.map((v) => typeof v === "string" ? `"${truncateTitle(String(v), 15)}"` : v).join(", ")}]</li>`);

    // Object.entries() count
    const entries = Object.entries(sample);
    lines.push(`<li><strong>Object.entries():</strong> ${entries.length} key-value pairs</li>`);

    // Object.assign() demo
    const clone = Object.assign({}, sample, { status: "cloned" });
    lines.push(`<li><strong>Object.assign():</strong> Cloned "${truncateTitle(sample.title, 20)}" → status set to "${clone.status}"</li>`);

    // Object.freeze() proof
    lines.push(`<li><strong>Object.freeze():</strong> DEFAULT_PRODUCT_TEMPLATE is frozen (${Object.isFrozen(DEFAULT_PRODUCT_TEMPLATE) ? "✓ immutable" : "✗ mutable"})</li>`);
    lines.push(`<li><strong>Object.freeze():</strong> STATUS_LABELS is frozen (${Object.isFrozen(STATUS_LABELS) ? "✓ immutable" : "✗ mutable"})</li>`);

    return lines.join("");
};

// ────────────────────────────────────────────────────────
// DOM Event Binders
// ────────────────────────────────────────────────────────

const bindProductCardActions = () => {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number(btn.getAttribute("data-delete-id"));
            deleteProduct(id);
            renderProducts();
            renderControlStructures();
            showLabMessage("Product deleted from catalog using filter().", "danger");
        });
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number(btn.getAttribute("data-edit-id"));
            openEditModal(id);
        });
    });
};

const openEditModal = (id) => {
    const product = findProductById(id);
    if (!product) return;
    editingProductId = id;

    document.getElementById("editTitle").value = product.title;
    document.getElementById("editCategory").value = product.category;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editRating").value = product.rating;
    document.getElementById("editDownloads").value = product.downloads;
    document.getElementById("editStatus").value = product.status;

    const modal = document.getElementById("editModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
};

const closeEditModal = () => {
    const modal = document.getElementById("editModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    editingProductId = null;
};

const showLabMessage = (text, type = "info") => {
    const message = document.getElementById("labMessage");
    if (!message) return;
    const styleMap = {
        success: "text-green-800 bg-green-50 border-green-200 dark:text-green-400 dark:border-green-800",
        danger: "text-red-800 bg-red-50 border-red-200 dark:text-red-400 dark:border-red-800",
        info: "text-gray-800 border",
    };
    const base = styleMap[type] || styleMap.info;
    const infoStyle = type === "info" ? 'style="background-color:#effecf;border-color:#d6ee9a;color:#3f4f1c;"' : "";
    message.innerHTML = `<div class="p-3 text-sm border rounded-lg dark:bg-gray-800 ${base}" ${infoStyle}>${text}</div>`;
};

const handleProductAdd = (event) => {
    event.preventDefault();

    const formData = {
        title: document.getElementById("titleInput").value,
        category: document.getElementById("categoryInput").value,
        price: document.getElementById("priceInput").value,
        rating: document.getElementById("ratingInput").value,
        downloads: document.getElementById("downloadsInput").value,
        status: document.getElementById("statusInput").value,
    };

    // Validation — startsWith, endsWith used from stringHelpers
    if (!titleStartsWithLetter(cleanInput(formData.title))) {
        showLabMessage("Title must start with a letter.", "danger");
        return;
    }

    createProduct(formData);
    event.target.reset();
    renderProducts();
    renderControlStructures();
    showLabMessage("New product created in catalog using push() + Object.assign().", "success");
};

const handleProductUpdate = (event) => {
    event.preventDefault();
    if (!editingProductId) return;

    const formData = {
        title: document.getElementById("editTitle").value,
        category: document.getElementById("editCategory").value,
        price: document.getElementById("editPrice").value,
        rating: document.getElementById("editRating").value,
        downloads: document.getElementById("editDownloads").value,
        status: document.getElementById("editStatus").value,
    };

    updateProduct(editingProductId, formData);
    closeEditModal();
    renderProducts();
    renderControlStructures();
    showLabMessage("Product updated via Object.assign() merge and UI re-rendered.", "success");
};
