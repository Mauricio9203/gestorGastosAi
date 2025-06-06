import mostrarImagenSweetAlert from "../../../../../utils/sweet-alerts/mostrar-imagen.js";
import { getUnidadesMedida } from "../../../../../utils/unidades-medida.js";
import { tableSettings } from "../components/table-settings.js";
import { getIngredientesMaestrosDetalleBoleta, getProductosCargados } from "../services/get-productos-cargados.js";

let table;

//Iniciar Tabla
const loadTable = async () => {
  if (table) {
    table.destroy();
    table = null;
  }
  var ingredientesMaestros = await getIngredientesMaestrosDetalleBoleta();
  let ingredientesMaestrosLista = {};

  ingredientesMaestros.ingredientes_maestros.forEach((element) => {
    ingredientesMaestrosLista[element.id] = element.id + " - " + element.nombre;
  });

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
      formatter: function (cell, formatterParams) {
        const id = cell.getValue();
        const row = cell.getRow().getData();
        // Define aquí la URL base o completa a donde quieres que apunte
        const url = row.url_boleta;
        return `<a href="#"   rel="noopener noreferrer">${id}</a>`;
      },
      cellClick: function (e, cell) {
        e.preventDefault();
        const row = cell.getRow().getData();
        mostrarImagenSweetAlert(row.url_boleta);
      },
    },
    {
      title: "Nombre Ítem",
      field: "nombre_item",
      editor: "input",
      headerFilter: "input",
      minWidth: 150,
    },
    {
      title: "Cantidad Comprada",
      field: "cantidad",
      editor: "number",
      hozAlign: "right",
      minWidth: 150,
    },
    {
      title: "Cantidad por Unidad",
      field: "cantidad_contenido_unidad",
      editor: "number",
      hozAlign: "right",
      minWidth: 150,
    },
    {
      title: "Unidad Base",
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
      field: "fk_ingrediente_maestro",

      editor: "autocomplete",
      editorParams: {
        values: ingredientesMaestrosLista,
        showListOnEmpty: true, // muestra todas las opciones si el campo está vacío
        freetext: false, // evita que el usuario escriba algo que no esté en la lista
      },
      headerFilter: "input",
      minWidth: 150,
    },
  ];

  var paginationSize = 10;
  var initialSort = [{ column: "nombre_item", dir: "asc" }];

  table = tableSettings(tabledata, paginationSize, initialSort, column);
};

// Exportar todo
export { loadTable, table };
