import { addCustomActiveClass } from "../utils/sidebarConfig.js";
import { chart_count_users_by_rol } from "./controllers/chart-count-users-by-rol.js";
import { totalUsers } from "./controllers/total-users.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("DOMContentLoaded", function () {
  const linkId = "dashboardLink"; // ID del enlace principal
  const subLinkId = "overviewLink"; // ID del subenlace
  const collapseId = "dashboard"; // ID de la lista que se expande
  const arrow = "dashboardArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);

  chart_count_users_by_rol();
  totalUsers();
});
