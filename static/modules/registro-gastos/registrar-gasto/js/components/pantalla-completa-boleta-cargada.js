const pantallaCompletaBoletaCargada = () => {
  document.getElementById("pantalla-completa-editar-boleta-cargada").addEventListener("click", function () {
    const div = document.getElementById("formulario-boleta-cargada");

    if (document.fullscreenElement === div) {
      document.getElementById("icono-expandir-boleta-cargada").classList.remove("fa-compress");
      document.getElementById("icono-expandir-boleta-cargada").classList.add("fa-expand");

      // Si ya está en pantalla completa, salir
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // Si no está en pantalla completa, entrar
      document.getElementById("card-body-formulario-carga").classList.add("card-body-full-screen");
      document.getElementById("icono-expandir-boleta-cargada").classList.remove("fa-expand");
      document.getElementById("icono-expandir-boleta-cargada").classList.add("fa-compress");
      if (div.requestFullscreen) {
        div.requestFullscreen();
      } else if (div.mozRequestFullScreen) {
        div.mozRequestFullScreen();
      } else if (div.webkitRequestFullscreen) {
        div.webkitRequestFullscreen();
      } else if (div.msRequestFullscreen) {
        div.msRequestFullscreen();
      }
    }
  });
};

const detectarCambioFullscreen = () => {
  // Detecta cuando hay un cambio en el modo pantalla completa
  document.addEventListener("fullscreenchange", function () {
    const fullscreenElement = document.fullscreenElement;

    if (!fullscreenElement) {
      document.getElementById("card-body-formulario-carga").classList.remove("card-body-full-screen");
    } else {
    }
  });
};

export { pantallaCompletaBoletaCargada, detectarCambioFullscreen };
