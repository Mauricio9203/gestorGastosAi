import { notificationToastify, showProcessingToast } from "../../../../../utils/notifications-toastify.js";
import { obtenerListaModulos } from "./obtenerSelect.js";

const crearModulo = async (nombreModulo, textoGuion, textoGuionBajo) => {
  showProcessingToast(true);
  try {
    const response = await fetch("/crear_modulo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textoNormal: nombreModulo,
        texto_guion: textoGuion,
        texto_guion_bajo: textoGuionBajo,
      }),
    });

    const data = await response.json();

    if (data.success) {
      showProcessingToast(false);
      notificationToastify(`Módulo ${nombreModulo} creado con éxito`, 2000, "bottom", "center", "success");
      obtenerListaModulos();
    } else {
      notificationToastify(`Error: ${data.error}`, 2000, "bottom", "center", "danger");
      console.error("Error del servidor:", data.error);
    }
  } catch (error) {
    console.error("Error al enviar el fetch:", error);
  }
};

const crearSubModulo = async (nombreModulo, textoGuion, textoGuionBajo, nombreSubModulo, subModuloGuion, subModuloGuionBajo) => {
  console.log(nombreModulo, textoGuion, textoGuionBajo, nombreSubModulo, subModuloGuion, subModuloGuionBajo);

  showProcessingToast(true);
  try {
    const response = await fetch("/crear_sub_modulo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textoNormal: nombreModulo,
        texto_guion: textoGuion,
        texto_guion_bajo: textoGuionBajo,
        textoNormal_sub_modulo: nombreSubModulo,
        texto_guion_sub_modulo: subModuloGuion,
        texto_guion_bajo_sub_modulo: subModuloGuionBajo,
      }),
    });

    const data = await response.json();

    if (data.success) {
      showProcessingToast(false);
      notificationToastify(`Módulo ${nombreModulo} creado con éxito`, 2000, "bottom", "center", "success");
    } else {
      notificationToastify(`Error: ${data.error}`, 2000, "bottom", "center", "danger");
      console.error("Error del servidor:", data.error);
    }
  } catch (error) {
    console.error("Error al enviar el fetch:", error);
  }
};

export { crearModulo, crearSubModulo };
