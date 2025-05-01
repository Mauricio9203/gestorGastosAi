const clearInputValues = () => {
  document.querySelectorAll(".form-control").forEach((input) => (input.value = ""));
};

const clearForms = () => {
  // Seleccionar el modal por su ID
  const addUserModal = document.getElementById("addUserModal");
  if (addUserModal) {
    addUserModal.addEventListener("hidden.bs.modal", clearInputValues);
  }

  // Seleccionar el modal por su ID
  const changePasswordModal = document.getElementById("changePasswordModal");
  if (changePasswordModal) {
    changePasswordModal.addEventListener("hidden.bs.modal", clearInputValues);
  }
};

export { clearForms };
