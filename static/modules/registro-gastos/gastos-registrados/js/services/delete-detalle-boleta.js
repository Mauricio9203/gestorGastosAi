const deleteDetalleBoletas = async (datos) => {
  try {
    const response = await fetch("/boletas/eliminar_detalle_boleta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const resultado = await response.json();

    if (response.ok) {
      return resultado.eliminadas;
    } else {
      console.error("❌ Error en la solicitud:", resultado.error || resultado);
    }
  } catch (error) {
    console.error("❌ Error al eliminar boletas:", error);
  }
};

export { deleteDetalleBoletas };
