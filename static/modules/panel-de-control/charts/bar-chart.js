const charts = {};
let chartCounter = 0; // Para canvas sin ID

const barChart = (etiquetas, valores, titulo, idOrElement, backgroundColor, borderColor) => {
  const canvas = typeof idOrElement === "string" ? document.getElementById(idOrElement) : idOrElement;

  if (!canvas) {
    console.error(`Canvas con ID o referencia inválida:`, idOrElement);
    return;
  }

  const ctx = canvas.getContext("2d");

  // Si el canvas no tiene ID, se le asigna uno automáticamente
  if (!canvas.id) {
    canvas.id = `chart-auto-${chartCounter++}`;
  }

  const chartKey = canvas.id;

  const datos = etiquetas
    .map((label, i) => ({
      label,
      value: valores[i],
      bg: backgroundColor[i],
      border: borderColor[i],
    }))
    .sort((a, b) => b.value - a.value);

  const etiquetasOrdenadas = datos.map((d) => d.label);
  const valoresOrdenados = datos.map((d) => d.value);

  // Si el gráfico ya existe, actualizarlo
  if (charts[chartKey]) {
    const chart = charts[chartKey];
    chart.data.labels = etiquetasOrdenadas;
    chart.data.datasets[0].data = valoresOrdenados;
    chart.data.datasets[0].backgroundColor = backgroundColor;
    chart.data.datasets[0].borderColor = borderColor;
    chart.data.datasets[0].label = titulo;
    chart.update({
      duration: 800, // Duración de la animación
      easing: "easeOutQuart", // Transición más suave
      responsiveAnimationDuration: 500, // Duración extra para el cambio de tamaño
    });
    return;
  }

  // Crear un nuevo gráfico
  const newChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: etiquetasOrdenadas,
      datasets: [
        {
          label: titulo,
          data: valoresOrdenados,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800, // Duración de la animación
        easing: "easeInOutQuad", // Tipo de transición suave
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        datalabels: {
          color: "gray",
          align: "center",
          anchor: "center",
          font: {
            weight: "bold",
            size: window.innerWidth < 768 ? 8 : 12,
          },
          formatter: (value) => value.toFixed(1),
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => "$" + value,
            font: { size: 12 },
          },
        },
        x: {
          ticks: {
            font: { size: 12 },
            maxRotation: 100,
            minRotation: 0,
            autoSkip: true,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });

  charts[chartKey] = newChart;
};

export { barChart };
