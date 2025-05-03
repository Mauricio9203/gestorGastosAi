import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("DOMContentLoaded", function () {
  const linkId = "ventasLink"; // ID del enlace principal
  const subLinkId = "estadisticasLink"; // ID del subenlace
  const collapseId = "ventas"; // ID de la lista que se expande
  const arrow = "ventasArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
});
