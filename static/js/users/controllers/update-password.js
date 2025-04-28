import { enableButton, disableButton } from "../../utils/disable-enable-save-button.js";
//import { notificationToastify } from "../../utils/notifications-toastify.js";
import { updatePassword } from "../services/update-password.js";

const changePassword = () => {
  const botonGuardar = document.getElementById("updatePasswordModal");

  // Asociar el evento click al botón
  botonGuardar.addEventListener("click", async function () {
    const idUsuario = document.getElementById("users-modal-id-usuario");
    const userPassword = document.getElementById("userPassword");
    disableButton("updatePasswordModal");
    var updatePass = await updatePassword(idUsuario.value, userPassword.value);
    enableButton("updatePasswordModal");

    // Obtener el botón con el ID 'cancelChangePasswordModal'
    const botonCancelar = document.getElementById("cancelChangePasswordModal");

    if (updatePass == true) {
      botonCancelar.click();
    }
  });
};

export { changePassword };
