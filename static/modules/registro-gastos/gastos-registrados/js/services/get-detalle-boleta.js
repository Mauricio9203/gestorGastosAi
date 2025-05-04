const getDetalleBoleta = async (id_boleta) => {
  try {
    const response = await fetch(`/boletas/detalle_boleta?id_boleta=${id_boleta}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener detalle de boleta:", error);
  }
};

export { getDetalleBoleta };
