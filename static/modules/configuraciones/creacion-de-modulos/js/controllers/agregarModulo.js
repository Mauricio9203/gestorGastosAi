const agregarModulo = () => {
  document.getElementById("agregarModuloGuardar").addEventListener("click", () => {
    const nombreModulo = document.getElementById("agregarModuloNombre").value; // Puedes obtenerlo desde un input si quieres
    console.log(nombreModulo);
  });
};

const agregarSubModulo = () => {
  document.getElementById("agregarSubModuloGuardar").addEventListener("click", () => {
    console.log("guardando sub módulo");
  });
};

export { agregarModulo, agregarSubModulo };
