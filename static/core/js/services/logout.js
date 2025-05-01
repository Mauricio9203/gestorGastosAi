
const logout = async () => {
// Si el usuario confirma, hacemos la solicitud para cerrar sesión
fetch("/logout", {
    method: "GET",
  })
    .then((response) => {
      // Redirigir al login después de cerrar sesión
      window.location.href = "/login"; // Redirige al login
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
}

export {
    logout
}