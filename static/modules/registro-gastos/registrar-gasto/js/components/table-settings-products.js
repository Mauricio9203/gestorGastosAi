import { tableEventsProducts } from "./table-events-products.js";
let table;
//configurar Tabla
const tableSettingsProducts = (tabledata, paginationSize, column) => {
  if (table) {
    table.destroy();
  }
  table = new Tabulator("#products-table", {
    data: tabledata, //load row data from array
    layout: "fitData", // No ajusta columnas al ancho del contenedor
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    filterMode: "local",
    paginationSize: paginationSize, //allow x rows per page of data
    paginationCounter: "rows", //display count of paginated rows in footer
    movableColumns: true, //allow column order to be changed
    initialSort: [],
    columnDefaults: {
      tooltip: true, //show tool tips on cells
    },
    columns: column,
    headerCssClass: "custom-header",
  });

  // Esperar a que la tabla esté completamente construida antes de limpiar los filtros
  table.on("tableBuilt", function () {
    table.clearFilter();
  });

  tableEventsProducts(table);

  return table;
};

export { tableSettingsProducts };
