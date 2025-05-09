import { disableButton, enableButton } from "../../../../../utils/disable-enable-save-button.js";
import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { deleteDetalleBoletas } from "../services/delete-detalle-boleta.js";
import { tableDetalleBoleta } from "./load-table-detalle-boleta.js";

const proccesingDeleteDetalleBoleta = async (data) => {
  disableButton("delete-rows-detalle-boleta");
  let response = await deleteDetalleBoletas(data);
  console.log("respuestaa", response);
  enableButton("delete-rows-detalle-boleta");
  notificationToastify("¡Elementos eliminados correctamente!", 2000, "bottom", "right", "success");
  document.getElementById("delete-rows-detalle-boleta").style.display = "none";

  eliminarFilasTabulator(response);
};

const eliminarFilasTabulator = (idsEliminadas) => {
  idsEliminadas.forEach((id) => {
    tableDetalleBoleta.deleteRow(id); // Elimina fila por ID
  });
};

export { proccesingDeleteDetalleBoleta };
