import { arrowSidebar } from "./components/arrow-sidebar.js";
import { openCloseSidebar } from "./components/open-close-sidebar.js";
import { recoverStateSidebar } from "./components/recover-state-sidebar.js";
import { scrollBehavior } from "./components/scroll-behavior.js";
import { detectClickOutside } from "./components/sidebarFlex.js";
import { logoutButton } from "./controllers/logout-button.js";
import { saveCollapseStates, restoreCollapseStates } from "../../utils/save-collapse-states.js";
import { updateAccountData } from "./controllers/update-account-data.js";
import { clearForms } from "../../modules/configuraciones/usuarios/js/utils/clear-forms.js";
import { changePassword } from "../../modules/configuraciones/usuarios/js/controllers/update-password.js";
import { getUserData, setUserData } from "./services/get-user-data.js";
import { showPassword } from "../../utils/showPassword.js";

window.addEventListener("load", function () {
  openCloseSidebar();
  recoverStateSidebar();
  arrowSidebar();
  scrollBehavior();
  logoutButton();
  detectClickOutside();
  saveCollapseStates();
  restoreCollapseStates();
  updateAccountData();
  clearForms();
  changePassword();
  setUserData();
  getUserData();
  showPassword("contraUser", "userPassword", "iconChangePassword");
});
