const actualizarSelectModules = (listaCarpetas, idSelect) => {
  const select = document.getElementById(idSelect); // Obtén el elemento <select>
  select.innerHTML = ""; // Limpia las opciones actuales
  select.innerHTML = '<option value="">Seleccione una opción</option>';

  // Agrega las nuevas opciones
  listaCarpetas.forEach((opcion) => {
    if (opcion != "__pycache__") {
      const optionElement = document.createElement("option");
      optionElement.value = opcion;
      optionElement.textContent = formatearNombre(opcion);
      select.appendChild(optionElement);
    }
  });
};

const formatearNombre = (texto) =>
  texto
    ? texto
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase())
    : "";
export { actualizarSelectModules };
