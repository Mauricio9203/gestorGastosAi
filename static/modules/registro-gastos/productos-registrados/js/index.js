import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { botonActualizacionMasivaDetalleBoleta, mostrarInputCorrespondiente, verificarHabilitarBoton } from "./components/eventos-display.js";
import { ejecutarSelect2 } from "./components/select2-config.js";
import { exportButtons } from "./components/table-settings.js";
import { validarFormularioActualizacionMasiva } from "./controllers/actualizacion-masiva.js";
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
  ejecutarSelect2();
  validarFormularioActualizacionMasiva();
});
