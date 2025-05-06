import { graficoDinamico } from "../../../../panel-de-control/charts/grafico-dinamico.js";
import { tableSettingsDetalleBoleta } from "../components/table-settings-detalle-boleta.js";
import { getDetalleBoleta } from "../services/get-detalle-boleta.js";

let tableDetalleBoleta;
//Iniciar Tabla
const loadTableDetalleBoleta = async (id_boleta) => {
  document.getElementById("detalle-boleta-table-cargando").style.display = "block";
  document.getElementById("detalle-boleta-table").style.display = "none";
  var data = await getDetalleBoleta(id_boleta);
  chartResumenDetalleBoleta(data.detalle_boleta);
  document.getElementById("detalle-boleta-table-cargando").style.display = "none";
  document.getElementById("detalle-boleta-table").style.display = "block";
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

const chartResumenDetalleBoleta = (data) => {
  console.log(data);
  if (data == false) {
  } else {
    // Extraer etiquetas y valores del response (ajusta esto según tu respuesta real)
    const etiquetas = data.map((item) => item.nombre_categoria); // Ajusta 'rol_name' según tu respuesta
    const valores = data.map((item) => item.precio_total); // Ajusta 'total_usuarios' según tu respuesta
    const titulo = "Resumen de la compra";
    const idChart = document.getElementById("chart-resumen-detalle-boleta");
    const backgroundColor = "rgba(57, 59, 199, 0.86)";
    const borderColor = "rgba(0, 1, 61, 0.68)";

    let agrupados = agruparPorEtiqueta(etiquetas, valores);

    //enviar parámetros al constructor del gráfico
    graficoDinamico(agrupados.etiquetas, agrupados.valores, titulo, idChart, backgroundColor, borderColor, "bar");
  }
};

const agruparPorEtiqueta = (etiquetas, valores) => {
  const resultado = etiquetas.reduce((acc, etiqueta, index) => {
    if (!acc[etiqueta]) {
      acc[etiqueta] = 0;
    }
    acc[etiqueta] += valores[index];
    return acc;
  }, {});

  const etiquetasAgrupadas = Object.keys(resultado);
  const valoresAgrupados = Object.values(resultado);

  return { etiquetas: etiquetasAgrupadas, valores: valoresAgrupados };
};

// Exportar todo
export { loadTableDetalleBoleta, tableDetalleBoleta };
