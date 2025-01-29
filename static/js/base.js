document
  .getElementById("toggleSidebarBtn")
  .addEventListener("click", function () {
    const sidebar = document.getElementById("sidebarMenu");
    const icon = this.querySelector("i");

    // Si el sidebar ya tiene la clase 'hidden', no hacemos animación
    if (sidebar.classList.contains("hidden")) {
      sidebar.classList.remove("hidden");
      icon.classList.remove("fa-chevron-right");
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
      icon.classList.add("fa-chevron-right");

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

// Recuperar el estado del sidebar cuando se carga la página
window.addEventListener("load", function () {
  const sidebar = document.getElementById("sidebarMenu");
  const icon = document.getElementById("toggleSidebarBtn").querySelector("i");

  const sidebarHidden = localStorage.getItem("sidebarHidden");

  if (sidebarHidden === "true") {
    sidebar.classList.add("hidden");
    icon.classList.remove("fa-chevron-left");
    icon.classList.add("fa-chevron-right");
  } else {
    sidebar.classList.remove("hidden");
    icon.classList.remove("fa-chevron-right");
    icon.classList.add("fa-chevron-left");
  }
});

// Cambiar el estado de visibilidad al hacer clic en un enlace de la clase nav-link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Cambiar el estado del sidebar a visible
    localStorage.setItem("sidebarHidden", "false");

    // Asegurarse de que el sidebar se muestre al hacer clic en cualquier nav-link
    const sidebar = document.getElementById("sidebarMenu");
    const icon = document.getElementById("toggleSidebarBtn").querySelector("i");
    sidebar.classList.remove("hidden");
    icon.classList.remove("fa-chevron-right");
    icon.classList.add("fa-chevron-left");
  });
});

document.getElementById("dashboardLink").addEventListener("click", function () {
  const arrow = document.getElementById("dashboardArrow");

  if (arrow.classList.contains("fa-angle-down")) {
    arrow.classList.remove("fa-angle-down");
    arrow.classList.add("fa-angle-up");
  } else {
    arrow.classList.remove("fa-angle-up");
    arrow.classList.add("fa-angle-down");
  }
});

// Mostrar el botón al hacer scroll
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Volver al inicio al hacer clic
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//cierre de sesión
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Mostramos la confirmación con SweetAlert2
      swal
        .fire({
          title: "¿Estás seguro?",
          text: "Se cerrará tu sesión.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, cerrar sesión",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
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
        });
    });
  }
});

const cargarTabla = (tableData, tablaId) => {
  // Destruir la instancia de DataTable antes de volver a inicializarla
  if ($.fn.dataTable.isDataTable("#" + tablaId)) {
    $("#" + tablaId)
      .DataTable()
      .destroy();
  }

  $("#" + tablaId).DataTable({
    data: tableData,
    responsive: true,
    language: {
      sEmptyTable: "No hay datos disponibles",
      sInfo: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      sInfoEmpty: "Mostrando 0 a 0 de 0 entradas",
      sInfoFiltered: "(filtrado de _MAX_ entradas en total)",
      sLengthMenu: "Mostrar _MENU_ entradas",
      sLoadingRecords: "Cargando...",
      sProcessing: "Procesando...",
      sSearch: "Buscar:",
      sZeroRecords: "No se encontraron resultados",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
    },
  });
};


const convertirFecha = (fechaStr) => new Date(fechaStr).toLocaleString();