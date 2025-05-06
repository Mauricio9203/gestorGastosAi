import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";
import { chartTotalGastoPorCategoria } from "./controllers/chart-total-gasto-por-categoria.js";
import { chartTotalGastoPorComercio } from "./controllers/chart-total-gasto-por-comercio.js";
import { detectarCambiosBoleta } from "./controllers/detectar-cambios-tabla-boletas.js";
import { refrescarGraficos } from "./controllers/refrescar-graficos.js";
import { totalBoletasNoRevisadas } from "./controllers/total-boletas-no-revisadas.js";
import { totalReceipts } from "./controllers/total-boletas.js";
import { totalGastado } from "./controllers/total-gastado.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("DOMContentLoaded", function () {
  const linkId = "dashboardLink"; // ID del enlace principal
  const subLinkId = "overviewLink"; // ID del subenlace
  const collapseId = "dashboard"; // ID de la lista que se expande
  const arrow = "dashboardArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);

  totalReceipts();
  totalGastado();
  chartTotalGastoPorCategoria();
  totalBoletasNoRevisadas();
  chartTotalGastoPorComercio();
  detectarCambiosBoleta();
  refrescarGraficos();
});
