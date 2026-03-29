// ============================================================
// Home Page — Marketplace Overview + Control Structures
// ============================================================

let marketplaceName = "Gooomly";
let featuredCreatorName = "Ahmed Raza";
let mainCategory = "Digital Design";
let totalCreators = 1250;
let itemsForSale = 4800;
let averageRating = 4.7;
let isMarketplaceOpen = true;
let topCategories = ["Graphic Design", "Web Development", "Video Editing", "3D Modeling", "Photography"];
let creatorProfile = {
    name: "Ahmad Raza Hassan",
    specialty: "UI/UX Design, AI Assisted Web Developer.",
    rating: 4.9,
    isOnline: true,
    itemsSold: 320,
};

// ── DOM population ─────────────────────────────────────

const populateDOM = () => {
    const el = (id) => document.getElementById(id);

    if (el("totalCreators")) el("totalCreators").textContent = totalCreators.toLocaleString();
    if (el("itemsForSale")) el("itemsForSale").textContent = itemsForSale.toLocaleString();
    if (el("averageRating")) el("averageRating").textContent = averageRating;

    if (el("isOpen")) {
        el("isOpen").innerHTML = isMarketplaceOpen
            ? '<span class="text-green-600 font-semibold">Open Now</span>'
            : '<span class="text-red-600 font-semibold">Closed</span>';
    }

    if (el("topCategories")) {
        el("topCategories").innerHTML = topCategories
            .map((cat) => `<li class="py-1 px-3 rounded-full text-sm font-medium" style="background-color:#effecf;color:#3f4f1c;border:1px solid #d6ee9a;">${cat}</li>`)
            .join("");
    }

    if (el("featuredCreatorCard")) {
        el("featuredCreatorCard").innerHTML = `
            <p class="text-lg font-semibold text-gray-900 dark:text-white">${creatorProfile.name}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Specialty: ${creatorProfile.specialty}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Rating: ${creatorProfile.rating} / 5</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Items Sold: ${creatorProfile.itemsSold}</p>
            <p class="text-sm mt-1">${
                creatorProfile.isOnline
                    ? '<span class="text-green-600 font-medium">● Online</span>'
                    : '<span class="text-gray-400 font-medium">○ Offline</span>'
            }</p>
        `;
    }
};

// ── Summary (arrow function) ───────────────────────────

const showMarketplaceSummary = () => {
    const summaryEl = document.getElementById("summaryOutput");
    const messageEl = document.getElementById("systemMessage");

    if (summaryEl) {
        const statusText = isMarketplaceOpen ? "currently open" : "currently closed";
        const categoryList = topCategories.join(", ");

        summaryEl.innerHTML = `
            <div class="p-5 rounded-lg border" style="background: linear-gradient(135deg, #effecf 0%, #f8fafc 100%); border-color:#d6ee9a;">
                <h3 class="text-xl font-bold mb-3" style="color:#3f4f1c;">Marketplace Summary</h3>
                <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Name:</strong> ${marketplaceName}</li>
                    <li><strong>Status:</strong> <span class="${isMarketplaceOpen ? "text-green-600" : "text-red-600"} font-semibold">${statusText}</span></li>
                    <li><strong>Total Creators:</strong> ${totalCreators.toLocaleString()}</li>
                    <li><strong>Items for Sale:</strong> ${itemsForSale.toLocaleString()}</li>
                    <li><strong>Average Rating:</strong> ${averageRating} / 5</li>
                    <li><strong>Top Categories:</strong> ${categoryList}</li>
                    <li><strong>Featured Creator:</strong> ${creatorProfile.name} (${creatorProfile.specialty})</li>
                </ul>
            </div>
        `;
    }

    if (messageEl) {
        const timeString = new Date().toLocaleTimeString();
        messageEl.innerHTML = `
            <div class="p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
                Summary generated successfully at <strong>${timeString}</strong>
            </div>
        `;
    }
};

// ── Toggle marketplace status ──────────────────────────

const toggleMarketplaceStatus = () => {
    isMarketplaceOpen = !isMarketplaceOpen;

    const statusEl = document.getElementById("isOpen");
    if (statusEl) {
        statusEl.innerHTML = isMarketplaceOpen
            ? '<span class="text-green-600 font-semibold">Open Now</span>'
            : '<span class="text-red-600 font-semibold">Closed</span>';
    }

    const messageEl = document.getElementById("systemMessage");
    if (messageEl) {
        const state = isMarketplaceOpen ? "opened" : "closed";
        messageEl.innerHTML = `
            <div class="p-3 text-sm ${
                isMarketplaceOpen
                    ? "text-blue-800 bg-blue-50 border-blue-200 dark:text-blue-400 dark:border-blue-800"
                    : "text-red-800 bg-red-50 border-red-200 dark:text-red-400 dark:border-red-800"
            } border rounded-lg dark:bg-gray-800">
                Marketplace has been <strong>${state}</strong> at ${new Date().toLocaleTimeString()}
            </div>
        `;
    }
};

// ── Control Structure Renderers ────────────────────────

const renderIfElseOutput = () => {
    const output = document.getElementById("ifElseOutput");
    if (!output) return;

    // Object methods report replaces simple if/else output
    output.innerHTML = getObjectMethodsReport();
};

const renderForLoopOutput = () => {
    const cards = document.getElementById("forLoopCards");
    const list = document.getElementById("forLoopList");
    const tableBody = document.getElementById("forLoopTableBody");
    if (!cards || !list || !tableBody) return;

    let cardsHtml = "";
    let listHtml = "";
    let tableHtml = "";

    for (let i = 0; i < products.length; i += 1) {
        const item = products[i];
        const initial = getInitial(item.title);
        const stars = renderStars(item.rating);

        cardsHtml += `<div class="p-3 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <div class="flex items-center gap-2 mb-1">
                <span class="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold" style="background-color:#cafc4f;color:#111827;">${initial}</span>
                <p class="font-semibold text-gray-900 dark:text-white text-sm">${truncateTitle(item.title, 22)}</p>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-300">${formatCategoryTag(item.category)} — $${item.price}</p>
            <p class="text-xs text-yellow-500">${stars}</p>
        </div>`;

        listHtml += `<li>${item.title} (${item.category}) — $${item.price} — ${stars}</li>`;

        tableHtml += `<tr class="border-b dark:border-gray-700">
            <td class="px-4 py-2">${item.title}</td>
            <td class="px-4 py-2">${item.category}</td>
            <td class="px-4 py-2">$${item.price}</td>
        </tr>`;
    }

    cards.innerHTML = cardsHtml;
    list.innerHTML = listHtml;
    tableBody.innerHTML = tableHtml;
};

const renderWhileLoopOutput = () => {
    const output = document.getElementById("whileLoopOutput");
    if (!output) return;
    let i = 0;
    let html = "";
    while (i < products.length && i < 5) {
        const item = products[i];
        html += `<li>Record ${i + 1}: ${item.title} processed with ${item.downloads.toLocaleString()} downloads.</li>`;
        i += 1;
    }
    output.innerHTML = html;
};

const renderCombinedOutput = () => {
    const combined = document.getElementById("combinedOutput");
    if (!combined) return;

    const stats = getCatalogStats();
    const allRated4 = allProductsAboveRating(4);
    const has3D = hasProductInCategory("3D Asset");

    combined.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <p class="text-xs text-gray-500 dark:text-gray-400">Catalog Size</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${stats.productCount}</p>
            </div>
            <div class="p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <p class="text-xs text-gray-500 dark:text-gray-400">Avg Price</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">$${stats.avgPrice}</p>
            </div>
            <div class="p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <p class="text-xs text-gray-500 dark:text-gray-400">Avg Rating</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${stats.avgRating}</p>
            </div>
            <div class="p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <p class="text-xs text-gray-500 dark:text-gray-400">Est. Revenue</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">$${stats.totalRevenue.toLocaleString()}</p>
            </div>
        </div>
        <ul class="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>every() — All products rated ≥ 4.0: <strong>${allRated4 ? "Yes ✓" : "No ✗"}</strong></li>
            <li>some() — Has 3D Assets: <strong>${has3D ? "Yes ✓" : "No ✗"}</strong></li>
        </ul>
    `;
};

const renderControlStructures = () => {
    renderIfElseOutput();
    renderForLoopOutput();
    renderWhileLoopOutput();
    renderCombinedOutput();
};
