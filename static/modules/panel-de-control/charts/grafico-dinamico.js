const charts = {};
let chartCounter = 0; // Para canvas sin ID

const graficoDinamico = (etiquetas, valores, titulo, idOrElement, backgroundColor, borderColor, tipoGrafico) => {
  const canvas = typeof idOrElement === "string" ? document.getElementById(idOrElement) : idOrElement;
  let leyenda = false;
  if (!canvas) {
    return;
  }

  if (tipoGrafico == "pie") {
    backgroundColor = generarColoresAleatorios(valores.length);
    leyenda = true;
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
    type: tipoGrafico,
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
        legend: { display: leyenda },
        tooltip: { enabled: true },
        datalabels: {
          color: "white",
          align: "center",
          anchor: "center",
          font: {
            weight: "bold",
            size: window.innerWidth < 768 ? 8 : 12,
          },
          formatter: (value, context) => {
            if (tipoGrafico == "bar") {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + "M"; // Formato en millones
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + "k"; // Formato en miles
              }
              return value.toFixed(1); // Si es menor que 1000, lo deja como está
            }

            if (tipoGrafico == "pie") {
              const data = context.chart.data.datasets[0].data;
              const total = data.reduce((a, b) => a + b, 0);
              const porcentaje = ((value / total) * 100).toFixed(1);
              const label = context.chart.data.labels[context.dataIndex];
              return `  ${porcentaje}%`;
            }
          },
        },
      },
      scales:
        tipoGrafico !== "pie"
          ? {
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
            }
          : {},
    },
    plugins: [ChartDataLabels],
  });

  charts[chartKey] = newChart;
};

const generarColoresAleatorios = (cantidad) => {
  const colores = [];

  const morado = { r: 128, g: 0, b: 128 };
  const amarillo = { r: 255, g: 255, b: 0 };
  const darkenFactor = 0.8; // No tan oscuro, conserva vida pero mejora el contraste

  for (let i = 0; i < cantidad; i++) {
    const ratio = cantidad > 1 ? i / (cantidad - 1) : 0;

    let r = morado.r + ratio * (amarillo.r - morado.r);
    let g = morado.g + ratio * (amarillo.g - morado.g);
    let b = morado.b + ratio * (amarillo.b - morado.b);

    r = Math.floor(r * darkenFactor);
    g = Math.floor(g * darkenFactor);
    b = Math.floor(b * darkenFactor);

    colores.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colores;
};

export { graficoDinamico };
