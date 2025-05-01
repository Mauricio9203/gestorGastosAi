// sidebarCollapseLogic.js

const arrowSidebar = () => {
  // Escuchar solo a enlaces que controlan collapse y tienen id
  document.querySelectorAll('.nav-link[data-toggle="collapse"][id]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const clickedId = event.currentTarget.id;
      if (!clickedId) return; // sin id, salimos

      // Construir el id de la flecha
      const arrowId = getArrowId(clickedId);
      const arrowEl = document.getElementById(arrowId);
      if (!arrowEl) {
        console.error(`Arrow element not found: #${arrowId}`);
        return;
      }

      // Alternar la dirección de la flecha
      arrowDirection(arrowEl);
    });
  });
};

const arrowDirection = (arrow) => {
  // Garantizar que arrow existe y es un elemento con classList
  if (!arrow || !arrow.classList) return;
  if (arrow.classList.contains("fa-angle-down")) {
    arrow.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    arrow.classList.replace("fa-angle-up", "fa-angle-down");
  }
};

const getArrowId = (linkId) => {
  // Remover sufijo "Link" o últimos 4 caracteres
  return linkId.length > 4 ? `${linkId.slice(0, -4)}Arrow` : `${linkId}Arrow`;
};

export { arrowSidebar };
