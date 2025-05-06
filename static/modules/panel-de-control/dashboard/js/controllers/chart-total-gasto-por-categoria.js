import { showSpinner, hideSpinner } from "../../../../../utils/spinners.js";
import { graficoDinamico } from "../../../charts/grafico-dinamico.js";
import { getTotalGastoPorCategoria } from "../services/get-total-gasto-por-categoria.js";

// Función de flecha para cargar los datos desde el servidor Flask
const chartTotalGastoPorCategoria = async () => {
  let data = await getTotalGastoPorCategoria();

  if (data == false) {
  } else {
    // Extraer etiquetas y valores del response (ajusta esto según tu respuesta real)
    const etiquetas = data.map((item) => item.nombre_categoria); // Ajusta 'rol_name' según tu respuesta
    const valores = data.map((item) => item.total_gastado); // Ajusta 'total_usuarios' según tu respuesta
    const titulo = "Total gastado por categoría";
    const idChart = document.getElementById("chart-total-gasto-por-categoria");
    const backgroundColor = "rgba(57, 59, 199, 0.86)";
    const borderColor = "rgba(0, 1, 61, 0.68)";

    //enviar parámetros al constructor del gráfico
    graficoDinamico(etiquetas, valores, titulo, idChart, backgroundColor, borderColor, "bar");
  }
};

export { chartTotalGastoPorCategoria };
