import { table } from "../controllers/load-table.js";
import { getInsumosMaestros } from "../services/get-insumos-maestros.js";

const tipoCampoPorNombre = {
  nombre_item: "texto",
  cantidad: "numero",
  unidad_medida: "select",
  id_ingrediente_maestro: "select",
  nombre_categoria: "texto",
};

const inputPorTipo = {
  texto: document.getElementById("input-texto"),
  numero: document.getElementById("input-decimal"),
  select: document.getElementById("input-select"),
};

const boton = document.getElementById("boton-actualizacion-masiva");
let campoAEditar = document.getElementById("campo-a-editar");

const verificarHabilitarBoton = () => {
  const campo = campoAEditar.value;
  const tipo = tipoCampoPorNombre[campo];
  let valor = "";

  if (tipo && inputPorTipo[tipo]) {
    valor = inputPorTipo[tipo].value;
  }

  // Habilita solo si hay campo y valor
  boton.disabled = !(campo && tipo && valor);
};

const mostrarInputCorrespondiente = () => {
  const campo = campoAEditar.value;
  const tipo = tipoCampoPorNombre[campo];

  if (tipo == "select") {
    cargarSelect(campo);
  }

  Object.values(inputPorTipo).forEach((input) => {
    input.parentElement.style.display = "none";
  });

  if (tipo && inputPorTipo[tipo]) {
    inputPorTipo[tipo].parentElement.style.display = "block";
  }

  verificarHabilitarBoton();
};

const botonActualizacionMasivaDetalleBoleta = () => {
  boton.addEventListener("click", () => {
    const campo = campoAEditar.value;
    const tipo = tipoCampoPorNombre[campo];

    let valor;
    switch (tipo) {
      case "texto":
        valor = inputPorTipo.texto.value;
        break;
      case "numero":
        valor = inputPorTipo.numero.value;
        break;
      case "select":
        valor = inputPorTipo.select.value;
        break;
      default:
        valor = null;
        break;
    }
  });
};

// Listeners para inputs
campoAEditar.addEventListener("change", mostrarInputCorrespondiente);
Object.values(inputPorTipo).forEach((input) => {
  input.addEventListener("input", verificarHabilitarBoton);
});

const cargarSelect = async (campo) => {
  if (campo === "unidad_medida") {
    inputPorTipo.select.innerHTML = `
      <option value="kilogramos">Kilogramo</option>
      <option value="gramos">Gramo</option>
      <option value="litros">Litro</option>
      <option value="mililitros">Mililitro</option>
      <option value="unidad">Unidad</option>
    `;
  } else if (campo === "id_ingrediente_maestro") {
    let campoSelect = document.getElementById("input-select");

    campoSelect.disabled = true;
    let insumosMaestros = await getInsumosMaestros();
    campoSelect.disabled = false;

    const select = document.getElementById("input-select");
    select.innerHTML = '<option selected disabled value="">Selecciona una opción</option>';

    insumosMaestros.forEach(({ id, nombre }) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = nombre;
      select.appendChild(option);
    });
  }
};

export { mostrarInputCorrespondiente, botonActualizacionMasivaDetalleBoleta, verificarHabilitarBoton };
