import { formatearNombreCampo } from "../../../../../utils/formatear-nombre-campo.js";
import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { updateDetalleBoleta } from "../services/update-detalle-boleta.js";

const tableEvents = (table) => {
  // Evento para cuando una celda sea editada
  table.on("cellEdited", async function (cell) {
    cell.getRow().reformat(); // <- esta función no existe, la alternativa es forzar el redraw completo de la fila:
    cell.getRow().getElement().style.transition = "background-color 0.3s"; // opcional, para animación suave

    let value = cell.getValue();
    let id_detalle_boleta = cell.getRow().getData().id_detalle_boleta;
    let fieldName = cell.getField();

    console.log("Celda editada:", {
      value: value,
      id_detalle_boleta: id_detalle_boleta,
      fieldName: fieldName,
    });

    if (value === null || value === undefined || value === "") {
      notificationToastify("El valor no puede ser nulo", 2000, "bottom", "right", "warning");
      cell.restoreOldValue();
      return;
    }

    let resultado = await updateDetalleBoleta(id_detalle_boleta, fieldName, value);

    if (resultado.error) {
      notificationToastify("Error: " + resultado.error, 2000, "bottom", "center", "warning");
      cell.restoreOldValue();
      return;
    } else {
      notificationToastify(formatearNombreCampo(fieldName) + " actualizado correctamente.", 2000, "bottom", "center", "success");
    }
    console.log("Resultado de updateDetalleBoleta:", resultado);
  });

  //eventos al seleccionar rows
  table.on("rowSelectionChanged", function (data) {
    if (data.length > 0) {
      document.getElementById("delete-rows-productos-registrados").style.display = "block";
      document.getElementById("delete-rows-productos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span> (' + data.length + ")";
    } else {
      document.getElementById("delete-rows-productos-registrados").style.display = "none";
      document.getElementById("delete-rows-productos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span>"';
    }
  });
};

export { tableEvents };
