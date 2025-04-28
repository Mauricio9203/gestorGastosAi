import { showSpinner, hideSpinner } from "../../utils/spinners.js";
import { getTotalUsers } from "../services/get-total-users.js";

//get total users
const totalUsers = async () => {
  showSpinner("spinner_total_users", "total_users");
  let data = await getTotalUsers();
  hideSpinner("spinner_total_users", "total_users");
  if (data != false) {
    document.getElementById("total_users").innerText = data;
  } else {
    document.getElementById("total_users").innerText = "Error";
  }
};

export { totalUsers };
