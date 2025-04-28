import { notificationToastify, showProcessingToast } from "../../utils/notifications-toastify.js";
import { loadTable } from "../controllers/load-table.js";

const addUser = async (userData) => {
  showProcessingToast(true);
  await fetch("/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      showProcessingToast(false);
      if (data.error) {
        if (data.error.includes("El email ya está registrado")) {
          notificationToastify("The email is already registered in the system.", 3000, "bottom", "right", "warning");
        } else {
          notificationToastify(`Error: ${data.error}`, 3000, "bottom", "right", "danger");
        }
      } else {
        notificationToastify("User added successfully", 2000, "bottom", "right", "success");
        loadTable();
        document.getElementById("modal-add-user-close").click();
      }
    })
    .catch((error) => {
      showProcessingToast(false);
      console.error("Error:", error);
      notificationToastify("There was a problem adding the user.", 3000, "bottom", "right", "danger");
    });
};

export { addUser };
