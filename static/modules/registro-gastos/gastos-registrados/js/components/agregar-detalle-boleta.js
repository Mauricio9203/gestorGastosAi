import { tableDetalleBoleta } from "../controllers/load-table-detalle-boleta.js";

const agregarDetalleBoleta = () => {
  document.getElementById("add-rows-detalle-boleta").addEventListener("click", function () {
    document.getElementById("pestana-agregar-detalle-boleta").click();
  });
};

export { agregarDetalleBoleta };
