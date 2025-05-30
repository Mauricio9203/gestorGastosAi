const getProductosCargados = async () => {
  console.log("Fetching productos cargados...");
  try {
    const response = await fetch("/productos-registrados/detalle-boleta?id_usuario=131&p_solo_nulos=false");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log("Productos Cargados:", data.detalle_boleta);

    return data.detalle_boleta;
  } catch (error) {
    console.error("Error fetching detalle boleta:", error);
  }
};

//esto es para obtener los ingredientes maestros detalle boleta y cargarlo en la lista desplegable de ingredientes maestros
const getIngredientesMaestrosDetalleBoleta = async () => {
  try {
    const response = await fetch("/ingredientes-maestros-detalle-boleta");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Ingredientes Maestros Detalle Boleta:", data);
    return data;
  } catch (error) {
    console.error("Error fetching ingredientes maestros detalle boleta:", error);
  }
};

export { getProductosCargados, getIngredientesMaestrosDetalleBoleta };
