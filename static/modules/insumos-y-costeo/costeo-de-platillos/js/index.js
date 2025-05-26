import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";

    window.addEventListener("DOMContentLoaded", function () {
      const linkId = "costeo-de-platillosLink";
      const subLinkId = "insumos-y-costeoLink";
      const collapseId = "costeo-de-platillos";
      const arrow = "costeo-de-platillosArrow";

      addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
    });
    