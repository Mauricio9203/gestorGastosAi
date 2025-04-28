import { disableButton, enableButton } from "../../utils/disable-enable-save-button.js";
import { notificationToastify } from "../../utils/notifications-toastify.js";
import { validateEmail } from "../../utils/validate-email.js";
import { addUser } from "../services/add-users.js";

const validateForm = () => {
  const addUserButton = document.getElementById("save-data-user");

  // datos formulario
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const paswword = document.getElementById("userPassword-addUser");
  const user_roles_modal = document.getElementById("user_roles_modal");

  addUserButton.addEventListener("click", async function () {
    if (userName.value === "" || userEmail.value === "" || paswword.value === "" || user_roles_modal.value === "") {
      notificationToastify("Debes completar todos los campos", 2000, "bottom", "right", "warning");
    } else {
      let checkEmail = validateEmail(userEmail.value);

      if (checkEmail == true) {
        const userData = {
          username: userName.value,
          email: userEmail.value,
          id_rol: user_roles_modal.value,
          password_hash: paswword.value,
        };

        disableButton("save-data-user");
        await addUser(userData);
        enableButton("save-data-user");
      } else {
        notificationToastify("El Email no tiene un formato válido.", 2000, "bottom", "right", "info");
      }
    }
  });
};

export { validateForm };
