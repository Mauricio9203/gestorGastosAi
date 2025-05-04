import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { exportButtonsDetalleBoleta } from "./components/table-settings-detalle-boleta.js";
import { exportButtonsBoleta } from "./components/table-settings.js";
import { abrirModalDetalleBoleta } from "./controllers/abrir-modal-detalle-boleta.js";
import { filtroSearchBoleta } from "./controllers/filtros.js";
import { loadTable } from "./controllers/load-table.js";
import { getGastos } from "./services/get-gastos.js";

window.addEventListener("DOMContentLoaded", async function () {
  const linkId = "registroGastosLink";
  const subLinkId = "gastos-registradosLink";
  const collapseId = "registroGastosLink";
  const arrow = "gastos-registradosArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
  getGastos();
  await loadTable(); // para que la siguiente función funcione, debe esperar a que cargue la tabla
  abrirModalDetalleBoleta();
  exportButtonsDetalleBoleta();
  exportButtonsBoleta();
  filtroSearchBoleta();
});
