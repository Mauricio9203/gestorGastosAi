import { notificationToastify, showProcessingToast } from "../../utils/notifications-toastify.js";
import { validateEmail } from "../../utils/validate-email.js";
import { getVerifyDuplicatedEmail } from "../services/get-verify-duplicated-email.js";
import { updateFieldUser } from "../services/update-field-user.js";

const verifyDuplicatedEmail = async (idUser, fieldName, value, cell) => {
  let emailFormat = validateEmail(value);

  if (emailFormat == false) {
    notificationToastify("El correo electrónico debe tener un formato válido como: ejemplo@dominio.com", 3000, "right", "center", "info");
    cell.restoreOldValue();
  } else {
    showProcessingToast(true);
    let verificacion = await getVerifyDuplicatedEmail(value); //true duplicado, false, no duplicado, error
    showProcessingToast(false);
    if (verificacion == true) {
      notificationToastify("El Email ingresado ya existe, debe ingresar uno diferente.", 3000, "right", "center", "warning");
      cell.restoreOldValue();
    }

    if (verificacion == false) {
      updateFieldUser(idUser, fieldName, value);
    }

    if (verificacion == "error") {
      notificationToastify("Ha ocurrido un error en la actualización.", 3000, "bottom", "right", "danger");
      cell.restoreOldValue();
    }
  }
};

export { verifyDuplicatedEmail };
