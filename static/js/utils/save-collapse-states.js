const saveCollapseStates = () => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const clickedElement = e.currentTarget;
      const isExpanded = clickedElement.getAttribute("aria-expanded") === "true";

      // Obtener el ID del collapse asociado, por ejemplo desde href="#configuraciones"
      const collapseId = clickedElement.getAttribute("href")?.replace("#", "");
      const collapseElement = document.getElementById(collapseId);
      if (!collapseElement) return;

      let openCollapses = JSON.parse(localStorage.getItem("openCollapses")) || [];

      if (isExpanded) {
        // Eliminar de localStorage
        openCollapses = openCollapses.filter((id) => id.trim() !== collapseId.trim());
      } else {
        // Agregar al localStorage
        if (!openCollapses.includes(collapseId)) {
          openCollapses.push(collapseId);
        }
      }

      localStorage.setItem("openCollapses", JSON.stringify(openCollapses));
    });
  });
};

const restoreCollapseStates = () => {
  const openCollapses = JSON.parse(localStorage.getItem("openCollapses")) || [];

  openCollapses.forEach((collapseId) => {
    const collapseElement = document.getElementById(collapseId);
    const triggerLink = document.querySelector(`.nav-link[href="#${collapseId}"]`);

    if (collapseElement) {
      collapseElement.classList.add("show");
    }

    if (triggerLink) {
      triggerLink.setAttribute("aria-expanded", "true");
    }
  });
};

export { saveCollapseStates, restoreCollapseStates };
