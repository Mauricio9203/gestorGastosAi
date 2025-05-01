// Función que detecta si se hace clic fuera de un div específico
const detectClickOutside = () => {
  // Obtener el div donde queremos detectar el click fuera
  const myDiv = document.getElementById("mobileSidebar");

  // Escuchar el evento de click en el documento
  document.addEventListener("click", (event) => {
    // Verificar si el div no tiene la clase 'hidden' (está visible) y si el click ocurrió fuera del div
    if (!myDiv.classList.contains("hidden") && !myDiv.contains(event.target)) {
      closeSidebarMobile(); // Llamar a la función para cerrar el sidebar
    }
  });
};

const closeSidebarMobile = () => {
  const sidebar = document.getElementById("sidbarMenu");
  sidebar.classList.add("hidden");
};

const openSidebarMobile = () => {
  const toggleAbrir = document.getElementById("toggleSidebarBtnMovil");

  // Agregar un detector de eventos para el click
  toggleAbrir.addEventListener("click", function () {
    const sidebar = document.getElementById("mobileSidebar");
    sidebar.classList.remove("hidden");
  });
};

export { detectClickOutside, openSidebarMobile };
