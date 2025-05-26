const notificationToastify = (message, duration, gravity, position, backgroundColor) => {
  const colorArray = [
    { title: "danger", color: "#c62828" }, // rojo oscuro
    { title: "warning", color: "#ff8f00" }, // ámbar oscuro
    { title: "success", color: "#2e7d32" }, // verde oscuro
    { title: "info", color: "#1565c0" }, // azul oscuro
  ];

  var color = colorArray.find((c) => c.title === backgroundColor).color;

  Toastify({
    text: message,
    duration: duration,
    gravity: "bottom", // "top" o "bottom"
    position: "right", // "left", "center" o "right"
    style: {
      background: color, // rojo para advertencia u otro color
    },
    stopOnFocus: true, // pausa al pasar el mouse
  }).showToast();
};

let processingToast = null;

const showProcessingToast = (show = true) => {
  if (show) {
    // Si ya hay uno mostrándose, no volver a crearlo
    if (!processingToast) {
      processingToast = Toastify({
        text: '<i class="fas fa-circle-notch fa-spin" style="margin-right: 8px;"></i> Procesando...',
        duration: -1, // permanece hasta cerrarlo manualmente
        gravity: "bottom",
        position: "right",
        style: {
          background: "#1e88e5", // rojo para advertencia u otro color
        },
        stopOnFocus: false,
        escapeMarkup: false,
      });

      processingToast.showToast();
    }
  } else {
    // Si existe una instancia, la cerramos y la eliminamos
    if (processingToast) {
      processingToast.hideToast();
      processingToast = null;
    }
  }
};

const showProcessingToastMessage = (show = true, mensaje) => {
  if (show) {
    // Si ya hay uno mostrándose, no volver a crearlo
    if (!processingToast) {
      processingToast = Toastify({
        text: '<i class="fas fa-circle-notch fa-spin" style="margin-right: 8px;"></i> ' + mensaje,
        duration: -1, // permanece hasta cerrarlo manualmente
        gravity: "bottom",
        position: "right",
        style: {
          background: "#1e88e5",
        },
        stopOnFocus: false,
        escapeMarkup: false,
      });

      processingToast.showToast();
    }
  } else {
    // Si existe una instancia, la cerramos y la eliminamos
    if (processingToast) {
      processingToast.hideToast();
      processingToast = null;
    }
  }
};

export { notificationToastify, showProcessingToast, showProcessingToastMessage };
