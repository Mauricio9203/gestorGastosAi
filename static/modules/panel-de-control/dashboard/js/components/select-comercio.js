import getComercio from "../services/get-comercios.js";

const selectComercio = async () => {
  let comercioSelect = document.getElementById("comercio");
  let comercio = await getComercio();

  let options = ``;
  comercio.forEach((comercio) => {
    options += `<option value="${comercio.nombre_comercio}">${comercio.nombre_comercio}</option>`;
  });
  comercioSelect.innerHTML = options;

  $("#comercio").select2({
    placeholder: "Selecciona un comercio",
    allowClear: true,
    width: "100%",
  });

  // Inicializar sin selección para mostrar el placeholder
  $("#comercio").val(null).trigger("change");
};

const initTomSelect = () => {};

export { selectComercio, initTomSelect };
