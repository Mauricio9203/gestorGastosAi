document.addEventListener("DOMContentLoaded", () => {
  addCustomActiveClass(); // Llama a la función cuando la página cargue
});

const addCustomActiveClass = () => {
  // Cambia estos valores según el enlace y la lista que quieras manejar
  const linkId = "dashboardLink";  // ID del enlace principal
  const subLinkId = "holaMundoLink";  // ID del subenlace
  const collapseId = "dashboard";  // ID de la lista que se expande

  // Obtener referencias de los elementos del DOM
  const link = document.getElementById(linkId);
  const subLink = document.getElementById(subLinkId);
  const collapse = document.getElementById(collapseId);

  // Añadir las clases personalizadas a los enlaces
  link.classList.add("custom-active");
  subLink.classList.add("custom-active-sub");

  // Si no está expandida, expandirla
  if (link.getAttribute("aria-expanded") !== "true") {
    link.setAttribute("aria-expanded", "true");
    collapse.classList.add("show");  // Muestra el contenido de la lista
  }
};

