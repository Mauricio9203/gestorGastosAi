import { confirmAction } from "../../utils/sweet-alerts/confirm-action.js";
import { proccesingDelete } from "../controllers/processing-delete.js";
import { table } from "../controllers/load-table.js";

const deleteSelections = async () => {
  document.getElementById("delete-rows").addEventListener("click", async function () {
    const selectedRows = table.getSelectedRows();
    const ids = [];

    selectedRows.forEach((row) => {
      const data = row.getData();
      ids.push(data.id);
    });

    let title = "¿Estás seguro?";
    let text = "Esta acción no puede deshacerse";
    let icon = "warning";
    let confirmText = "Sí, eliminar!";
    let cancelText = "No, cancelar";

    // Usamos una función anónima para pasar la ejecución de proccesingDelete solo si se confirma la acción
    confirmAction(() => proccesingDelete(ids), title, text, icon, confirmText, cancelText);
  });
};

export { deleteSelections };
