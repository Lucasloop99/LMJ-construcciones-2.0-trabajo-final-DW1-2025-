/*(function () {
  "use strict";

  // Íconos SVG por ítem
  const ICONS = {
    inicio: `<svg class="menu-icon" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
    proyectos: `<svg class="menu-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>`,
    servicios: `<svg class="menu-icon" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>`,
    presupuesto: `<svg class="menu-icon" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><circle cx="17" cy="11" r="3"/><path d="M1 21v-2a7 7 0 0114 0v2"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>`,
    contacto: `<svg class="menu-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  };

  // Ítems del menú
  const ITEMS = [
    { label: "Inicio", icon: ICONS.inicio, href: "index.html" },
    { label: "Proyectos", icon: ICONS.proyectos, href: "proyectos.html" },
    { label: "Servicios", icon: ICONS.servicios, href: "servicios.html" },
    {
      label: "Presupuesto Online",
      icon: ICONS.presupuesto,
      href: "cotizacion.html",
    },
    { label: "Contacto", icon: ICONS.contacto, href: "contacto.html" },
  ];

  // Marcar ítem activo según página actual
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  ITEMS.forEach(function (item) {
    item.active =
      currentPage === item.href ||
      (currentPage === "" && item.href === "index.html");
  });

  // ── Construir panel y overlay
  function buildPanel() {
    // Overlay
    const overlay = document.createElement("div");
    overlay.className = "mobile-menu-overlay";

    // Panel
    const menu = document.createElement("div");
    menu.className = "mobile-menu";
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-modal", "true");
    menu.setAttribute("aria-label", "Menú de navegación");

    // Header
    menu.innerHTML = `
        <div class="mobile-menu-header">
          <img src="logo.png" alt="LMJ Construcciones">
          <button class="mobile-menu-close" aria-label="Cerrar menú">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Menu
          </button>
        </div>
        <div class="mobile-menu-body">
          <ul class="mobile-menu-list">
            ${ITEMS.map(function (item) {
              return `<li>
                <a href="${item.href}"${item.active ? ' class="active"' : ""}>
                  <span>${item.label}</span>
                  ${item.icon}
                </a>
              </li>`;
            }).join("")}
          </ul>
        </div>
      `;

    document.body.appendChild(overlay);
    document.body.appendChild(menu);

    return { menu, overlay };
  }

  // ── Modificar el toggler existente de Bootstrap
  function hijackToggler(toggler) {
    // Eliminar los atributos de Bootstrap para que no abra el colapso
    toggler.removeAttribute("data-bs-toggle");
    toggler.removeAttribute("data-bs-target");

    // Inyectar ícono burger custom y etiqueta "Menu"
    toggler.innerHTML = `
        <div class="burger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="burger-label">Menu</span>
      `;

    toggler.setAttribute("aria-expanded", "false");
    toggler.setAttribute("aria-label", "Abrir menú");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".navbar-toggler");
    if (!toggler) return;

    hijackToggler(toggler);

    const { menu, overlay } = buildPanel();
    const closeBtn = menu.querySelector(".mobile-menu-close");

    function openMenu() {
      menu.classList.add("open");
      overlay.classList.add("open");
      toggler.classList.add("open");
      toggler.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      menu.classList.remove("open");
      overlay.classList.remove("open");
      toggler.classList.remove("open");
      toggler.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggler.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });
  });
})();*/
