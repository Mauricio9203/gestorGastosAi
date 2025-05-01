const showPassword = (idToggle, idInputPassword, iconId) => {
  const togglePassword = document.getElementById(idToggle);
  const passwordInput = document.getElementById(idInputPassword);
  const icon = document.getElementById(iconId);

  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
};

export { showPassword };
