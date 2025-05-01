import { getRoles } from "../services/get-roles.js";

const selectRoles = async () => {
  const userRolesSelect = document.getElementById("user_roles_modal");
  if (!userRolesSelect) return;

  const data = await getRoles();

  // Crear opción por defecto
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = "Select Rol";
  firstOption.disabled = true;
  firstOption.selected = true;
  userRolesSelect.appendChild(firstOption);

  // Agregar opciones de roles
  data.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.rol_name;
    userRolesSelect.appendChild(option);
  });
};

export { selectRoles };
