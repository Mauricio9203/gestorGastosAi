//esto inicia la función que abre y cierra el navbar
const openCloseSidebar = () => {
  document.getElementById("toggleSidebarBtn").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebarMenu");
    const icon = this.querySelector("i");

    // Si el sidebar ya tiene la clase 'hidden', no hacemos animación
    if (sidebar.classList.contains("hidden")) {
      sidebar.classList.remove("hidden");
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-chevron-left");

      // Añadir la clase de transición para la animación
      sidebar.classList.add("transition-hidden");

      // Guardar el estado en localStorage
      localStorage.setItem("sidebarHidden", "false");

      // Esperar un tiempo para permitir la animación antes de cambiar la clase de transición
      setTimeout(() => {
        sidebar.classList.remove("transition-hidden");
      }, 300); // Aquí ajustas el tiempo según la duración de tu animación
    } else {
      sidebar.classList.add("hidden");
      icon.classList.remove("fa-chevron-left");
      icon.classList.add("fa-bars");

      // Añadir la clase de transición para la animación
      sidebar.classList.add("transition-hidden");

      // Guardar el estado en localStorage
      localStorage.setItem("sidebarHidden", "true");

      // Esperar un tiempo para permitir la animación antes de cambiar la clase de transición
      setTimeout(() => {
        sidebar.classList.remove("transition-hidden");
      }, 300); // Ajusta este tiempo si es necesario
    }
  });
};

export { openCloseSidebar };
