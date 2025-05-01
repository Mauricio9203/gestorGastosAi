import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("DOMContentLoaded", function () {
  const linkId = "moduloBaseLink"; // ID del enlace principal
  const subLinkId = "sub_modulo_baseLink"; // ID del subenlace
  const collapseId = "moduloBaseLink"; // ID de la lista que se expande
  const arrow = "moduloBaseArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
});
