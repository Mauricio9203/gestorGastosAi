import { showProcessingToast, notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { loadTableProducts } from "../controllers/load-table-products.js";

const sendFileToBackend = async (file) => {
  document.getElementById("div_carga_documento").classList.add("div-brillante");

  const extractDataBtn = document.getElementById("extractDataBtn");
  document.getElementsByClassName("filepond--file-action-button filepond--action-remove-item")[0].style.display = "none";
  // Cambiar texto y mostrar spinner
  extractDataBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Procesando imagen...`;
  extractDataBtn.disabled = true; // Opcional: deshabilitar mientras procesa

  document.getElementById("procesarDocumento").style.display = "none";

  showProcessingToast(true);
  const formData = new FormData();
  formData.append("file", file.file, file.file.name);

  try {
    const response = await fetch("/extraer_items", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      document.getElementsByClassName("filepond--file-action-button filepond--action-remove-item")[0].style.display = "block";

      notificationToastify("Operación exitosa.", 3000, "bottom", "right", "success");
      showProcessingToast(false);
      const responseData = await response.json();

      loadTableProducts(responseData);
      document.getElementById("div_carga_documento").classList.remove("div-brillante");
      document.getElementById("send_data_purchase").style.display = "block";
      document.getElementById("barra_progreso_carga").style.display = "none";

      extractDataBtn.innerHTML = `<i class="fas fa-magic mr-1"></i> Extraer datos`;
      extractDataBtn.disabled = false; // Opcional: deshabilitar mientras procesa
    } else {
      document.getElementsByClassName("filepond--file-action-button filepond--action-remove-item")[0].style.display = "block";
      document.getElementById("div_carga_documento").classList.remove("div-brillante");
      notificationToastify("Algo salió mal", 3000, "bottom", "right", "danger");
      showProcessingToast(false);
      extractDataBtn.innerHTML = `<i class="fas fa-magic mr-1"></i> Extraer datos`;
      extractDataBtn.disabled = false; // Opcional: deshabilitar mientras procesa
    }
  } catch (error) {
    document.getElementsByClassName("filepond--file-action-button filepond--action-remove-item")[0].style.display = "block";
    document.getElementById("div_carga_documento").classList.remove("div-brillante");
    showProcessingToast(false);
    notificationToastify("Error: " + error, 3000, "bottom", "right", "danger");
    extractDataBtn.innerHTML = `<i class="fas fa-magic mr-1"></i> Extraer datos`;
    extractDataBtn.disabled = false; // Opcional: deshabilitar mientras procesa
    console.error("Error:", error);
  }
};

export { sendFileToBackend };
