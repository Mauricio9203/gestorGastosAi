const getInsumosMaestros = async () => {
  try {
    const response = await fetch("/productos-registrados/select-insumo-maestro");
    const data = await response.json();

    const insumos = data.ingredientes_maestros || [];

    console.log("Insumos maestros:", insumos);
    return insumos;
  } catch (error) {
    console.error("Error al obtener insumos maestros:", error);
    return [];
  }
};

export { getInsumosMaestros };
