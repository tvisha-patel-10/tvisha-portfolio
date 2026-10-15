const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

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

document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
        const value = button.getAttribute("data-copy");
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
        } catch (error) {
            // Fallback for older browsers
            const ta = document.createElement("textarea");
            ta.value = value;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
    });
});
