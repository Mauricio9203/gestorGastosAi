import { disableButton, enableButton } from "../../../../../utils/disable-enable-save-button.js";
import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { deleteUsers } from "../services/delete-users.js";
import { loadTable, table } from "./load-table.js";

const proccesingDelete = async (ids) => {
  disableButton("delete-rows");
  let data = await deleteUsers(ids);
  enableButton("delete-rows");
  notificationToastify("¡Elementos eliminados correctamente!", 2000, "bottom", "right", "success");
  document.getElementById("delete-rows").style.display = "none";

  //elimina la fila dinámicamente, sin tener que recargar la tabla
  table.deleteRow(data[0].id);
};

export { proccesingDelete };
