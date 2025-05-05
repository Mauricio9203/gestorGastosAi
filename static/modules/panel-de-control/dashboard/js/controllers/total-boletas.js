import { showSpinner, hideSpinner } from "../../../../../utils/spinners.js";
import { getTotalReceipts } from "../services/get-total-receipts.js";

//get total users
const totalReceipts = async () => {
  let data = await getTotalReceipts();

  if (data != false) {
    document.getElementById("total-receipts").innerText = data;
  } else {
    document.getElementById("total-receipts").innerText = "-";
  }
};

export { totalReceipts };
