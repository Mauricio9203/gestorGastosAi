window.addEventListener("load", function () {
  setTimeout(() => {
    const overlay = document.getElementById("loading-overlay");
    const wrapper = document.getElementById("wrapper");

    // Aplica la clase para deslizar hacia arriba
    overlay.classList.add("slide-up");

    // Esperamos que la animación termine (0.8s) antes de ocultarlo de verdad
    setTimeout(() => {
      overlay.style.display = "none";
      wrapper.style.display = "flex"; // o block, según necesites
    }, 500); // mismo tiempo que el "transition" en CSS
  }, 500);
});
