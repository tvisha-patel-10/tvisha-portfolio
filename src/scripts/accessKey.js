/**
 * Global Access Key Management
 * Preserves ?key=... across the portfolio, saves the key in localStorage,
 * and appends ?key=... to all internal links so shared URLs in Slack stay unlocked.
 */

export const STORAGE_KEY = "cs_unlocked_key";

/**
 * Get current access key from URL parameter or localStorage
 */
export function getAccessKey() {
    if (typeof window === "undefined") return null;

    try {
        const params = new URLSearchParams(window.location.search);
        const fromUrl =
            params.get("key") ||
            params.get("access") ||
            params.get("pass") ||
            params.get("password");

        if (fromUrl) {
            const trimmed = fromUrl.trim();
            localStorage.setItem(STORAGE_KEY, trimmed);
            sessionStorage.setItem("cs_unlocked_session", trimmed);
            return trimmed;
        }

        return (
            localStorage.getItem(STORAGE_KEY) ||
            sessionStorage.getItem("cs_unlocked_session") ||
            null
        );
    } catch (e) {
        return null;
    }
}

/**
 * Persist an access key and sync URL / links
 */
export function saveAccessKey(key) {
    if (typeof window === "undefined" || !key) return;
    try {
        const trimmed = key.trim();
        localStorage.setItem(STORAGE_KEY, trimmed);
        sessionStorage.setItem("cs_unlocked_session", trimmed);
        syncUrlAndLinks(trimmed);
    } catch (e) {
        // localStorage might be unavailable in restricted environments
    }
}

/**
 * Ensure address bar has ?key=... and update all internal links on the page
 */
export function syncUrlAndLinks(key) {
    if (typeof window === "undefined" || !key) return;

    try {
        // 1. Keep ?key=... in the browser address bar
        const currentUrl = new URL(window.location.href);
        if (currentUrl.searchParams.get("key") !== key) {
            currentUrl.searchParams.set("key", key);
            window.history.replaceState({}, "", currentUrl.toString());
        }

        // 2. Attach ?key=... to internal links across the page
        const links = document.querySelectorAll("a[href]");
        links.forEach((a) => {
            const rawHref = a.getAttribute("href");
            if (
                !rawHref ||
                rawHref.startsWith("#") ||
                rawHref.startsWith("mailto:") ||
                rawHref.startsWith("tel:") ||
                rawHref.startsWith("javascript:")
            ) {
                return;
            }

            try {
                const targetUrl = new URL(rawHref, window.location.origin);
                // Only modify links that stay on this same domain
                if (targetUrl.origin === window.location.origin) {
                    if (targetUrl.searchParams.get("key") !== key) {
                        targetUrl.searchParams.set("key", key);
                        const newHref =
                            targetUrl.pathname +
                            targetUrl.search +
                            targetUrl.hash;
                        a.setAttribute("href", newHref);
                    }
                }
            } catch (err) {
                // Ignore malformed URLs
            }
        });
    } catch (e) {
        // Fallback gracefully
    }
}

/**
 * Initializes global key sync on DOM ready and listens for DOM updates
 */
export function initGlobalAccessKey() {
    if (typeof window === "undefined") return;

    function run() {
        const key = getAccessKey();
        if (key) {
            syncUrlAndLinks(key);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
}
