const disableButton = (idButton) => {
  let saveButton = document.getElementById(idButton);
  let textOriginal = saveButton.textContent;

  // Almacenar el texto original en un atributo data-original-text
  saveButton.setAttribute("data-original-text", textOriginal);

  // Cambiar el contenido del botón y agregar el spinner
  saveButton.innerHTML = '<i class="fa fa-circle-notch fa-spin"></i> Procesando...';
  saveButton.classList.add("disabled"); // Agregar la clase 'disabled' para deshabilitarlo
};

const enableButton = (idButton) => {
  let saveButton = document.getElementById(idButton);

  // Obtener el texto original desde el atributo data-original-text
  let textOriginal = saveButton.getAttribute("data-original-text");

  // Restaurar el texto original y quitar la clase 'disabled'
  saveButton.classList.remove("disabled");
  saveButton.innerHTML = textOriginal; // Restaurar el texto original
};

export { disableButton, enableButton };
