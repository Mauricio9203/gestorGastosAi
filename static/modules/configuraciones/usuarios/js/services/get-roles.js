const getRoles = async () => {
  try {
    const response = await fetch("/rol_users/list");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener Roles:", error);
    return [];
  }
};

export { getRoles };
