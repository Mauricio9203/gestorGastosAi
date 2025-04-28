import { notificationToastify, showProcessingToast } from "../../utils/notifications-toastify.js";
import { validateEmail } from "../../utils/validate-email.js";

const updateAccountData = () => {
  const saveButton = document.getElementById("save-data-user-settings");

  if (saveButton) {
    saveButton.addEventListener("click", async function () {
      const name = document.getElementById("userName-settings").value;
      const email = document.getElementById("userEmail-settings").value;
      const idUser = document.getElementById("idUser-settings").value;

      if (name == "" || email == "") {
        notificationToastify("Debe completar todos los campos", 3000, "bottom", "right", "info");
      } else {
        let validate = validateEmail(email);
        if (validate == false) {
          notificationToastify("Correo válido", 3000, "bottom", "right", "info");
        } else {
          document.getElementById("save-data-user-settings").disabled = true;
          await updateDataAccount(name, email, idUser);
          document.getElementById("save-data-user-settings").disabled = false;
        }
      }
    });
  }
};

const updateDataAccount = async (name, email, idUser) => {
  const payload = {
    table_name: "users",
    data: {
      username: name,
      email: email,
    },
    match: {
      id: idUser,
    },
  };
  showProcessingToast(true);
  await fetch("/update-user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // esto es clave
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        notificationToastify("Datos actualizados exitosamente.", 3000, "bottom", "right", "success");
        document.getElementById("user_name_welcome").textContent = `Welcome, ${name}!`;
        document.getElementById("modal-add-user-close-settings").click();
      } else {
        notificationToastify("Error del servidor: " + data.error, 3000, "bottom", "right", "danger");
        console.error("Error del servidor:", data.error);
      }
    })
    .catch((error) => console.error("Error en la solicitud:", error));

  showProcessingToast(false);
};

export { updateAccountData };
