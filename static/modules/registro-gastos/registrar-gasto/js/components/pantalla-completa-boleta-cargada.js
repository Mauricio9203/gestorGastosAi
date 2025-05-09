const pantallaCompletaBoletaCargada = () => {
  document.getElementById("pantalla-completa-editar-boleta-cargada").addEventListener("click", function () {
    var div = document.getElementById("formulario-boleta-cargada");

    document.getElementById("card-body-formulario-carga").classList.add("card-body-full-screen");

    if (div.requestFullscreen) {
      div.requestFullscreen(); // Para navegadores modernos
    } else if (div.mozRequestFullScreen) {
      // Firefox
      div.mozRequestFullScreen();
    } else if (div.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      div.webkitRequestFullscreen();
    } else if (div.msRequestFullscreen) {
      // IE/Edge
      div.msRequestFullscreen();
    }
  });
};

const detectarCambioFullscreen = () => {
  // Detecta cuando hay un cambio en el modo pantalla completa
  document.addEventListener("fullscreenchange", function () {
    const fullscreenElement = document.fullscreenElement;

    if (!fullscreenElement) {
      // Ya no hay ningún elemento en pantalla completa
      console.log("Saliste del modo pantalla completa");

      document.getElementById("card-body-formulario-carga").classList.remove("card-body-full-screen");
    } else {
    }
  });
};

export { pantallaCompletaBoletaCargada, detectarCambioFullscreen };
