// ============================================================
// Utility — Dark / Light Theme Toggle with localStorage
// ============================================================

/**
 * Reads saved preference from localStorage and applies the correct class
 * to the <html> element. Called on every page load.
 */
const initTheme = () => {
    const saved = localStorage.getItem(THEME.STORAGE_KEY);

    if (saved === THEME.DARK || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add(THEME.DARK_CLASS);
    } else {
        document.documentElement.classList.remove(THEME.DARK_CLASS);
    }

    updateToggleIcon();
};

/**
 * Toggles between dark and light themes, persists to localStorage,
 * and updates the button icon.
 */
const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle(THEME.DARK_CLASS);
    localStorage.setItem(THEME.STORAGE_KEY, isDark ? THEME.DARK : THEME.LIGHT);
    updateToggleIcon();
};

/**
 * Swaps the sun / moon SVG inside every theme-toggle button on the page.
 */
const updateToggleIcon = () => {
    const isDark = document.documentElement.classList.contains(THEME.DARK_CLASS);
    const buttons = document.querySelectorAll(".theme-toggle-btn");

    const sunIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

    const moonIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;

    buttons.forEach((btn) => {
        btn.innerHTML = isDark ? sunIcon : moonIcon;
    });
};

/**
 * Wire the toggle button click events. Called after DOM is ready.
 */
const initThemeToggle = () => {
    const buttons = document.querySelectorAll(".theme-toggle-btn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
    });
};
