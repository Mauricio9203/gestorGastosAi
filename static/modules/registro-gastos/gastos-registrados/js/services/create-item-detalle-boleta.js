import { notificationToastify, showProcessingToast } from "../../../../../utils/notifications-toastify.js";
import { loadTableDetalleBoleta } from "../controllers/load-table-detalle-boleta.js";

const createDetalleBoleta = async (nombreItem, nombreCategoría, precioUnitario, cantidad, precioTotal, cantidadContenido, unidadMedida, idBoleta) => {
  precioTotal = parseFloat(precioTotal.replace(",", ".")) || 0;
  precioUnitario = parseFloat(precioUnitario.replace(",", ".")) || 0;
  cantidad = parseFloat(cantidad.replace(",", ".")) || 0;
  cantidadContenido = parseFloat(cantidadContenido.replace(",", ".")) || 0;
  const data = {
    nombre_item: nombreItem,
    precio_total: precioTotal,
    nombre_categoria: nombreCategoría,
    cantidad: cantidad,
    precio_unitario: precioTotal,
    cantidad_contenido_unidad: cantidadContenido,
    unidad_medida: unidadMedida,
    id_boleta: parseInt(idBoleta),
  };
  showProcessingToast(true);
  fetch("/registro_gastos/crear_detalle_boleta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Verificamos si la respuesta es exitosa (status 200)
      if (!response.ok) {
        showProcessingToast(false);
        return response.json().then((errorData) => {
          const msg = errorData?.error || "Error desconocido del servidor";
          notificationToastify(msg, 3000, "bottom", "right", "danger");
          throw new Error(msg);
        });
      }

      // Si todo está bien, obtenemos la respuesta JSON
      return response.json();
    })
    .then((result) => {
      // Verificamos la propiedad "ok" de la respuesta
      if (result.ok) {
        loadTableDetalleBoleta(idBoleta);
        document.querySelectorAll(".form-control").forEach((input) => (input.value = ""));
        showProcessingToast(false);
        document.getElementById("pestana-tabla-detalle-boleta").click();
        notificationToastify("Item agregado exitosamente", 3000, "bottom", "right", "success");
      } else {
        // Si la propiedad "ok" es false, mostramos un error
        showProcessingToast(false);
        notificationToastify(result.message || "Error desconocido", 3000, "bottom", "right", "danger");
      }
    })
    .catch((error) => {
      showProcessingToast(false);
      console.error("Hubo un problema con la solicitud:", error);
    });
};

export { createDetalleBoleta };
