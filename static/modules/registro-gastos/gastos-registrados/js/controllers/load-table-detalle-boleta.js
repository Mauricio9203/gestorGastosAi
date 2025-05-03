import { tableSettingsDetalleBoleta } from "../components/table-settings-detalle-boleta.js";
import { getDetalleBoleta } from "../services/get-detalle-boleta.js";

let tableDetalleBoleta;

//Iniciar Tabla
const loadTableDetalleBoleta = async (id_boleta) => {
  var data = await getDetalleBoleta(id_boleta);
  var tabledata = data.detalle_boleta;

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
      title: "Item",
      field: "nombre_item",
      editor: "input",
      width: 400,
      headerFilter: "input",
    },
    {
      title: "Total",
      field: "precio_total",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Categoria",
      field: "nombre_categoria",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Precio Unitario",
      field: "precio_unitario",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Contenido",
      field: "cantidad_contenido_unidad",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Unidad Medida",
      field: "unidad_medida",
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
  ];

  var paginationSize = 10;
  var initialSort = [{ column: "created_at", dir: "desc" }];

  tableDetalleBoleta = tableSettingsDetalleBoleta(tabledata, paginationSize, initialSort, column);
};

// Exportar todo
export { loadTableDetalleBoleta, tableDetalleBoleta };
