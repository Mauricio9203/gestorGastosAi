import { notificationToastify, showProcessingToast } from "../../utils/notifications-toastify.js";

const addBoleta = async (boletaData) => {
  showProcessingToast(true);
  try {
    const response = await fetch("/registro_gastos/crear_boleta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(boletaData),
    });

    const data = await response.json(); // Obtiene la respuesta en formato JSON

    if (data.error) {
      notificationToastify(`Error: ${data.error}`, 3000, "bottom", "right", "danger");
      return null; // Retorna null en caso de error
    } else {
      return data; // Retorna la data de la boleta
    }
  } catch (error) {
    console.error("Error:", error);
    notificationToastify("Error: " + error, 3000, "bottom", "right", "danger");
    return null; // Retorna null en caso de error
  }
};

const addDetalleBoleta = async (detalleBoletaData) => {
  await fetch("/registro_gastos/detalle_boleta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(detalleBoletaData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        notificationToastify(`Error: ${data.error}`, 3000, "bottom", "right", "danger");
      } else {
      }
      return true;
    })
    .catch((error) => {
      console.error("Error:", error);
      notificationToastify("Error: " + error, 3000, "bottom", "right", "danger");
      return false;
    });
};
export { addBoleta, addDetalleBoleta };
