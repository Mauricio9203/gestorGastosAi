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
      minWidth: 200,
      headerFilter: "input",
    },
    {
      title: "Total",
      field: "precio_total",
      editor: "input",
      headerFilter: "input",
      minWidth: 100,
      bottomCalc: "sum",
    },
    {
      title: "Categoria",
      field: "nombre_categoria",
      editor: "input",
      headerFilter: "input",
      minWidth: 100,
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editor: "input",
      headerFilter: "input",
      minWidth: 100,
    },
    {
      title: "Precio Unitario",
      field: "precio_unitario",
      editor: "input",
      headerFilter: "input",
      minWidth: 100,
    },
    {
      title: "Contenido",
      field: "cantidad_contenido_unidad",
      editor: "input",
      headerFilter: "input",
      minWidth: 100,
    },
    {
      title: "Unidad Medida",
      field: "unidad_medida",
      editor: "input",
      headerFilter: "input",
      minWidth: 100,
    },
    {
      title: "Creado",
      field: "created_at",
      minWidth: 130,
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
      minWidth: 130,
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

  var paginationSize = 12;
  var initialSort = [];

  tableDetalleBoleta = tableSettingsDetalleBoleta(tabledata, paginationSize, initialSort, column);
};

// Exportar todo
export { loadTableDetalleBoleta, tableDetalleBoleta };
