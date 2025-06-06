const actualizarIngredientesMasivos = async (lista) => {
  try {
    const response = await fetch("/actualizacion-masiva-ingredientes-maestros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lista),
    });

    // Intentar parsear JSON de respuesta
    const data = await response.json();

    if (!response.ok) {
      // Si el backend envía error, lo mostramos
      throw new Error(data.error || `Error HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error al actualizar ingredientes masivos:", error);
    throw error;
  }
};

export { actualizarIngredientesMasivos };
