import { validarDatosBoleta } from "../services/update-boleta-fields.js";

let viewerInstance = null;

const tableEvents = (table) => {
  // Evento para cuando una celda sea editada
  table.on("cellEdited", async function (cell) {
    let value = cell.getValue();
    let idBoleta = cell.getRow().getData().id;
    let fieldName = cell.getField();

    validarDatosBoleta(idBoleta, fieldName, value, cell);
  });

  table.on("renderComplete", function () {
    // Destruir instancia anterior si existe
    if (viewerInstance) {
      viewerInstance.destroy();
      viewerInstance = null;
    }

    // Aplicar viewer al contenedor que tiene TODAS las imágenes visibles
    const container = document.querySelector("#gastos-registrados-table"); // cambia esto si tu contenedor tiene otro ID

    if (container) {
      viewerInstance = new Viewer(container, {
        navbar: false,
        toolbar: true,
        title: false,
        inline: false,
        filter(image) {
          // Solo aplicar viewer a las imágenes con esta clase
          return image.classList.contains("boleta-image-hover");
        },
      });
    }
  });

  //eventos al seleccionar rows
  table.on("rowSelectionChanged", function (data) {
    if (data.length > 0) {
      document.getElementById("delete-rows-gastos-registrados").style.display = "block";
      document.getElementById("delete-rows-gastos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span> (' + data.length + ")";
    } else {
      document.getElementById("delete-rows-gastos-registrados").style.display = "none";
      document.getElementById("delete-rows-gastos-registrados").innerHTML = '<i class="fas fa-trash-alt"></i> <span class="span_exportacion">Eliminar</span>"';
    }
  });
};

export { tableEvents };
