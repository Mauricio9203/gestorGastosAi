const barChart = (etiquetas, valores, titulo, idChart, backgroundColor, borderColor) => {
  // 1. Verificar si ya existe un gráfico en el idChart
  const existingChart = Chart.getChart(idChart); // Obtener la instancia de gráfico
  if (existingChart) {
    // Destruir el gráfico anterior antes de crear uno nuevo
    existingChart.destroy();
  }

  // 1. Combinar todo en un array de objetos
  const datos = etiquetas.map((label, i) => ({
    label,
    value: valores[i],
  }));

  // 2. Ordenar por valor descendente
  datos.sort((a, b) => b.value - a.value);

  // 3. Separar los datos ordenados
  const etiquetasOrdenadas = datos.map((d) => d.label);
  const valoresOrdenados = datos.map((d) => d.value);
  const bgOrdenado = datos.map((d) => d.bg);
  const borderOrdenado = datos.map((d) => d.border);

  // Configurar y renderizar el gráfico
  new Chart(idChart, {
    type: "bar", // Tipo de gráfico: barras
    data: {
      labels: etiquetasOrdenadas, // Etiquetas del gráfico
      datasets: [
        {
          label: titulo, // Título del dataset
          data: valoresOrdenados, // Valores del gráfico
          backgroundColor: backgroundColor, // Color de las barras
          borderColor: borderColor, // Color del borde
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
        // Agregar plugin de dataLabels solo para mostrar números
        datalabels: {
          color: "gray", // Color del texto dentro de las barras
          align: "center", // Alinear el texto al centro de las barras
          anchor: "center", // Anclar el texto al centro
          font: {
            weight: "bold",
            size: window.innerWidth < 768 ? 8 : 12, // Ajusta el tamaño de la fuente en pantallas pequeñas
          },
          formatter: (value) => value.toFixed(1), // Mostrar solo el valor numérico
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: false,
            text: "Total Gastado",
            color: "#333", // Color del texto
            font: {
              size: 8,
            },
            padding: { top: 10 },
          },
          ticks: {
            callback: function (value) {
              return "$" + value;
            },
            font: {
              size: 12,
            },
          },
        },
        x: {
          title: {
            display: false,
            text: "Categorías",
            color: "#333", // Color del texto
            font: {
              size: 8,
            },
            padding: { top: 10 },
          },
          ticks: {
            font: {
              size: 12, // Tamaño de la fuente del eje X
            },
            maxRotation: 100, // Máxima rotación permitida
            minRotation: 0, // Mínima rotación si hay espacio
            autoSkip: true, // (opcional) Muestra todas las etiquetas
          },
        },
      },
    },
    plugins: [ChartDataLabels], // Asegúrate de incluir el plugin ChartDataLabels
  });
};

export { barChart };
