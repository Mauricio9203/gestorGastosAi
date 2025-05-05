import { showSpinner, hideSpinner } from "../../../../../utils/spinners.js";
import { barChart } from "../../../charts/bar-chart.js";
import { getTotalGastoPorComercio } from "../services/get-total-gasto-por-comercio.js";

// Función de flecha para cargar los datos desde el servidor Flask
const chartTotalGastoPorComercio = async () => {
  let data = await getTotalGastoPorComercio();

  if (data == false) {
  } else {
    // Extraer etiquetas y valores del response (ajusta esto según tu respuesta real)
    const etiquetas = data.map((item) => item.nombre_comercio); // Ajusta 'rol_name' según tu respuesta
    const valores = data.map((item) => item.total_gastado); // Ajusta 'total_usuarios' según tu respuesta
    const titulo = "Total gastado por categoría";
    const idChart = document.getElementById("chart-total-gasto-por-comercio");
    const backgroundColor = "rgba(79, 0, 207, 0.2)";
    const borderColor = "rgb(69, 0, 83)";

    //enviar parámetros al constructor del gráfico
    barChart(etiquetas, valores, titulo, idChart, backgroundColor, borderColor);
  }
};

export { chartTotalGastoPorComercio };
