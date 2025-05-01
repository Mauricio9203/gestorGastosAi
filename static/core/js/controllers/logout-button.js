import { confirmAction } from "../../../utils/sweet-alerts/confirm-action.js";
import { logout } from "../services/logout.js";

const logoutButton = () => {
  const logoutBtn = document.getElementById("logoutBtn");
  let title = "¿Cerrar sesión?";
  let text = "Serás desconectado.";
  let icon = "warning";
  let confirmText = "Sí, cerrar sesión";
  let cancelText = "Cancelar";

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async function () {
      await confirmAction(logout, title, text, icon, confirmText, cancelText);
    });
  }
};

export { logoutButton };
