import { showSpinner, hideSpinner } from "../../../../../utils/spinners.js";
import { barChart } from "../../../charts/bar-chart.js";
import { getDataUsersByRol } from "../services/get-data-users-by-rol.js";

// Función de flecha para cargar los datos desde el servidor Flask
const chart_count_users_by_rol = async () => {
  showSpinner("spinner_count_by_rol", "count_users_by_roles");

  let data = await getDataUsersByRol();

  if (data == false) {
    hideSpinner("spinner_count_by_rol", "count_users_by_roles");
  } else {
    hideSpinner("spinner_count_by_rol", "count_users_by_roles");

    // Extraer etiquetas y valores del response (ajusta esto según tu respuesta real)
    const etiquetas = data.map((item) => item.rol_name); // Ajusta 'rol_name' según tu respuesta
    const valores = data.map((item) => item.total_usuarios); // Ajusta 'total_usuarios' según tu respuesta
    const titulo = "Number of Users by Role";
    const idChart = document.getElementById("count_users_by_roles");
    const backgroundColor = "rgba(190, 54, 235, 0.2)";
    const borderColor = "rgb(205, 54, 235)";

    //enviar parámetros al constructor del gráfico
    barChart(etiquetas, valores, titulo, idChart, backgroundColor, borderColor);
  }
};

export { chart_count_users_by_rol };
