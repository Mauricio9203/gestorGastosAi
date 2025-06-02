import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { botonActualizacionMasivaDetalleBoleta, mostrarInputCorrespondiente } from "./components/eventos-display.js";
import { exportButtons } from "./components/table-settings.js";
import { loadTable } from "./controllers/load-table.js";
import { getCoincidenciasIngredientes } from "./services/get-coincidencias-ingredientes.js";

window.addEventListener("DOMContentLoaded", function () {
  const linkId = "productos-registradosLink";
  const subLinkId = "registro-gastosLink";
  const collapseId = "productos-registrados";
  const arrow = "productos-registradosArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);

  loadTable();
  exportButtons();
  getCoincidenciasIngredientes();
  mostrarInputCorrespondiente();
  botonActualizacionMasivaDetalleBoleta();

  $("#input-select").select2({
    dropdownParent: $("#modal-actualizacion-masiva"),
    placeholder: "Selecciona un valor",
    allowClear: true,
    width: "100%",
  });
});
