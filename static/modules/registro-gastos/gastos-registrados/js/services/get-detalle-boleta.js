const getDetalleBoleta = async (id_boleta) => {
  console.log("obteniendo gastos boleta: " + id_boleta);
  try {
    const response = await fetch("/boletas/detalle_boleta");
    const data = await response.json();

    console.log(data["detalle_boleta"]);
    return data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

export { getDetalleBoleta };
