import { confirmAction } from "../../utils/sweet-alerts/confirm-action.js";
import { logout } from "../services/logout.js";

const logoutButton = () => {
    const logoutBtn = document.getElementById("logoutBtn");
    let title ="You're sure?"
    let text="You will be logged out."
    let icon="warning"
    let confirmText="Yes, log out"
    let cancelText="Cancel"
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click",async function () {
        await confirmAction(logout,title,text,icon,confirmText,cancelText)
      });
    }
 }

 export {
    logoutButton
 }