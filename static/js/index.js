document.addEventListener("DOMContentLoaded", () => {
    addCustomActiveClass(); // Llama a la función cuando la página cargue
  });
  
  const addCustomActiveClass = () => {
    // Cambia estos valores según el enlace y la lista que quieras manejar
    const linkId = "dashboardLink";  // ID del enlace principal
    const subLinkId = "overviewLink";  // ID del subenlace
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


  document.addEventListener("DOMContentLoaded", function () {
    const salesCtx = document.getElementById("salesChart").getContext("2d");
    const usersCtx = document.getElementById("usersChart").getContext("2d");
    const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");
    const barCtx = document.getElementById("barChart").getContext("2d");
  
    // Gráfico de barras - Ventas
    new Chart(salesCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales",
            data: [120, 190, 300, 500, 200, 300],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  
    // Gráfico de línea - Usuarios activos
    new Chart(usersCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Active Users",
            data: [50, 75, 100, 125, 150, 200],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  
    // Gráfico de dona - Distribución de Ventas
    new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: ["Producto A", "Producto B", "Producto C"],
        datasets: [
          {
            data: [300, 500, 200],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  
    // Gráfico de barras - Comparación de Productos
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Producto A", "Producto B", "Producto C"],
        datasets: [
          {
            label: "Ventas",
            data: [120, 450, 300],
            backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(153, 102, 255, 0.5)", "rgba(255, 159, 64, 0.5)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  });
  
  
