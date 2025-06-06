const updateMasivo = async (nombre_tabla, campo_actualizar, nuevo_valor, lista_ids) => {
  const data = {
    nombre_tabla: nombre_tabla,
    campo_actualizar: campo_actualizar,
    nuevo_valor: nuevo_valor,
    lista_ids: lista_ids,
  };

  try {
    const response = await fetch("/detalle_boleta/actualizacion_masiva_campo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("La respuesta de la red no fue satisfactoria");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al actualizar productos de forma masiva:", error);
    throw new Error("Ocurrió un error al actualizar los productos de forma masiva");
  }
};

export { updateMasivo };
