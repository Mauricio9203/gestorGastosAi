const cambioPestana = () => {
  document.getElementById("pestana-tabla-detalle-boleta").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("pestana-grafico-detalle-boleta").classList.remove("active");
    document.getElementById("contenido-tabla-detalle-boleta").style.display = "block";
    document.getElementById("contenido-grafico-detalle-boleta").style.display = "none";
  });

  document.getElementById("pestana-grafico-detalle-boleta").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("pestana-tabla-detalle-boleta").classList.remove("active");
    document.getElementById("contenido-tabla-detalle-boleta").style.display = "none";
    document.getElementById("contenido-grafico-detalle-boleta").style.display = "block";
  });
};

export { cambioPestana };
