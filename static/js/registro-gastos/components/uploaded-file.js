import { notificationToastify, showProcessingToast } from "../../utils/notifications-toastify.js";
import { tableProducts } from "../controllers/load-table-products.js";
import { sendDataPurchase } from "../controllers/send-data-purchase.js";
import { sendFileToBackend } from "../services/send-file-backend.js";
import { disableButtonsItems, enableButtonsItems } from "../utils/disable-buttons.js";

// Inicializar FilePond
const setupFilePond = () => {
  const inputElement = document.getElementById("fileUpload");
  document.getElementById("fileUpload").style.display = "block";

  return FilePond.create(inputElement, {
    acceptedFileTypes: ["image/*", "application/pdf"],
    labelIdle: "Arrastra y suelta tu archivo o haz clic para cargar",
    labelInvalidField: "El archivo no es válido",
  });
};

// Manejar la adición de archivos
const handleFileAdd = (file, pond, viewerRef) => {
  if (!file) return;

  const fileType = file.file.type;
  const allowedTypes = ["image/", "application/pdf"];

  if (!allowedTypes.some((type) => fileType.startsWith(type))) {
    pond.removeFile(file.id);
    notificationToastify("Solo se permiten imágenes o archivos PDF.", 3000, "bottom", "right", "info");
    return;
  }

  document.getElementById("procesarDocumento").style.display = "block";

  if (fileType.startsWith("image/")) {
    initializeViewer(file, "image", viewerRef);
  } else if (fileType === "application/pdf") {
    initializeViewer(file, "pdf", viewerRef);
  }
};

// Manejar la eliminación de archivos
const handleFileRemove = (viewerRef) => {
  disableButtonsItems();
  //limpiar y deshabilitar cuando se quita la imagen
  document.getElementById("procesarDocumento").style.display = "none";
  document.getElementById("previewImage").style.display = "none";
  document.getElementById("previewPdf").style.display = "none";
  document.getElementById("data_preview").style.display = "none";
  document.querySelectorAll(".form-control").forEach((input) => {
    input.value = "";
  });

  if (tableProducts && typeof tableProducts.clearData === "function") {
    tableProducts.clearData();
  }

  // Asegúrate de destruir la vista antes de eliminarla
  if (viewerRef.current) {
    viewerRef.current.destroy();
    viewerRef.current = null; // Asegúrate de que la referencia sea null después de destruirla
  }
};

// Inicializar Viewer.js
const initializeViewer = (file, type, viewerRef) => {
  if (type === "image") {
    enableButtonsItems();
    const img = document.getElementById("previewImage");
    img.src = URL.createObjectURL(file.file);
    img.style.display = "block";

    // Si ya existe un visor, destruirlo antes de crear uno nuevo
    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
    }

    // Crear un nuevo visor
    viewerRef.current = new Viewer(img, { navbar: false, toolbar: true, title: false });

    img.onclick = () => viewerRef.current.show();
    document.getElementById("procesarDocumento").style.display = "block";
  } else if (type === "pdf") {
    enableButtonsItems();
    const pdfContainer = document.getElementById("previewPdf");
    pdfContainer.src = URL.createObjectURL(file.file);
    pdfContainer.style.display = "block";
    document.getElementById("procesarDocumento").style.display = "block";
  }
};

// Configurar el botón de carga de datos
const setupUploadButton = (pond) => {
  const uploadButton = document.getElementById("extractDataBtn");
  uploadButton.addEventListener("click", async () => {
    const file = pond.getFiles()[0];
    if (file) {
      await sendFileToBackend(file);
      document.getElementById("data_preview").style.display = "block";
    } else {
      document.getElementById("data_preview").style.display = "none";
      notificationToastify("Por favor, selecciona un archivo para enviar.", 3000, "bottom", "right", "warning");
    }
  });

  const uploadFile = document.getElementById("send_data_purchase");
  uploadFile.addEventListener("click", async () => {
    const file_upload = pond.getFiles()[0];
    if (file_upload) {
      await sendDataPurchase(file_upload, tableProducts);
    } else {
      notificationToastify("Ocurrió un error al intentar subir el archivo.", 3000, "bottom", "right", "danger");
    }
  });
};

// Función principal
const uploadedFile = async () => {
  // Usamos una referencia para el visor
  const viewerRef = { current: null };
  const pond = setupFilePond();

  pond.on("addfile", (error, file) => {
    if (!error) handleFileAdd(file, pond, viewerRef);
  });

  pond.on("removefile", () => handleFileRemove(viewerRef));

  setupUploadButton(pond);
};

export { uploadedFile, setupFilePond };
