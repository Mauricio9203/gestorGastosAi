import { table } from "../controllers/load-table.js";
import { tableEvents } from "./table-events.js";

//configurar Tabla
const tableSettings = (tabledata, paginationSize, initialSort, column) => {
  const table = new Tabulator("#productos-registrados-table", {
    data: tabledata, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    filterMode: "local",
    paginationSize: paginationSize, //allow x rows per page of data
    paginationCounter: "rows", //display count of paginated rows in footer
    movableColumns: true, //allow column order to be changed
    initialSort: initialSort,
    columnDefaults: {
      tooltip: true, //show tool tips on cells
    },
    columns: column,
    headerCssClass: "custom-header",
    rowFormatter: function (row) {
      const columnasAResaltar = ["unidad_medida", "cantidad_contenido_unidad", "id_detalle_boleta", "precio_unitario"];
      const data = row.getData();
      const el = row.getElement();

      const condicionInvalida = (["kilogramos", "litros", "gramos", "mililitros", "unidades"].includes(data.unidad_medida) && data.cantidad_contenido_unidad <= 0) || data.precio_unitario <= 0;

      columnasAResaltar.forEach((columna) => {
        const celda = row.getCell(columna);
        if (celda) {
          const celdaEl = celda.getElement();
          if (condicionInvalida) {
            celdaEl.style.backgroundColor = "#ffe0e0";
            celdaEl.style.color = "black";
            celdaEl.style.fontWeight = "bold";
          } else {
            celdaEl.style.backgroundColor = "";
            celdaEl.style.color = "";
            celdaEl.style.fontWeight = "";
          }
        }
      });
    },
  });

  // Esperar a que la tabla esté completamente construida antes de limpiar los filtros
  table.on("tableBuilt", function () {
    table.clearFilter();
  });

  tableEvents(table);

  return table;
};

// Configuración Botones de exportación
const exportButtons = () => {
  //cambiar nombre a los archivos de exportación
  let fileName = "datos";
  // CSV
  document.getElementById("download-csv-productos-registrados").addEventListener("click", function () {
    table.download("csv", fileName + ".csv");
  });
  // Excel (XLSX)
  document.getElementById("download-xlsx-productos-registrados").addEventListener("click", function () {
    table.download("xlsx", fileName + ".xlsx", { sheetName: "Reporte" });
  });
  // JSON
  document.getElementById("download-json-productos-registrados").addEventListener("click", function () {
    table.download("json", fileName + ".json");
  });
};

export { tableSettings, exportButtons };
