const formatearNombreCampo = (nombre) => {
  return nombre
    .split("_") // divide por guiones bajos
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()) // capitaliza cada palabra
    .join(" "); // une con espacios
};

export { formatearNombreCampo };
