import { validarFiltros } from "../controllers/filtros.js";

const getTotalGastoPorCategoria = async () => {
  let filtros = validarFiltros();
  let validacion = filtros["validacion"];
  console.log(validacion);
  if (validacion != false) {
    const queryString = new URLSearchParams(filtros).toString();
    try {
      const response = await fetch(`/dashboard/total_gastado_por_categoria?${queryString}`);

      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", response.status);
        return false;
      }

      const data = await response.json();
      console.log("Data de gasto por categoria:", data);

      if (!Array.isArray(data) || data.length === 0) {
        let datos = [
          {
            nombre_categoria: "Sin datos",
            total_gastado: 0,
          },
        ];
        return datos;
      }

      return data;
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      return false;
    }
  }
};

export { getTotalGastoPorCategoria };
