import { tableSettings } from "../components/table-settings.js";
import { getGastos } from "../services/get-gastos.js";

let table;

//Iniciar Tabla
const loadTable = async () => {
  var data = await getGastos();
  var tabledata = data.boletas;

  //configuración de las columnas
  var column = [
    {
      hozAlign: "center",
      formatter: "rowSelection",
      width: 30,
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      cellClick: function (e, cell) {
        cell.getRow().toggleSelect();
      },
    },
    {
      title: "Comercio",
      field: "nombre_comercio",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Total Neto",
      field: "total_neto",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "% IVA",
      field: "porcentaje_iva",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Total Bruto",
      field: "total_bruto",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Fecha Compra",
      field: "fecha_boleta",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Creado",
      field: "created_at",
      formatter: function (cell) {
        // Obtener la fecha desde el campo
        const date = new Date(cell.getValue());

        // Formatear la fecha y hora a "DD/MM/YYYY HH:mm:ss"
        const formattedDate = date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
        return formattedDate;
      },
      headerFilter: "input",
    },
    {
      title: "Actualizado",
      field: "updated_at",
      tooltip: false,
      formatter: (cell) => {
        // Obtener la fecha desde el campo
        const date = new Date(cell.getValue());

        // Formatear la fecha y hora a "DD/MM/YYYY HH:mm:ss"
        const formattedDate = date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
        return formattedDate;
      },
      headerFilter: "input",
    },
    {
      title: "Foto",
      field: "url_boleta",
      hozAlign: "center",
      formatter: function (cell) {
        const url = cell.getValue();
        const rowId = cell.getRow().getPosition();
        return `
          <div class="viewer-wrapper" id="viewer-${rowId}">
            <img src="${url}" class="boleta-image-hover" style="height: 60px; max-width: 100px; cursor: pointer;"  />
          </div>
        `;
      },
      tooltip: false,
    },
    {
      title: "Actions",
      field: "Actions",
      hozAlign: "center",
      formatter: function (cell) {
        const rowData = cell.getRow().getData();
        const id = rowData.id; // Suponiendo que la fila tiene una columna 'id'
        return `
          <button class="btn btn-sm changePass" title="Change password" 
                  data-bs-toggle="modal" data-bs-target="#modal-detalle-boleta" 
                  data-id="${id}">
            <i class="fas fas fa-search text-primary"></i>
          </button>`;
      },
    },
  ];

  var paginationSize = 10;
  var initialSort = [{ column: "created_at", dir: "desc" }];

  table = tableSettings(tabledata, paginationSize, initialSort, column);
};

// Exportar todo
export { loadTable, table };
