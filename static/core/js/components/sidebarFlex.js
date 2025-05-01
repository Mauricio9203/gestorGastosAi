const detectClickOutside = () => {
  const myDiv = document.getElementById("sidebarMenu"); // Seleccionamos el div del sidebar
  const toggleButtons = document.getElementsByClassName("toggleSidebarBtn"); // Seleccionamos todos los botones para abrir el sidebar

  // Función que verifica si la pantalla está en el tamaño adecuado (max-width: 767px)
  const isMobile = () => window.innerWidth <= 767;

  // Agregar un "event listener" al documento para detectar clics solo si estamos en dispositivos móviles
  document.addEventListener("click", (event) => {
    if (isMobile()) {
      // Solo ejecutamos la lógica si estamos en el rango adecuado
      // Verificar si el clic ocurrió fuera del div y no en el botón que abre el sidebar
      if (!myDiv.contains(event.target) && !Array.from(toggleButtons).includes(event.target)) {
        let checkOpen = checkIfHasClass();

        if (!checkOpen) {
          // Cierra el sidebar simulando un clic en el primer botón
          toggleButtons[0].click();
        }
      }
    }
  });
};

// Función que verifica si el div tiene la clase 'hidden'
const checkIfHasClass = () => {
  const sidebar = document.getElementById("sidebarMenu"); // Obtener el div
  // Verificar si el div tiene la clase 'hidden'
  return sidebar.classList.contains("hidden");
};

export { detectClickOutside };
