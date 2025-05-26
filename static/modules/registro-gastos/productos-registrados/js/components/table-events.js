const tableEvents = (table) => {
  // Evento para cuando una celda sea editada
  table.on("cellEdited", async function (cell) {
    let value = cell.getValue();
    let id_detalle_boleta = cell.getRow().getData().id_detalle_boleta;
    let fieldName = cell.getField();

    console.log("Celda editada:", {
      value: value,
      id_detalle_boleta: id_detalle_boleta,
      fieldName: fieldName,
    });
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
