import { ejecutarAcciones } from "./detectar-cambios-tabla-boletas.js";

const refrescarGraficos = async () => {
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", () => {
    ejecutarAcciones();
  });
};

export { refrescarGraficos };
