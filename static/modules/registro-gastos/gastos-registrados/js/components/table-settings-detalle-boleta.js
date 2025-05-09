import { tableEventsDetalleBoleta } from "./table-events-detalle-boleta.js";

let tableDetalleBoleta;

//configurar Tabla
const tableSettingsDetalleBoleta = (tabledata, paginationSize, initialSort, column) => {
  // 💣 Destruir la tabla anterior si ya existe
  if (tableDetalleBoleta) {
    tableDetalleBoleta.destroy();
    tableDetalleBoleta = null;
  }

  tableDetalleBoleta = new Tabulator("#detalle-boleta-table", {
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
      tooltip: false, //show tool tips on cells
    },
    columns: column,
    headerCssClass: "custom-header",
  });

  // Esperar a que la tabla esté completamente construida antes de limpiar los filtros
  tableDetalleBoleta.on("tableBuilt", function () {
    tableDetalleBoleta.clearFilter();
  });

  //parche: si no se cargan los detalles de la tabla, lo fuerza para que re aparezca
  setTimeout(() => {
    const elemento = document.querySelector("#detalle-boleta-table > div.tabulator-tableholder > div");
    if (!elemento) {
      console.log("no se detectó el elemento solucionando");
      document.querySelector("#detalle-boleta-table > div.tabulator-footer > div.tabulator-footer-contents > span.tabulator-paginator > span > button").click();
    }
  }, 2000);

  tableEventsDetalleBoleta(tableDetalleBoleta);

  return tableDetalleBoleta;
};

// Configuración Botones de exportación
const exportButtonsDetalleBoleta = () => {
  //cambiar nombre a los archivos de exportación
  let fileName = "datos";
  // CSV
  document.getElementById("download-csv-detalle-boleta").addEventListener("click", function () {
    tableDetalleBoleta.download("csv", fileName + ".csv");
  });
  // Excel (XLSX)
  document.getElementById("download-xlsx-detalle-boleta").addEventListener("click", function () {
    tableDetalleBoleta.download("xlsx", fileName + ".xlsx", { sheetName: "Reporte" });
  });
  // JSON
  document.getElementById("download-json-detalle-boleta").addEventListener("click", function () {
    tableDetalleBoleta.download("json", fileName + ".json");
  });
};

export { tableSettingsDetalleBoleta, exportButtonsDetalleBoleta };
