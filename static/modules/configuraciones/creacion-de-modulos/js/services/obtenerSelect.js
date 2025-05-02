import { actualizarSelectModules } from "../controllers/actualizarSelect.js";

const obtenerListaModulos = () => {
  fetch("/obtener_lista_modulos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        actualizarSelectModules(data.data, "selectModulo");
      } else {
        console.error("Error del servidor:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error al enviar el fetch:", error);
    });
};

const obtenerListaSubModulos = () => {
  document.getElementById("selectModulo").addEventListener("change", (event) => {
    const select = document.getElementById("selectSubModulo"); // Obtén el elemento <select>
    select.innerHTML = ""; // Limpia las opciones actuales
    document.getElementById("divSubModulos").style.display = "block";
    select.style.display = "block";

    const nombreModulo = document.getElementById("selectModulo").value; // Puedes obtenerlo desde un input si quieres
    console.log("lista submodulos", nombreModulo);
    if (nombreModulo != "") {
      fetch("/obtener_lista_sub_modulos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreModulo }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            actualizarSelectModules(data.data, "selectSubModulo");
          } else {
            console.error("Error del servidor:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error al enviar el fetch:", error);
        });
    } else {
      document.getElementById("divSubModulos").style.display = "none";
    }
  });
};

export { obtenerListaModulos, obtenerListaSubModulos };
