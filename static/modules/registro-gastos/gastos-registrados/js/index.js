import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";

import { cambioPestana } from "./components/cambio-pestanas-detalle-boleta.js";
import { deleteSelectionsDetalleBoleta } from "./components/delete-selections-detalle-boleta.js";
import { deleteSelections } from "./components/delete-selections.js";
import { exportButtonsDetalleBoleta } from "./components/table-settings-detalle-boleta.js";
import { exportButtonsBoleta } from "./components/table-settings.js";
import { abrirModalDetalleBoleta } from "./controllers/abrir-modal-detalle-boleta.js";
import { cargarItemBoleta } from "./controllers/cargar-item-boleta.js";
import { loadTable } from "./controllers/load-table.js";
//import { makeWheelListenersPassive } from "./controllers/parche-data-table.js";

window.addEventListener("DOMContentLoaded", async function () {
  const linkId = "registroGastosLink";
  const subLinkId = "gastos-registradosLink";
  const collapseId = "registroGastosLink";
  const arrow = "gastos-registradosArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
  //getGastos();
  await loadTable(); // para que la siguiente función funcione, debe esperar a que cargue la tabla
  abrirModalDetalleBoleta();
  exportButtonsDetalleBoleta();
  exportButtonsBoleta();
  //makeWheelListenersPassive();
  cambioPestana();
  deleteSelections();
  deleteSelectionsDetalleBoleta();

  cargarItemBoleta();
});
