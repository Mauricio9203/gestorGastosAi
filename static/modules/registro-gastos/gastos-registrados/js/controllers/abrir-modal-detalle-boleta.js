import { loadTableDetalleBoleta } from "./load-table-detalle-boleta.js";

const abrirModalDetalleBoleta = () => {
  document.addEventListener("click", async function (event) {
    const button = event.target.closest(".changePass");
    if (button) {
      const id = button.getAttribute("data-id");
      if (id) {
        await loadTableDetalleBoleta(id);
      }
    }
  });
};

export { abrirModalDetalleBoleta };
