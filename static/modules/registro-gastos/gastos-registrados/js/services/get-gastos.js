import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { loadTable } from "../controllers/load-table.js";

const getGastos = async () => {
  try {
    const response = await fetch("/boletas/list");
    const data = await response.json();

    return data;
  } catch (error) {
    notificationToastify("Ha habido un problema al cargar la tabla, reiniciando módulo", 3000, "bottom", "right", "warning");
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
};

export { getGastos };
