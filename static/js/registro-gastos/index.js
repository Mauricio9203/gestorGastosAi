import { addCustomActiveClass } from "../utils/sidebarConfig.js";
import { uploadedFile } from "./components/uploaded-file.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("DOMContentLoaded", function () {
  const linkId = "registroGastosLink"; // ID del enlace principal
  const subLinkId = "escanearBoletaLink"; // ID del subenlace
  const collapseId = "registroGastos"; // ID de la lista que se expande
  const arrow = "registroGastosArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
  uploadedFile();
});
