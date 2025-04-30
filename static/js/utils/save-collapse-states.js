const saveCollapseStates = () => {
  // 1) sólo los que controlan collapse
  document.querySelectorAll('.nav-link[data-toggle="collapse"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const clicked = e.currentTarget;
      // 2) el id de la flecha buscamos <i class="float-right">
      const arrowEl = clicked.querySelector("i.float-right");
      const arrowId = arrowEl ? arrowEl.id : null;

      // 3) collapseId = lo que viene en el href (#algo)
      const collapseId = clicked.getAttribute("href")?.replace("#", "");
      const collapseEl = document.getElementById(collapseId);
      if (!collapseEl) return; // sin collapse, salimos

      const isExpanded = clicked.getAttribute("aria-expanded") === "true";

      let open = JSON.parse(localStorage.getItem("openCollapses")) || [];
      let arrows = JSON.parse(localStorage.getItem("id_arrows")) || [];

      if (isExpanded) {
        open = open.filter((id) => id !== collapseId);
        arrows = arrowId ? arrows.filter((id) => id !== arrowId) : arrows;
      } else {
        if (!open.includes(collapseId)) open.push(collapseId);
        if (arrowId && !arrows.includes(arrowId)) arrows.push(arrowId);
      }

      localStorage.setItem("openCollapses", JSON.stringify(open));
      localStorage.setItem("id_arrows", JSON.stringify(arrows));
    });
  });
};

const restoreCollapseStates = () => {
  const open = JSON.parse(localStorage.getItem("openCollapses")) || [];
  const arrows = JSON.parse(localStorage.getItem("id_arrows")) || [];

  // reabrir colapsables
  open.forEach((id) => {
    const col = document.getElementById(id);
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (col) col.classList.add("show");
    if (link) link.setAttribute("aria-expanded", "true");
  });

  // girar flechas
  arrows.forEach((arrowId) => {
    const arrow = document.getElementById(arrowId);
    if (!arrow) return;
    arrow.classList.replace("fa-angle-down", "fa-angle-up");
  });
};

export { saveCollapseStates, restoreCollapseStates };
