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
      title: "ID",
      field: "id",
      headerFilter: "input",
      minWidth: 150,
    },
    {
      title: "Comercio",
      field: "nombre_comercio",
      editor: "input",
      headerFilter: "input",
      minWidth: 150,
    },
    {
      title: "Total Neto",
      field: "total_neto",
      editor: "input",
      minWidth: 100,
      formatter: "money",
      formatterParams: {
        symbol: "$",
        thousand: ",",
        precision: 2,
      },
    },
    {
      title: "% IVA",
      field: "porcentaje_iva",
      editor: "input",
      minWidth: 100,
    },
    {
      title: "Total Bruto",
      field: "total_bruto",
      editor: "input",
      minWidth: 100,
      formatter: "money",
      formatterParams: {
        symbol: "$",
        thousand: ",",
        precision: 2,
      },
    },
    {
      title: "Revisado",
      field: "confirmacion_revision",
      formatter: "tickCross",
      editor: true, // permite marcar/desmarcar
      minWidth: 100,
    },
    {
      title: "Fecha Compra",
      field: "fecha_boleta",
      editor: "input",
      headerFilter: "input",
      minWidth: 100,
    },
    {
      title: "Creado",
      field: "created_at",
      minWidth: 140,
      formatter: function (cell) {
        // Obtener la fecha desde el campo
        const date = new Date(cell.getValue());

        // Formatear la fecha y hora a "DD/MM/YYYY HH:mm:ss"
        const formattedDate = date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
        return formattedDate;
      },
    },
    {
      title: "Actualizado",
      field: "updated_at",
      minWidth: 140,
      tooltip: false,
      formatter: (cell) => {
        // Obtener la fecha desde el campo
        const date = new Date(cell.getValue());

        // Formatear la fecha y hora a "DD/MM/YYYY HH:mm:ss"
        const formattedDate = date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
        return formattedDate;
      },
    },
    {
      title: "Documento",
      field: "url_boleta",
      hozAlign: "center",
      minWidth: 100,
      headerSort: false,
      formatter: function (cell) {
        const url = cell.getValue();
        const rowId = cell.getRow().getPosition();

        // Verificar si la URL es un PDF
        const isPDF = url.toLowerCase().endsWith(".pdf");

        if (isPDF) {
          // Enlace de descarga para PDF con ícono
          return `
            <div class="viewer-wrapper" id="viewer-${rowId}">
              <a href="${url}" target="_blank" class="pdf-link">
                <i class="fas fa-file-pdf" style="color: #d9534f; font-size: 24px;"></i>
              </a>
            </div>
          `;
        } else {
          // Mostrar imagen con ícono y mantener el viewer
          return `
            <div class="viewer-wrapper" id="viewer-${rowId}">
              <img src="${url}" class="boleta-image-hover" style="max-height: 30px;cursor: pointer;" />
            </div>
          `;
        }
      },
      tooltip: false,
    },
    {
      title: "Actions",
      field: "Actions",
      hozAlign: "center",
      minWidth: 80,
      headerSort: false, //desactiva el sort la flecha
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
