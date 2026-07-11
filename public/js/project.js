const projects = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

projects.forEach((project) => observer.observe(project));

const navLinks = document.querySelectorAll(".custom-navbar .nav-link[href]");
const currentPath = window.location.pathname;

navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    link.classList.remove("active");

    if (
        linkPath === currentPath ||
        (currentPath === "/" && linkPath === "/")
    ) {
        link.classList.add("active");
    }
});