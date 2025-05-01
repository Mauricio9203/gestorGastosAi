import { updateFieldUser } from "../services/update-field-user.js";
import { verifyDuplicatedEmail } from "../controllers/verify-duplicated-email.js";
import { notificationToastify } from "../../../../../utils/notifications-toastify.js";

const tableEvents = (table) => {
  // Evento para cuando una celda sea editada
  table.on("cellEdited", function (cell) {
    let value = cell.getValue();
    let idUser = cell.getRow().getData().id;
    let fieldName = cell.getField();

    //modificar rol
    if (fieldName == "user_roles.rol_name") {
      let roles = {
        Admin: 1,
        Editor: 3,
        Viewer: 5,
        Moderator: 6,
      };

      updateFieldUser(idUser, "id_rol", roles[value]);
    } else if (fieldName == "email") {
      verifyDuplicatedEmail(idUser, fieldName, value, cell);
    } else {
      if (value == "") {
        notificationToastify(`El campo ${fieldName} no puede estar vacío`, 3000, "bottom", "right", "warning");
        cell.restoreOldValue();
      } else {
        updateFieldUser(idUser, fieldName, value);
      }
    }
  });

  //eventos al seleccionar rows
  table.on("rowSelectionChanged", function (data) {
    if (data.length > 0) {
      document.getElementById("delete-rows").style.display = "block";
    } else {
      document.getElementById("delete-rows").style.display = "none";
    }
  });
};

export { tableEvents };
