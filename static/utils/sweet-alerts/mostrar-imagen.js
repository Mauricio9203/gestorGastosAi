const mostrarImagenSweetAlert = (url) => {
  // Crear imagen temporal oculta
  const img = document.createElement("img");
  img.src = url;
  img.style.display = "none";
  document.body.appendChild(img);

  // Inicializar Viewer
  const viewer = new Viewer(img, {
    inline: false,
    navbar: false,
    toolbar: true,
    hidden() {
      // Limpiar imagen y destruir viewer al cerrar
      viewer.destroy();
      document.body.removeChild(img);
    },
    viewed() {
      viewer.zoomTo(0.59); // Ajustar zoom inicial
      viewer.setBackgroundColor("#800080"); // Establecer color de fondo
    },
  });

  viewer.show();
};

export default mostrarImagenSweetAlert;
