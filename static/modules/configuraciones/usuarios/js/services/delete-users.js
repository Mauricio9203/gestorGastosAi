const deleteUsers = async (userData) => {
  try {
    const response = await fetch("/users/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: userData }),
    });

    if (!response.ok) {
      throw new Error("Error al eliminar usuarios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un error:", error);
    return null;
  }
};

export { deleteUsers };
