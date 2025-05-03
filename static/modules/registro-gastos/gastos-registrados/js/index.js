import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { abrirModalDetalleBoleta } from "./controllers/abrir-modal-detalle-boleta.js";
import { loadTableDetalleBoleta } from "./controllers/load-table-detalle-boleta.js";
import { loadTable } from "./controllers/load-table.js";
import { getDetalleBoleta } from "./services/get-detalle-boleta.js";
import { getGastos } from "./services/get-gastos.js";

window.addEventListener("DOMContentLoaded", async function () {
  const linkId = "registroGastosLink";
  const subLinkId = "gastos-registradosLink";
  const collapseId = "registroGastosLink";
  const arrow = "gastos-registradosArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
  getGastos();
  await loadTable(); // para que la siguiente función funcione, debe esperar a que cargue la tabla
  getDetalleBoleta();
  await loadTableDetalleBoleta();
  abrirModalDetalleBoleta();
});
