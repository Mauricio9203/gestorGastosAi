import { confirmAction } from "../../../../../utils/sweet-alerts/confirm-action.js";
import { tableDetalleBoleta } from "../controllers/load-table-detalle-boleta.js";
import { proccesingDeleteDetalleBoleta } from "../controllers/processing-delete-detalle-boleta.js";

const deleteSelectionsDetalleBoleta = async () => {
  document.getElementById("delete-rows-detalle-boleta").addEventListener("click", async function () {
    const selectedRows = tableDetalleBoleta.getSelectedRows();
    const detalleBoletaEliminar = [];

    selectedRows.forEach((row) => {
      const data = row.getData();
      detalleBoletaEliminar.push({ id_detalle_boleta: data.id });
    });

    console.log(detalleBoletaEliminar);

    let title = "¿Estás seguro?";
    let text = "Esta acción no puede deshacerse";
    let icon = "warning";
    let confirmText = "Sí, eliminar!";
    let cancelText = "No, cancelar";

    // Usamos una función anónima para pasar la ejecución de proccesingDelete solo si se confirma la acción
    confirmAction(() => proccesingDeleteDetalleBoleta(detalleBoletaEliminar), title, text, icon, confirmText, cancelText);
  });
};

export { deleteSelectionsDetalleBoleta };
