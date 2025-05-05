import { showSpinner, hideSpinner } from "../../../../../utils/spinners.js";
import { getTotalGastado } from "../services/get-total-gastado.js";

//get total users
const totalGastado = async () => {
  let data = await getTotalGastado();

  if (data != false) {
    document.getElementById("total-spent").innerText = "$ " + data;
  } else {
    document.getElementById("total-spent").innerText = "-";
  }
};

export { totalGastado };
