import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { createDetalleBoleta } from "../services/create-item-detalle-boleta.js";

const cargarItemBoleta = () => {
  document.getElementById("agregarItem").addEventListener("click", function () {
    let nombreItem = document.getElementById("nombreItem").value;
    let nombreCategoría = document.getElementById("nombreCategoria").value;
    let precioUnitario = document.getElementById("precioUnitario").value;
    let cantidad = document.getElementById("cantidad").value;
    let precioTotal = document.getElementById("precioTotal").value;
    let cantidadContenido = document.getElementById("cantidadContenido").value;
    let unidadMedida = document.getElementById("unidadMedida").value;
    let idBoleta = localStorage.getItem("idBoleta");

    if (!nombreItem || !nombreCategoria || !precioUnitario || !cantidad || !precioTotal || !cantidadContenido || !unidadMedida || !idBoleta) {
      notificationToastify("Todos los campos son obligatorios. Por favor, completa todos los campos.", 3000, "bottom", "right", "warning");
      return; // Detener la ejecución si falta algún campo
    } else {
      createDetalleBoleta(nombreItem, nombreCategoría, precioUnitario, cantidad, precioTotal, cantidadContenido, unidadMedida, idBoleta);
    }
  });
};

export { cargarItemBoleta };
