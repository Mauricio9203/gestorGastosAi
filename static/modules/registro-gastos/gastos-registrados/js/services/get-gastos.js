const getGastos = async () => {
  console.log("obteniendo gastos");
  try {
    const response = await fetch("/boletas/list");
    const data = await response.json();

    console.log(data["boletas"]);
    return data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

export { getGastos };
