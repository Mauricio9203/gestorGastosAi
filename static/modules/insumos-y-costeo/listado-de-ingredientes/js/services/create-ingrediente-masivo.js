const createIngredientesNuevosMasivo = async (ingredientes) => {
  try {
    const response = await fetch("/ingredientes-nuevos-insercion-masiva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredientes),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al insertar ingredientes");
    }

    return data.insertados;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

export { createIngredientesNuevosMasivo };
