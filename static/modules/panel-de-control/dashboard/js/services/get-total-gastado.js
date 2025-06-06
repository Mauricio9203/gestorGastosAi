import { validarFiltros } from "../controllers/filtros.js";

const getTotalGastado = async () => {
  let filtros = validarFiltros();
  let validacion = filtros["validacion"];

  if (validacion != false) {
    // Convertir el objeto filtros en string de parámetros de URL
    const queryString = new URLSearchParams(filtros).toString();
    try {
      const response = await fetch(`/dashboard/total_gastado?${queryString}`); // Aquí va la ruta del endpoint que llamará a tu API Flask
      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", response.status);
        return false;
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error al obtener el total de usuarios:", error);
    }
  } else {
    return "--";
  }
};

export { getTotalGastado };
