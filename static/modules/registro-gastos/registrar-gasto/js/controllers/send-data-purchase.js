import { notificationToastify, showProcessingToast } from "../../../../../utils/notifications-toastify.js";
import { addBoleta, addDetalleBoleta } from "../services/add-boleta.js";
import { sendFileUpload } from "../services/upload-file.js";
import { disableButtonsItems, enableButtonsItems } from "../utils/disable-buttons.js";

// Función principal para manejar la carga y obtención de la URL
const sendDataPurchase = async (file, tableProducts) => {
  document.getElementById("send_data_purchase").style.display = "block";
  document.getElementById("barra_progreso_carga").style.display = "block";

  document.getElementById("progress_bar_items").classList.add("progress-bar-animated");
  disableButtonsItems();
  showProcessingToast(true);
  // Espera la URL del archivo cargado
  actualizarProgreso("Guardando archivo de la boleta...", 0);
  let url_imagen = await sendFileUpload(file);

  // Otras operaciones
  let fecha = document.getElementById("fechaBoleta").value ?? null;
  let comercio = document.getElementById("comercioBoleta").value ?? null;
  let rut = document.getElementById("rutBoleta").value ?? null;
  let totalBoletaBruto = document.getElementById("totalBoletaBruto").value ?? null;
  let totalBoletaNeto = document.getElementById("totalBoletaNeto").value ?? null;
  let porcentajeIva = document.getElementById("porcentajeIva").value ?? null;
  let boletaRevisada = document.getElementById("checkboxRevisado").checked ? true : false;

  const boletaData = {
    fecha_boleta: fecha,
    nombre_comercio: comercio,
    rut_comercio: rut,
    total_neto: isNaN(parseFloat(totalBoletaNeto)) ? 0.0 : parseFloat(totalBoletaNeto), // Validación para float
    total_bruto: isNaN(parseFloat(totalBoletaBruto)) ? 0.0 : parseFloat(totalBoletaBruto), // Validación para float
    porcentaje_iva: isNaN(parseFloat(porcentajeIva)) ? 0.0 : parseFloat(porcentajeIva), // Validación para float
    confirmacion_revision: boletaRevisada,
    url_boleta: url_imagen,
  };

  actualizarProgreso("Creando Boleta...", 40);
  let boleta = await addBoleta(boletaData);
  let id_boleta = boleta["boleta"][0]["id"];

  let dataItems = refactorizarItems(tableProducts.getData(), id_boleta);
  actualizarProgreso("Agreando items a la boleta...", 80);
  let detalle_boleta = await addDetalleBoleta(dataItems);

  actualizarProgreso("Proceso completado", 100);

  notificationToastify("La boleta o factura ha sido cargada con éxito.", 2000, "bottom", "right", "success");
  showProcessingToast(false);
  setTimeout(() => {
    notificationToastify("Reestableciendo módulo...", 2000, "bottom", "right", "info");
  }, 2000);

  document.getElementById("progress_bar_items").style.backgroundColor = "#198754";

  document.getElementById("progress_bar_items").classList.remove("progress-bar-animated");

  document.getElementById("send_data_purchase").style.display = "none";

  setTimeout(() => {
    document.getElementById("progress_bar_items").style.backgroundColor = "#6f42c1";
    document.getElementById("barra_progreso_carga").style.display = "none";
    actualizarProgreso("Subiendo archivo...", 0);
    const boton = document.querySelector(".filepond--file-action-button.filepond--action-remove-item");
    enableButtonsItems();
    // Verificamos si el botón existe antes de hacer el clic
    if (boton) {
      boton.click();
    }
  }, 4000);
};

const refactorizarItems = (items, id_boleta) => {
  // Verificar si 'items' es un arreglo antes de procesarlo
  if (!Array.isArray(items)) {
    console.error("Error: 'items' no es un arreglo");
    return [];
  }

  // Refactorizamos los items y los envolvemos en el formato esperado por Supabase
  return items.map((item) => ({
    nombre_item: item.producto ?? "Desconocido", // Si el producto está vacío, asignar 'Desconocido'
    precio_total: isNaN(parseFloat(item.precio_total)) ? 0.0 : parseFloat(item.precio_total),
    nombre_categoria: item.categoria ?? "Sin categoría", // Si la categoría está vacía, asignar 'Sin categoría'
    nombre_generico: item.nombre_generico ?? "Sin nombre genérico", // Si el nombre genérico está vacío, asignar 'Sin nombre genérico'
    cantidad: isNaN(parseInt(item.cantidad_items)) ? 0 : parseInt(item.cantidad_items),
    precio_unitario: isNaN(parseFloat(item.precio_unitario)) ? 0.0 : parseFloat(item.precio_unitario),
    cantidad_contenido_unidad: isNaN(parseFloat(item.cantidad_contenido)) ? 0.0 : parseFloat(item.cantidad_contenido),
    unidad_medida: item.unidad_medida ?? "Unidad desconocida",
    id_boleta: parseInt(id_boleta), // El id de la boleta que se le asignará a cada item
  }));
};

const actualizarProgreso = (mensaje, porcentaje) => {
  const progressBar = document.getElementById("progress_bar_items");
  const estadoProceso = document.getElementById("estado_proceso");

  if (progressBar) {
    progressBar.style.width = `${porcentaje}%`;
    progressBar.setAttribute("aria-valuenow", porcentaje);
  }

  if (estadoProceso) {
    estadoProceso.textContent = mensaje;
  }
};

export { sendDataPurchase };
