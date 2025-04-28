import { addCustomActiveClass } from "../utils/sidebarConfig.js";
import { clearForms } from "./utils/clear-forms.js";
import { validateForm } from "./controllers/validate-form-add-user.js";
import { loadTable } from "./controllers/load-table.js";
import { selectRoles } from "./controllers/select-roles.js";
import { exportButtons } from "./components/table-settings.js";
import { deleteSelections } from "./components/delete-selections.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("load", function () {
  const linkId = "configuracionesLink";
  const subLinkId = "table_tabulator";
  const collapseId = "configuraciones";
  const arrow = "configuracionesArrow";
  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);

  //eventos de la tabla
  loadTable();
  exportButtons();
  deleteSelections();
  selectRoles();
  clearForms();
  validateForm();
});
