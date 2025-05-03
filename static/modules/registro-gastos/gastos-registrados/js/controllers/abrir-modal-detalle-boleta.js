import { loadTableDetalleBoleta } from "./load-table-detalle-boleta.js";

const abrirModalDetalleBoleta = () => {
  console.log("abriendo modal");
  // Escuchar todos los clics en elementos con la clase 'changePass'
  document.querySelectorAll(".changePass").forEach((button) => {
    console.log("abriendo modal");
    button.addEventListener("click", function (event) {
      // Aquí puedes manejar el clic. Por ejemplo, obtener el valor de un atributo 'data-id':
      const id = event.target.closest("button").getAttribute("data-id");
      console.log("Botón clickeado con ID:", id);

      loadTableDetalleBoleta(id);

      // Aquí puedes hacer lo que desees con el ID o el clic.
    });
  });
};

export { abrirModalDetalleBoleta };
