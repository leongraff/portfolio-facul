const routes = {
    "/sobre": "pages/sobre.html",
    "/formacao": "pages/formacao.html",
    "/portfolio": "pages/portfolio.html",
    "/contato": "pages/contato.html",
};

async function loadPage() {
    let path = location.hash.slice(1);

    if (!path || path === "/") {
        location.hash = "#/sobre";
        return;
    }

    const page = routes[path];

    if (!page) {
        document.getElementById("render-div").innerHTML = "<h1>404 - Página não encontrada</h1>";
        return;
    }
    try {
        document.getElementById("main-nav").classList.remove("active");
        const res = await fetch(page);
        const html = await res.text();
        document.getElementById("render-div").innerHTML = html;
        updateActiveLink();
    } catch (err) {
        document.getElementById("render-div").innerHTML = "<h1>Erro ao carregar a página.</h1>";
    }
}

window.addEventListener("hashchange", loadPage);
window.addEventListener("load", loadPage);

function updateActiveLink() {
    const currentPath = location.hash;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}
