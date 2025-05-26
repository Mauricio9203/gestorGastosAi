import { getUnidadesMedida } from "../../../../../utils/unidades-medida.js";
import { tableSettings } from "../components/table-settings.js";
import { getIngredientesMaestrosDetalleBoleta, getProductosCargados } from "../services/get-productos-cargados.js";

let table;

//Iniciar Tabla
const loadTable = async () => {
  var ingredientesMaestros = await getIngredientesMaestrosDetalleBoleta();
  let ingredientesMaestrosLista = {};

  ingredientesMaestros.ingredientes_maestros.forEach((element) => {
    ingredientesMaestrosLista[element.id] = element.nombre;
  });

  console.log(ingredientesMaestrosLista);
  var data = await getProductosCargados();
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
      title: "ID Detalle",
      field: "id_detalle_boleta",
      hozAlign: "center",
      minWidth: 90,
    },
    {
      title: "ID Boleta",
      field: "id_boleta",
      hozAlign: "center",
      minWidth: 90,
    },

    {
      title: "Nombre Ítem",
      field: "nombre_item",
      editor: "input",
      headerFilter: "input",
      minWidth: 150,
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editor: "number",
      hozAlign: "right",
      minWidth: 80,
    },
    {
      title: "Cantidad Contenido Unidad",
      field: "cantidad_contenido_unidad",
      editor: "number",
      hozAlign: "right",
      minWidth: 120,
    },
    {
      title: "Unidad Medida",
      field: "unidad_medida",
      editor: "list",
      editorParams: {
        values: getUnidadesMedida(),
      },
      minWidth: 100,
    },
    {
      title: "Precio Unitario",
      field: "precio_unitario",
      editor: "number",
      formatter: "money",
      hozAlign: "right",
      formatterParams: {
        symbol: "$",
        thousand: ",",
        precision: 2,
      },
      minWidth: 120,
    },
    {
      title: "Precio Total",
      field: "precio_total",
      editor: "number",
      formatter: "money",
      hozAlign: "right",
      formatterParams: {
        symbol: "$",
        thousand: ",",
        precision: 2,
      },
      minWidth: 120,
    },
    {
      title: "Nombre Categoría",
      field: "nombre_categoria",
      editor: "input",
      headerFilter: "input",
      minWidth: 120,
    },
    {
      title: "Nombre Genérico",
      field: "nombre_generico",
      editor: "input",
      headerFilter: "input",
      minWidth: 150,
    },
    {
      title: "Ingrediente Maestro",
      field: "nombre_ingrediente_maestro",
      editor: "list",
      editorParams: {
        values: ingredientesMaestrosLista,
      },
      headerFilter: "input",
      minWidth: 150,
      formatter: function (cell) {
        const value = cell.getValue();
        return ingredientesMaestrosLista[value] || value;
      },
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
