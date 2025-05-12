import { formatearNombreCampo } from "../../../../../utils/formatear-nombre-campo.js";
import { notificationToastify, showProcessingToast } from "../../../../../utils/notifications-toastify.js";
import { table } from "../controllers/load-table.js";

const updateFieldBoleta = async (boletaId, campo, valor) => {
  showProcessingToast(true);
  try {
    const response = await fetch(`/boleta/updateFields/${boletaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campo: campo,
        valor: valor,
      }),
    });

    const data = await response.json();

    let dataBoleta = data["boleta"][0];

    // Extraer solo los campos esperados
    const { id, nombre_item, total_bruto, nombre_categoria, cantidad, precio_unitario, cantidad_contenido_unidad, unidad_medida, updated_at } = dataBoleta; // reemplaza con tus campos reales
    const cleanData = { id, nombre_item, total_bruto, nombre_categoria, cantidad, precio_unitario, cantidad_contenido_unidad, unidad_medida, updated_at };

    //actualizar solo la fila que se editó

    table.updateData([cleanData]); // solo actualiza la fila con los datos limpios

    if (!response.ok) {
      showProcessingToast(false);
      throw new Error(data.error || "Error al actualizar boleta o factura");
    }

    showProcessingToast(false);
    notificationToastify(formatearNombreCampo(campo) + " actualizado", 3000, "bottom", "right", "success");

    return data;
  } catch (error) {
    showProcessingToast(false);
    notificationToastify("Error: " + error.message, 3000, "bottom", "right", "danger");
    console.error("Error:", error);
    return { error: error.message };
  }
};

const validarDatosBoleta = (boletaId, campo, valor, cell) => {
  // Validar que no esté vacío
  if (campo != "confirmacion_revision") {
    if (!valor || valor.trim() === "") {
      notificationToastify("No se puede ingresar un valor vacío", 3000, "bottom", "right", "info");
      cell.restoreOldValue();
      return; // detener ejecución
    }
  }

  // Validar formato de fecha solo si el campo es fecha_boleta
  if (campo === "fecha_boleta") {
    if (!validarFecha(valor)) {
      notificationToastify("Debe ingresar una fecha válida en formato YYYY-MM-DD", 4000, "bottom", "right", "info");
      cell.restoreOldValue();
      return;
    }
  }

  // Si todo es válido, actualizar
  updateFieldBoleta(boletaId, campo, valor);
};

//cell.restoreOldValue();

const validarFecha = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  const [year, month, day] = dateString.split("-").map(Number);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

export { updateFieldBoleta, validarDatosBoleta };
