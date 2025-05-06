import { ejecutarAcciones } from "./detectar-cambios-tabla-boletas.js";

const refrescarGraficos = async () => {
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", () => {
    document.getElementById("iconoRefres").classList.add("fa-spin");
    setTimeout(() => {
      document.getElementById("iconoRefres").classList.remove("fa-spin");
    }, 2000);
    ejecutarAcciones();
  });
};

export { refrescarGraficos };
