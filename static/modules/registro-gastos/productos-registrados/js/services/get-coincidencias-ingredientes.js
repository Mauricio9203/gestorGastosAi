import { showProcessingToastMessage, notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { loadTable } from "../controllers/load-table.js";
import { actualizarIngredientesMasivos } from "./update-ingredientes-maestros.js";

const getCoincidenciasIngredientes = async () => {
  try {
    const response = await fetch("/ingredientes-coincidencias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // importante si usas sesión/cookies en Flask
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    //se envían las coincidencias de ingredientes a la función que las actualiza
    if (data.coincidencias_ingredientes.length > 0) {
      showProcessingToastMessage(true, "Se han obtenido " + data.coincidencias_ingredientes.length + " coincidencias de ingredientes, enlazando ingredientes...");
      let respuesta_actualizacion = await actualizarIngredientesMasivos(data.coincidencias_ingredientes);
      if (respuesta_actualizacion.success === true) {
        showProcessingToastMessage(false, "Se han enlazado " + respuesta_actualizacion.result + " con su respectivo ingrediente maestro.");
        // Notificación de éxito
        notificationToastify("Se han enlazado " + respuesta_actualizacion.result + " con su respectivo ingrediente maestro.", 2000, "bottom", "right", "success");
        loadTable();
      } else {
        console.error("Error al actualizar ingredientes:", respuesta_actualizacion.error);
        notificationToastify("Error al enlazar ingredientes: " + respuesta_actualizacion.error, 2000, "bottom", "right", "danger");
      }
    }
    return data.coincidencias_ingredientes || [];
  } catch (error) {
    console.error("Error al obtener coincidencias de ingredientes:", error);
    return [];
  }
};

export { getCoincidenciasIngredientes };
