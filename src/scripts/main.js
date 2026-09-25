const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const toast = document.querySelector(".copy-toast");

if (navToggle && header) {
    navToggle.addEventListener("click", () => {
        const open = header.classList.toggle("is-open");
        navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close when clicking any nav link
    document.querySelectorAll(".site-nav a").forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("is-open");
            navToggle.setAttribute("aria-label", "Open menu");
        });
    });

    // Close when clicking outside header
    document.addEventListener("click", (e) => {
        if (!header.contains(e.target)) {
            header.classList.remove("is-open");
            navToggle.setAttribute("aria-label", "Open menu");
        }
    });
}

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 1800);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
        const value = button.getAttribute("data-copy");
        try {
            await navigator.clipboard.writeText(value);
            showToast("Email copied");
        } catch (error) {
            showToast("Couldn’t copy — tvishapatel0@gmail.com");
        }
    });
});
