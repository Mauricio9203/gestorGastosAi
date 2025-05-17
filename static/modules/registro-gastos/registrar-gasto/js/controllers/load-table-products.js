import { tableSettingsProducts } from "../components/table-settings-products.js";

let tableProducts;
let items;

//Iniciar Tabla
const loadTableProducts = (data) => {
  //campos boleta
  const esPantallaPequena = window.innerWidth < 768;
  document.getElementById("fechaBoleta").value = data.fecha;
  document.getElementById("rutBoleta").value = data.rut;
  document.getElementById("totalBoletaBruto").value = data.total_boleta_bruto;
  document.getElementById("comercioBoleta").value = data.comercio;
  document.getElementById("totalBoletaNeto").value = data.total_boleta_neto;
  document.getElementById("porcentajeIva").value = data.porcentaje_iva;

  var tabledata = data.items;
  let items = data.items;

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
      title: "producto",
      field: "producto",
      editor: "input",
      minWidth: esPantallaPequena ? 70 : 200, // cambia según ancho de pantalla
      frozen: esPantallaPequena ? false : true, // cambia según ancho de pantalla
      headerFilter: "input",
    },
    {
      title: "Precio Total",
      field: "precio_total",
      editor: "input",
      minWidth: "20px",
      headerFilter: "input",
      bottomCalc: "sum", // Calcular el total de esta columna
      bottomCalcFormatter: "money", // Formatear como dinero
      formatter: "money",
      formatterParams: {
        symbol: "$",
        thousand: ",",
        precision: 2,
      },
    },
    {
      title: "Categoría",
      field: "categoria",
      editor: "input",
      minWidth: "15px",
      headerFilter: "input",
    },
    {
      title: "Nombre Genérico",
      field: "nombre_generico",
      editor: "input",
      minWidth: "15px",
      headerFilter: "input",
    },
    {
      title: "cantidad",
      field: "cantidad_items",
      editor: "input",
      minWidth: "15px",
      headerFilter: "input",
      bottomCalc: "sum",
    },
    {
      title: "Precio Unitario",
      field: "precio_unitario",
      editor: "input",
      minWidth: "20px",
      headerFilter: "input",
      formatter: "money",
      formatterParams: {
        symbol: "$",
        thousand: ",",
        precision: 2,
      },
    },
    {
      title: "cantidad de contenido",
      field: "cantidad_contenido",
      editor: "input",
      minWidth: "15px",
      headerFilter: "input",
    },
    {
      title: "Unidad de Medida",
      field: "unidad_medida",
      editor: "input",
      minWidth: "15px",
      headerFilter: "input",
    },
  ];

  var paginationSize = 10;

  tableProducts = tableSettingsProducts(tabledata, paginationSize, column);
};

// Exportar todo
export { loadTableProducts, tableProducts, items };
