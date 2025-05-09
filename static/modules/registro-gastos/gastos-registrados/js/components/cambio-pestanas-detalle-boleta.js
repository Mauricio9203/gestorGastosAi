const cambioPestana = () => {
  const tabs = [
    {
      id: "pestana-tabla-detalle-boleta",
      contentId: "contenido-tabla-detalle-boleta",
    },
    {
      id: "pestana-grafico-detalle-boleta",
      contentId: "contenido-grafico-detalle-boleta",
    },
    {
      id: "pestana-agregar-detalle-boleta",
      contentId: "contenido-formulario-detalle-boleta", // mismo contenido que la pestaña gráfica
    },
  ];

  const activarPestana = (tabId) => {
    tabs.forEach(({ id, contentId }) => {
      const tab = document.getElementById(id);
      const content = document.getElementById(contentId);
      const isActive = id === tabId;

      tab.classList.toggle("active", isActive);
      content.style.display = isActive ? "block" : "none";
    });
  };

  tabs.forEach(({ id }) => {
    document.getElementById(id).addEventListener("click", () => activarPestana(id));
  });
};

export { cambioPestana };
