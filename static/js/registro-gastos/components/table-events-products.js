import { notificationToastify } from "../../utils/notifications-toastify.js";

const tableEventsProducts = (table) => {
  //editItem(table);
  deleteItem(table);
  addItem(table);
};

const addItem = (table) => {
  document.getElementById("agregarItem").addEventListener("click", () => {
    table.addRow({
      cantidad_contenido: undefined,
      cantidad_items: undefined,
      categoria: undefined,
      precio_total: undefined,
      precio_unitario: undefined,
      producto: undefined,
      unidad_contenido: undefined,
      unidad_medida: undefined,
    });
  });
};

const deleteItem = (table) => {
  let cantidadSeleccionada;
  //eventos al seleccionar rows
  table.on("rowSelectionChanged", function (data) {
    if (data.length > 0) {
      cantidadSeleccionada = data.length;
      document.getElementById("eliminarItem").innerHTML = '<i class="fas fa-trash"></i> Eliminar (' + data.length + ")";
      document.getElementById("eliminarItem").style.display = "block";
    } else {
      document.getElementById("eliminarItem").innerHTML = '<i class="fas fa-trash"></i> Eliminar ';
      document.getElementById("eliminarItem").style.display = "none";
    }
  });

  document.getElementById("eliminarItem").addEventListener("click", () => {
    swal
      .fire({
        title: "Eliminar " + cantidadSeleccionada + " ítems.",
        text: "¿Está seguro de que desea eliminar los ítems? Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar.",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc3545",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const selectedRows = table.getSelectedRows();
          selectedRows.forEach((row) => {
            table.deleteRow(row);
          });
          document.getElementById("eliminarItem").innerHTML = '<i class="fas fa-trash"></i> Eliminar ';
          document.getElementById("eliminarItem").style.display = "none";
        }
      });
  });
};

/*
const editItem = (table) => {
  // Evento para cuando una celda sea editada
  table.on("cellEdited", function (cell) {
    let value = cell.getValue();
    let fieldName = cell.getField();
  });
};
*/
export { tableEventsProducts };
