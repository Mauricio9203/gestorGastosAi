import { ejecutarAcciones } from "./detectar-cambios-tabla-boletas.js";

const refrescarGraficos = async () => {
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", () => {
    ejecutarAcciones("", "", "");
  });

  const filtrar = document.getElementById("btn-filtrar-fechas");
  filtrar.addEventListener("click", () => {
    ejecutarAcciones("", "", "");
    document.getElementById("icono_filtrar").classList.add("fa-flip");
    setTimeout(() => {
      document.getElementById("icono_filtrar").classList.remove("fa-flip");
    }, 2000);
  });
};

export { refrescarGraficos };
