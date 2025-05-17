import getComercio from "../services/get-comercios.js";

const selectComercio = async () => {
  let comercioSelect = document.getElementById("comercio");
  let comercio = await getComercio();

  let options = `<option value="">Seleccione un comercio</option>`;
  comercio.forEach((comercio) => {
    options += `<option value="${comercio.nombre_comercio}">${comercio.nombre_comercio}</option>`;
  });
  comercioSelect.innerHTML = options;
};

export { selectComercio };
