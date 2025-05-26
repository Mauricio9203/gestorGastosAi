import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { loadTable } from "./controllers/load-table.js";
import { getIngredientesNuevos } from "./services/get-ingredientes-maestros.js";

window.addEventListener("DOMContentLoaded", function () {
  const linkId = "listado-de-ingredientesLink";
  const subLinkId = "insumos-y-costeoLink";
  const collapseId = "listado-de-ingredientes";
  const arrow = "listado-de-ingredientesArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);

  loadTable();
  getIngredientesNuevos();
});
