import { notificationToastify, showProcessingToast } from "../../../../../utils/notifications-toastify.js";
import { table } from "../controllers/load-table.js";

const updateFieldUser = async (userId, campo, valor) => {
  showProcessingToast(true);
  try {
    const response = await fetch(`/users/updateFields/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campo: campo,
        valor: valor,
      }),
    });

    const data = await response.json();

    let dataUser = data.user[0];

    // Extraer solo los campos esperados
    const { id, username, created_at, updated_at, id_rol, email, password_hash } = dataUser; // reemplaza con tus campos reales
    const cleanData = { id, username, created_at, updated_at, id_rol, email };

    //actualizar solo la fila que se editó
    table.updateData([cleanData]); // solo actualiza la fila con los datos limpios

    if (!response.ok) {
      showProcessingToast(false);
      throw new Error(data.error || "Error al actualizar usuario");
    }

    showProcessingToast(false);
    notificationToastify(campo + " actualizado", 3000, "bottom", "right", "success");

    return data;
  } catch (error) {
    showProcessingToast(false);
    console.error("Error:", error.message);
    return { error: error.message };
  }
};

export { updateFieldUser };
