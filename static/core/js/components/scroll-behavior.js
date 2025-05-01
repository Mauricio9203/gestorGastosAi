const scrollBehavior = () => {
  // Mostrar el botón al hacer scroll
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Volver al inicio al hacer clic
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};


export {
    scrollBehavior
}