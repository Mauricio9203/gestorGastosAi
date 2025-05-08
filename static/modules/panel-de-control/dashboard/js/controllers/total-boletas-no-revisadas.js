import { showSpinner, hideSpinner } from "../../../../../utils/spinners.js";
import { getTotalBoletasNoRevisadas } from "../services/get-total-boletas-no-revisadas.js";
getTotalBoletasNoRevisadas;

//get total users
const totalBoletasNoRevisadas = async () => {
  let data = await getTotalBoletasNoRevisadas();

  if (data != false) {
    document.getElementById("cantidad-boletas-no-revisadas").innerText = data;
  } else {
    document.getElementById("cantidad-boletas-no-revisadas").innerText = "0";
  }
};

export { totalBoletasNoRevisadas };
