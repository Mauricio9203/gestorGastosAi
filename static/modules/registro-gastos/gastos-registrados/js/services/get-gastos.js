const getGastos = async () => {
  try {
    const response = await fetch("/boletas/list");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

export { getGastos };
