const tableEvents = (table) => {
  // Evento para cuando una celda sea editada
  table.on("cellEdited", async function (cell) {
    let value = cell.getValue();
    let id_detalle_boleta = cell.getRow().getData().id_detalle_boleta;
    let fieldName = cell.getField();
  });

  //eventos al seleccionar rows
  table.on("rowSelectionChanged", function (data) {
    if (data.length > 0) {
      document.getElementById("delete-rows-ingredientes-maestros").style.display = "block";
      document.getElementById("delete-rows-ingredientes-maestros").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span> (' + data.length + ")";
    } else {
      document.getElementById("delete-rows-ingredientes-maestros").style.display = "none";
      document.getElementById("delete-rows-ingredientes-maestros").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span>"';
    }
  });
};

export { tableEvents };
