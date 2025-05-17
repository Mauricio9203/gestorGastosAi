const getComercio = async () => {
  const response = await fetch("/dashboard/lista_comercios", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los comercios");
  }
  return response.json();
};

export default getComercio;
