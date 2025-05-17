import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
const validarFiltros = () => {
  let fechaInicio = document.getElementById("fecha-inicio").value;
  let fechaFin = document.getElementById("fecha-fin").value;
  let comercio = document.getElementById("comercio").value;
  let validacion = false;
  let rangoFechasValido = false;
  let comercioValido = false;

  if (fechaInicio == "" && fechaFin == "" && comercio == "") {
    validacion = true;
  } else if (fechaInicio == "" && fechaFin == "" && comercio != "") {
    //notificationToastify("Filtrando solo por comercios", 3000, "bottom", "right", "info");
    validacion = true;
    comercioValido = true;
  } else if (fechaInicio == "") {
    //notificationToastify("fecha inicio no puede ser nulo", 3000, "bottom", "right", "warning");
  } else if (fechaFin == "") {
    //notificationToastify("fecha fin no puede ser nulo", 3000, "bottom", "right", "warning");
  } else if (fechaFin < fechaInicio) {
    //notificationToastify("La fecha de inicio no puede ser mayor a la fecha de fin", 3000, "bottom", "right", "warning");
  } else if (fechaFin > fechaInicio && comercio == "") {
    //notificationToastify("filtrando solo por rango de fechas", 3000, "bottom", "right", "info");
    rangoFechasValido = true;
    validacion = true;
  } else if (fechaFin > fechaInicio && comercio != "") {
    //notificationToastify("filtrando por rango de fechas y comercio", 3000, "bottom", "right", "info");
    validacion = true;
    rangoFechasValido = true;
    comercioValido = true;
  }

  return { validacion, fechaInicio, fechaFin, comercio, rangoFechasValido, comercioValido };
};

const limpiarFiltros = () => {
  const btnLimpiar = document.getElementById("btn-limpiar-filtros");
  if (!btnLimpiar) return;
  btnLimpiar.addEventListener("click", () => {
    const formControls = document.querySelectorAll(".form-control");
    formControls.forEach((el) => {
      el.value = "";
    });
    const btnFiltrar = document.getElementById("btn-filtrar-fechas");
    if (btnFiltrar) {
      btnFiltrar.click();
    }
  });
};

export { validarFiltros, limpiarFiltros };
