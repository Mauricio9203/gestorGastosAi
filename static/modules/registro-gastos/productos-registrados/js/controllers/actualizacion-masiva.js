import { notificationToastify } from "../../../../../utils/notifications-toastify.js";
import { updateMasivo } from "../services/update-masivo.js";
import { table, loadTable } from "./load-table.js";

const validarFormularioActualizacionMasiva = () => {
  document.getElementById("boton-actualizacion-masiva").addEventListener("click", function () {
    let nombreCampo = document.getElementById("campo-a-editar").value;
    let inputSelect = document.getElementById("input-select").value;
    let inputTexto = document.getElementById("input-texto").value;
    let inputDecimal = document.getElementById("input-decimal").value;

    let listaCampos = { id_ingrediente_maestro: "opcion", unidad_medida: "opcion", cantidad: "decimal", nombre_item: "texto", nombre_categoria: "texto" };
    let tipoDeCampo = listaCampos[nombreCampo];

    switch (tipoDeCampo) {
      case "opcion":
        if (inputSelect === "") {
          campoVacioNotificacion();
          return;
        } else {
          ordenarDatosActualizacionMasiva(nombreCampo, inputSelect);
        }
        break;
      case "texto":
        if (inputTexto === "") {
          campoVacioNotificacion();
          return;
        } else {
          ordenarDatosActualizacionMasiva(nombreCampo, inputTexto);
        }

        break;
      case "decimal":
        if (inputDecimal === "") {
          campoVacioNotificacion();
          return;
        } else {
          ordenarDatosActualizacionMasiva(nombreCampo, inputDecimal);
        }

        break;
      default:
        console.error("Tipo de campo no reconocido:", tipoDeCampo);
        return;
    }
  });
};

const campoVacioNotificacion = () => {
  notificationToastify("Por favor completa todos los campos requeridos.", 2000, "bottom", "right", "warning");
};

const ordenarDatosActualizacionMasiva = async (nombreCampo, valor) => {
  let nombre_tabla = "detalle_boleta";
  let campo_actualizar = nombreCampo;
  let nuevo_valor = valor;
  let lista_ids = [];
  let seleccionados = table.getSelectedData();

  seleccionados.forEach((detalle) => {
    lista_ids.push(detalle.id_detalle_boleta);
  });

  let respuesta = await updateMasivo(nombre_tabla, campo_actualizar, nuevo_valor, lista_ids);

  if (!respuesta.ok) {
    notificationToastify("Error al actualizar los productos de forma masiva.", 2000, "bottom", "right", "error");
    return;
  } else {
    notificationToastify("Productos actualizados correctamente.", 2000, "bottom", "right", "success");
    loadTable();

    document.getElementById("cerrar-modal-actualizacion-masiva-db").click();
    document.getElementById("opciones-detalle-boleta-dropdown").style.display = "none";
  }
};

export { validarFormularioActualizacionMasiva };
