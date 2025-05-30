const updateDetalleBoleta = async (id_detalle_boleta, campo, valor) => {
  try {
    const response = await fetch("/detalle_boleta/updateFields", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_detalle_boleta,
        campo,
        valor,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Error al actualizar detalle boleta");

    return data; // contiene message y boleta
  } catch (error) {
    console.error("Error en updateDetalleBoleta:", error);
    return { error: error.message };
  }
};

export { updateDetalleBoleta };
