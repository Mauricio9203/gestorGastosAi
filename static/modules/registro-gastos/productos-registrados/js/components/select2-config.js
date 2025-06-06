import { verificarHabilitarBoton } from "./eventos-display.js";

const ejecutarSelect2 = () => {
  $("#input-select").select2({
    dropdownParent: $("#modal-actualizacion-masiva"),
    placeholder: "Selecciona un valor",
    allowClear: true,
    width: "100%",
  });

  $("#input-select").on("change", verificarHabilitarBoton);

  document.getElementById("campo-a-editar").addEventListener("change", function () {
    $("#input-select").val("").trigger("change");
    $("#input-texto").val("");
    $("#input-decimal").val("");
  });
};

export { ejecutarSelect2 };
