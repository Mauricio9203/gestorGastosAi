const addCustomActiveClass = (linkId, subLinkId, collapseId, arrowDirection) => {
  // Verificar si los elementos existen antes de manipularlos
  const link = document.getElementById(linkId);
  const subLink = document.getElementById(subLinkId);
  const collapse = document.getElementById(collapseId);
  const arrow = document.getElementById(arrowDirection);

  // Solo agregar clases si los elementos existen

  if (link) {
    link.classList.add("custom-active");
  }
  if (subLink) {
    subLink.classList.add("custom-active-sub");
  }
  if (collapse && link.getAttribute("aria-expanded") !== "true") {
    link.setAttribute("aria-expanded", "true");
    collapse.classList.add("show");
  }
  if (arrow) {
    if (arrow.classList.contains("fa-angle-up")) {
      // Si está apuntando hacia arriba, lo giramos hacia abajo
      arrow.classList.remove("fa-angle-up");
      arrow.classList.add("fa-angle-down");
    } else {
      // Si no (está hacia abajo), lo giramos hacia arriba
      arrow.classList.remove("fa-angle-down");
      arrow.classList.add("fa-angle-up");
    }
  }
};

export { addCustomActiveClass };
