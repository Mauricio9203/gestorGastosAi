const barChart = (etiquetas, valores, titulo, idChart, backgroundColor, borderColor) =>{
    // Configurar y renderizar el gráfico
    new Chart(idChart, {
      type: "bar", // Tipo de gráfico: barras
      data: {
        labels: etiquetas, // Etiquetas del gráfico
        datasets: [
          {
            label: titulo, // Título del dataset
            data: valores, // Valores del gráfico
            backgroundColor: backgroundColor, // Color de las barras
            borderColor: borderColor, // Color del borde
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
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
              weight: "bold", // Estilo del texto (negrita)
              size: 14, // Tamaño del texto
            },
            formatter: (value) => value, // Mostrar solo el valor numérico
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      plugins: [ChartDataLabels], // Asegúrate de incluir el plugin ChartDataLabels
    });
}

export {
    barChart
}