import { disableButton, enableButton } from "../../../../../utils/disable-enable-save-button.js";
import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { deleteBoletas } from "../services/delete-boletas.js";
import { table } from "./load-table.js";

const proccesingDelete = async (data) => {
  disableButton("delete-rows-gastos-registrados");
  let response = await deleteBoletas(data);
  enableButton("delete-rows-gastos-registrados");
  notificationToastify("¡Elementos eliminados correctamente!", 2000, "bottom", "right", "success");
  document.getElementById("delete-rows-gastos-registrados").style.display = "none";

  eliminarFilasTabulator(response);
};

const eliminarFilasTabulator = (idsEliminadas) => {
  idsEliminadas.forEach((id) => {
    table.deleteRow(id); // Elimina fila por ID
  });
};

export { proccesingDelete };
