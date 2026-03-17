let marketplaceName = "Gooomly";
let featuredCreatorName = "Ahmed Raza";
let mainCategory = "Digital Design";
let totalCreators = 1250;
let itemsForSale = 4800;
let averageRating = 4.7;
let isMarketplaceOpen = true;
let topCategories = ["Graphic Design", "Web Development", "Video Editing", "3D Modeling", "Photography"];
let creatorProfile = {
    name: "Ahmad Raza hassan",
    specialty: "UI/UX Design, AI assisted Web Developer.",
    rating: 4.9,
    isOnline: true,
    itemsSold: 320
};


// ============================================================
// DOM Population (Step 2) - Display variables on the page
// ============================================================

const populateDOM = () => {
    const el = (id) => document.getElementById(id);

    if (el("marketplaceName")) {
        el("marketplaceName").textContent = marketplaceName;
    }

    if (el("totalCreators")) {
        el("totalCreators").textContent = totalCreators.toLocaleString();
    }

    if (el("itemsForSale")) {
        el("itemsForSale").textContent = itemsForSale.toLocaleString();
    }

    if (el("averageRating")) {
        el("averageRating").textContent = averageRating;
    }

    if (el("isOpen")) {
        el("isOpen").innerHTML = isMarketplaceOpen
            ? '<span class="text-green-600 font-semibold">Open Now</span>'
            : '<span class="text-red-600 font-semibold">Closed</span>';
    }

    if (el("topCategories")) {
        el("topCategories").innerHTML = topCategories
            .map(cat => `<li class="py-1 px-3 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">${cat}</li>`)
            .join("");
    }

    if (el("featuredCreatorCard")) {
        el("featuredCreatorCard").innerHTML = `
            <p class="text-lg font-semibold text-gray-900 dark:text-white">${creatorProfile.name}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Specialty: ${creatorProfile.specialty}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Rating: ${creatorProfile.rating} / 5</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Items Sold: ${creatorProfile.itemsSold}</p>
            <p class="text-sm mt-1">${creatorProfile.isOnline
                ? '<span class="text-green-600 font-medium">● Online</span>'
                : '<span class="text-gray-400 font-medium">○ Offline</span>'
            }</p>
        `;
    }


    if (el("aboutMarketplaceName")) {
        el("aboutMarketplaceName").textContent = marketplaceName;
    }
};



const showMarketplaceSummary = () => {
    const summaryEl = document.getElementById("summaryOutput");
    const messageEl = document.getElementById("systemMessage");

    if (summaryEl) {
        const statusText = isMarketplaceOpen ? "currently open" : "currently closed";
        const categoryList = topCategories.join(", ");

        summaryEl.innerHTML = `
            <div class="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg dark:from-gray-700 dark:to-gray-800 dark:border-gray-600">
                <h3 class="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">Marketplace Summary</h3>
                <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Name:</strong> ${marketplaceName}</li>
                    <li><strong>Status:</strong> <span class="${isMarketplaceOpen ? 'text-green-600' : 'text-red-600'} font-semibold">${statusText}</span></li>
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
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        messageEl.innerHTML = `
            <div class="p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
                Summary generated successfully at <strong>${timeString}</strong>
            </div>
        `;
    }
};


// ============================================================
// Toggle Marketplace Status (Step 5 - Dynamic update)
// ============================================================

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
            <div class="p-3 text-sm ${isMarketplaceOpen ? 'text-blue-800 bg-blue-50 border-blue-200 dark:text-blue-400 dark:border-blue-800' : 'text-red-800 bg-red-50 border-red-200 dark:text-red-400 dark:border-red-800'} border rounded-lg dark:bg-gray-800">
                Marketplace has been <strong>${state}</strong> at ${new Date().toLocaleTimeString()}
            </div>
        `;
    }
};


// ============================================================
// Click Event Wiring (Step 4) - Runs after DOM is ready
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    populateDOM();

    const btnSummary = document.getElementById("btnShowSummary");
    if (btnSummary) {
        btnSummary.addEventListener("click", showMarketplaceSummary);
    }

    const btnToggle = document.getElementById("btnToggleStatus");
    if (btnToggle) {
        btnToggle.addEventListener("click", toggleMarketplaceStatus);
    }
});
