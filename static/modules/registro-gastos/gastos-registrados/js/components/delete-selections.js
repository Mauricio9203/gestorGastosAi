import { obtenerKeyDesdeURL } from "../../../../../utils/cloudflare-crud.js";
import { confirmAction } from "../../../../../utils/sweet-alerts/confirm-action.js";
import { table } from "../controllers/load-table.js";
import { proccesingDelete } from "../controllers/processing-delete.js";
const deleteSelections = async () => {
  document.getElementById("delete-rows-gastos-registrados").addEventListener("click", async function () {
    const selectedRows = table.getSelectedRows();
    const boletasEliminar = [];

    selectedRows.forEach((row) => {
      const data = row.getData();
      boletasEliminar.push({ id_boleta: data.id, url_boleta: obtenerKeyDesdeURL(data.url_boleta) });
    });

    let title = "¿Estás seguro?";
    let text = "Esta acción no puede deshacerse";
    let icon = "warning";
    let confirmText = "Sí, eliminar!";
    let cancelText = "No, cancelar";

    // Usamos una función anónima para pasar la ejecución de proccesingDelete solo si se confirma la acción
    confirmAction(() => proccesingDelete(boletasEliminar), title, text, icon, confirmText, cancelText);
  });
};

export { deleteSelections };
