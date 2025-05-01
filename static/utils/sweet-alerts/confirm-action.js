//debe recibir como parametro al acción que se ejecuta al confirmar la acción
const confirmAction = async (actionFunc, title, text, icon, confirmText, cancelText) => {
  swal
    .fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        actionFunc(); // Ejecuta la acción solo si es confirmada
      }
      // Código después de la confirmación (opcional, si necesitas hacer algo después)
    });
};

export { confirmAction };
