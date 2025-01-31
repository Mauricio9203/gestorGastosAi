document.addEventListener("DOMContentLoaded", () => {
  addCustomActiveClass(); // Llama a la función cuando la página cargue

  chart_count_users_by_rol();
  totalUsers()
});

const addCustomActiveClass = () => {
  // Cambia estos valores según el enlace y la lista que quieras manejar
  const linkId = "dashboardLink"; // ID del enlace principal
  const subLinkId = "overviewLink"; // ID del subenlace
  const collapseId = "dashboard"; // ID de la lista que se expande

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
    collapse.classList.add("show"); // Muestra el contenido de la lista
  }
};


// Función de flecha para cargar los datos desde el servidor Flask
const chart_count_users_by_rol = async () => {
  document.getElementById("spinner_count_by_rol").style.display = "block";
  document.getElementById("count_users_by_roles").style.display = "none";
  
  try {
    // Hacer una solicitud GET al endpoint
    const response = await fetch("/dashboard/dashboard_roles");
    const data = await response.json();

    // Verificar que haya datos para mostrar
    if (!data || data.length === 0) {
      console.log("No hay datos para cargar en el gráfico");
      document.getElementById("spinner_count_by_rol").style.display = "none";
      document.getElementById("count_users_by_roles").style.display = "block";
      return;
    }

    document.getElementById("spinner_count_by_rol").style.display = "none";
    document.getElementById("count_users_by_roles").style.display = "block";

    // Extraer etiquetas y valores del response (ajusta esto según tu respuesta real)
    const etiquetas = data.map((item) => item.rol_name); // Ajusta 'rol_name' según tu respuesta
    const valores = data.map((item) => item.total_usuarios); // Ajusta 'total_usuarios' según tu respuesta

    // Configurar y renderizar el gráfico
    new Chart(document.getElementById("count_users_by_roles"), {
      type: "bar", // Tipo de gráfico: barras
      data: {
        labels: etiquetas, // Etiquetas del gráfico
        datasets: [
          {
            label: "Number of Users by Role", // Título del dataset
            data: valores, // Valores del gráfico
            backgroundColor: "rgba(190, 54, 235, 0.2)", // Color de las barras
            borderColor: "rgb(205, 54, 235)", // Color del borde
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
          // Agregar plugin de dataLabels solo para mostrar números
          datalabels: {
            color: "gray", // Color del texto dentro de las barras
            align: "center", // Alinear el texto al centro de las barras
            anchor: "center", // Anclar el texto al centro
            font: {
              weight: "bold", // Estilo del texto (negrita)
              size: 14, // Tamaño del texto
            },
            formatter: (value) => value, // Mostrar solo el valor numérico
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      plugins: [ChartDataLabels], // Asegúrate de incluir el plugin ChartDataLabels
    });
  } catch (error) {
    document.getElementById("spinner_count_by_rol").style.display = "none";
    document.getElementById("count_users_by_roles").style.display = "block";
    console.error("Error al cargar los datos:", error);
  }
};

//get total users
const totalUsers = async () => {
  document.getElementById("spinner_total_users").style.display = "block";
  document.getElementById("total_users").style.display = "none";
  try {
    const response = await fetch("/dashboard/count_users"); // Aquí va la ruta del endpoint que llamará a tu API Flask
    const data = await response.json();

    document.getElementById("spinner_total_users").style.display = "none";
    document.getElementById("total_users").style.display = "block";

    document.getElementById("total_users").innerText = data;
  } catch (error) {
    console.error("Error al obtener el total de usuarios:", error);

  }
};