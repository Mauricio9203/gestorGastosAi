import { showProcessingToastMessage, notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { loadTable } from "../controllers/load-table.js";
import { createIngredientesNuevosMasivo } from "./create-ingrediente-masivo.js";

const getIngredientesMaestros = async () => {
  try {
    const response = await fetch("/ingredientes-maestros");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("ingredientes maestros:", data.ingredientes_maestros);
    return data.ingredientes_maestros;
  } catch (error) {
    console.error("Error fetching detalle boleta:", error);
  }
};

const getIngredientesNuevos = async () => {
  try {
    const response = await fetch("/ingredientes-nuevos");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("ingredientes nuevos:", data.ingredientes_nuevos);
    if (data.ingredientes_nuevos.length > 0) {
      showProcessingToastMessage(true, "Se han detectado " + data.ingredientes_nuevos.length + " ingredientes nuevos, procediendo a actualizar...");
      await createIngredientesNuevosMasivo(data.ingredientes_nuevos);
      showProcessingToastMessage(false, "Se han detectado " + data.ingredientes_nuevos.length + " ingredientes nuevos, procediendo a actualizar...");
      notificationToastify("Ingredientes e insumos nuevos insertados exitósamente.", 3000, "bottom", "right", "success");
      loadTable();
    }
    return data.ingredientes_nuevos;
  } catch (error) {
    console.error("Error fetching detalle boleta:", error);
  }
};

export { getIngredientesMaestros, getIngredientesNuevos };
