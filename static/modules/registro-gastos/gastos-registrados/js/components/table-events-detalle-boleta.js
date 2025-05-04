const tableEventsDetalleBoleta = (tableDetalleBoleta) => {
  // Evento para cuando una celda sea editada
  tableDetalleBoleta.on("cellEdited", function (cell) {
    let value = cell.getValue();
    let rowId = cell.getRow().getData().id;
    let fieldName = cell.getField();
  });

  //eventos al seleccionar rows
  tableDetalleBoleta.on("rowSelectionChanged", function (data) {
    if (data.length > 0) {
      document.getElementById("delete-rows-detalle-boleta").style.display = "block";
      document.getElementById("delete-rows-detalle-boleta").innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar (' + data.length + ")";
    } else {
      document.getElementById("delete-rows-detalle-boleta").style.display = "none";
      document.getElementById("delete-rows-detalle-boleta").innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar"';
    }
  });
};

export { tableEventsDetalleBoleta };
