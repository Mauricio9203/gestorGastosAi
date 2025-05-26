import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { exportButtons } from "./components/table-settings.js";
import { loadTable } from "./controllers/load-table.js";
import { getIngredientesMaestrosDetalleBoleta } from "./services/get-productos-cargados.js";

window.addEventListener("DOMContentLoaded", function () {
  const linkId = "productos-registradosLink";
  const subLinkId = "registro-gastosLink";
  const collapseId = "productos-registrados";
  const arrow = "productos-registradosArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);

  loadTable();
  exportButtons();
});
