import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { agregarModulo, agregarSubModulo } from "./controllers/agregarModulo.js";
import { obtenerListaModulos, obtenerListaSubModulos } from "./services/obtenerSelect.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("DOMContentLoaded", function () {
  const linkId = "configuracionesLink"; // ID del enlace principal
  const subLinkId = "creacion-de-modulosLink"; // ID del subenlace
  const collapseId = "configuracionesLink"; // ID de la lista que se expande
  const arrow = "configuracionesArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);

  //funciones importadas
  agregarModulo();
  agregarSubModulo();
  obtenerListaModulos();
  obtenerListaSubModulos();
});
