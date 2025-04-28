const getUsers = async () => {
  try {
    const response = await fetch("/users/list");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

export { getUsers };
