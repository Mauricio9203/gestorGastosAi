import { getUnidadesMedida } from "../../../../../utils/unidades-medida.js";
import { tableSettings } from "../components/table-settings.js";
import { getIngredientesMaestros } from "../services/get-ingredientes-maestros.js";

let table;

//Iniciar Tabla
const loadTable = async () => {
  var data = await getIngredientesMaestros();
  var tabledata = data;

  //configuración de las columnas
  var column = [
    {
      hozAlign: "center",
      formatter: "rowSelection",
      width: 30,
      titleFormatter: "rowSelection",
      headerSort: false,
      cellClick: function (e, cell) {
        cell.getRow().toggleSelect();
      },
    },
    {
      title: "ID",
      field: "id",
      hozAlign: "center",
      minWidth: 80,
    },
    {
      title: "Nombre",
      field: "nombre",
      editor: "input",
      headerFilter: "input",
      minWidth: 150,
    },
    {
      title: "Descripción",
      field: "descripcion",
      editor: "input",
      headerFilter: "input",
      minWidth: 200,
    },
    {
      title: "Categoría",
      field: "categoria",
      editor: "input",
      headerFilter: "input",
      minWidth: 120,
    },
    {
      title: "Unidad Base",
      field: "unidad_base",
      editor: "select",
      editorParams: {
        values: getUnidadesMedida(), // Asumiendo que tienes esta función
      },
      minWidth: 120,
    },
    {
      title: "Activo",
      field: "activo",
      editor: true,
      formatter: "tickCross",
      hozAlign: "center",
      width: 90,
    },
    {
      title: "% Rendimiento",
      field: "porcentaje_rendimiento",
      editor: "number",
      hozAlign: "right",
      formatterParams: {
        precision: 2,
      },
      minWidth: 130,
    },
    {
      title: "Definido por Humano",
      field: "redimiento_definido_por_humano",
      editor: true,
      formatter: "tickCross",
      hozAlign: "center",
      width: 160,
    },
    {
      title: "Creado",
      field: "created_at",
      minWidth: 160,
      formatter: function (cell) {
        const date = new Date(cell.getValue());
        return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
      },
    },
    {
      title: "Actualizado",
      field: "updated_at",
      minWidth: 160,
      formatter: function (cell) {
        const date = new Date(cell.getValue());
        return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
      },
    },
  ];

  var paginationSize = 10;
  var initialSort = [{ column: "created_at", dir: "desc" }];

  table = tableSettings(tabledata, paginationSize, initialSort, column);
};

// Exportar todo
export { loadTable, table };
