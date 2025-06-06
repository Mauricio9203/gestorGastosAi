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
  });

  //eventos al seleccionar rows
  table.on("rowSelectionChanged", function (data) {
    document.getElementById("alerta-modificacion-masiva-db").innerHTML = "Se procederán a modificar <strong>" + data.length + "</strong> registros.";
    if (data.length > 0) {
      document.getElementById("opciones-detalle-boleta-dropdown").style.display = "block";

      document.getElementById("delete-rows-productos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span> (' + data.length + ")";
      document.getElementById("edicion-masiva-productos").innerHTML = '<i class="fas fa-edit"></i> <span class="span_edicion_masiva">Edición Masiva</span> (' + data.length + ")";
      document.getElementById("opciones-detalle-boleta-dropdown").innerHTML = '<i class="fas fa-cog me-1"></i> Acciones (' + data.length + ")";
    } else {
      document.getElementById("opciones-detalle-boleta-dropdown").style.display = "none";

      document.getElementById("delete-rows-productos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span>"';
      document.getElementById("edicion-masiva-productos").innerHTML = '<i class="fas fa-edit"></i> <span class="span_edicion_masiva">Edición Masiva</span>';
      document.getElementById("opciones-detalle-boleta-dropdown").innerHTML = '<i class="fas fa-cog me-1"></i> Acciones';
    }
  });
};

export { tableEvents };
