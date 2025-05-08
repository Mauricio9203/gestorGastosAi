import { validarDatosBoleta } from "../services/update-boleta-fields.js";

const tableEvents = (table) => {
  // Evento para cuando una celda sea editada
  table.on("cellEdited", async function (cell) {
    let value = cell.getValue();
    let idBoleta = cell.getRow().getData().id;
    let fieldName = cell.getField();

    validarDatosBoleta(idBoleta, fieldName, value, cell);
  });

  table.on("dataLoaded", function () {
    setTimeout(() => {
      document.querySelectorAll(".viewer-wrapper").forEach((element) => {
        new Viewer(element, {
          navbar: false,
          toolbar: true,
          title: false,
          inline: false,
        });
      });
    }, 1000); // un pequeño delay ayuda con el render completo
  });

  //eventos al seleccionar rows
  table.on("rowSelectionChanged", function (data) {
    if (data.length > 0) {
      document.getElementById("delete-rows-gastos-registrados").style.display = "block";
      document.getElementById("delete-rows-gastos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar (' + data.length + ")";
    } else {
      document.getElementById("delete-rows-gastos-registrados").style.display = "none";
      document.getElementById("delete-rows-gastos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar"';
    }
  });
};

export { tableEvents };
