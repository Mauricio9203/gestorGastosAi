import { tableDetalleBoleta } from "./load-table-detalle-boleta.js";
import { table } from "./load-table.js";

const filtroSearchBoleta = () => {
  // Obtener el campo de búsqueda
  const searchInput = document.getElementById("searchInputBoleta");

  // Escuchar el evento de 'input' para realizar el filtro
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value;

    // Si el valor de búsqueda está vacío, limpiamos el filtro
    if (searchValue === "") {
      table.clearFilter();
    } else {
      // Aplicar el filtro general en todas las columnas
      table.setFilter([{ field: "nombre_comercio", type: "like", value: searchValue }]);
    }
  });
};

const filtroSearchDetalleBoleta = () => {
  // Obtener el campo de búsqueda
  const searchInput = document.getElementById("searchInputDetalleBoleta");

  // Escuchar el evento de 'input' para realizar el filtro
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value;

    // Si el valor de búsqueda está vacío, limpiamos el filtro
    if (searchValue === "") {
      tableDetalleBoleta.clearFilter();
    } else {
      // Aplicar el filtro general en todas las columnas
      tableDetalleBoleta.setFilter([{ field: "nombre_categoria", type: "like", value: searchValue }]);
      tableDetalleBoleta.setFilter([{ field: "nombre_item", type: "like", value: searchValue }]);
    }
  });
};

export { filtroSearchBoleta, filtroSearchDetalleBoleta };
