import { tableSettingsProducts } from "../components/table-settings-products.js";

let tableProducts;
let items;

//Iniciar Tabla
const loadTableProducts = (data) => {
  //campos boleta

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
      width: "40px",
      frozen: true,
      headerFilter: "input",
    },
    {
      title: "Precio Total",
      field: "precio_total",
      editor: "input",
      width: "20px",
      headerFilter: "input",
      bottomCalc: "sum", // Calcular el total de esta columna
      bottomCalcFormatter: "money", // Formatear como dinero
    },
    {
      title: "Categoría",
      field: "categoria",
      editor: "input",
      width: "15px",
      headerFilter: "input",
    },
    {
      title: "cantidad",
      field: "cantidad_items",
      editor: "input",
      width: "15px",
      headerFilter: "input",
      bottomCalc: "sum",
    },
    {
      title: "Precio Unitario",
      field: "precio_unitario",
      editor: "input",
      width: "20px",
      headerFilter: "input",
    },
    {
      title: "cantidad de contenido",
      field: "cantidad_contenido",
      editor: "input",
      width: "15px",
      headerFilter: "input",
    },
    {
      title: "Unidad de Medida",
      field: "unidad_medida",
      editor: "input",
      width: "15px",
      headerFilter: "input",
    },
  ];

  var paginationSize = 10;

  tableProducts = tableSettingsProducts(tabledata, paginationSize, column);
};

// Exportar todo
export { loadTableProducts, tableProducts, items };
