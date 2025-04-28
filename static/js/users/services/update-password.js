import { notificationToastify, showProcessingToast } from "../../utils/notifications-toastify.js";

const updatePassword = async (userId, newPassword) => {
  showProcessingToast(true);

  // Limpiar la contraseña de espacios en blanco al principio y al final
  const trimmedPassword = newPassword.trim() || "valorPorDefecto";
  if (trimmedPassword === "valorPorDefecto") {
    notificationToastify("La contraseña no puede ser vacía", 3000, "bottom", "right", "info");
    showProcessingToast(false);
    return false;
  } else {
    try {
      const response = await fetch("/actualizar_contrasena", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          nueva_contrasena: newPassword,
        }),
      });

      const data = await response.json();

      // Verificar que 'message' esté presente para un éxito
      if (data.message) {
        notificationToastify("Contraseña Actualizada", 2000, "bottom", "right", "success");
        showProcessingToast(false);
        return true; // Retornar true si la respuesta contiene 'message'
      } else if (data.error) {
        notificationToastify(data.error, 3000, "bottom", "right", "danger"); // Notificación de error
        showProcessingToast(false);
        return false; // Retornar false si la respuesta contiene 'error'
      } else {
        // Si la respuesta no tiene 'message' ni 'error', retornar false por defecto
        notificationToastify("Hubo un error inesperado.", 3000, "bottom", "right", "danger");
        showProcessingToast(false);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      showProcessingToast(false);
      notificationToastify("Error al intentar actualizar la contraseña.", 3000, "bottom", "right", "danger");
      return false; // En caso de error, retornar false
    }
  }
};

export { updatePassword };
