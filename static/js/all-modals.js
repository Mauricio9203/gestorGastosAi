  // Selecciona el botón de mostrar/ocultar la contraseña
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');

  // Añade el evento de clic al ícono de ojo
  togglePassword.addEventListener('click', function() {
    // Cambia el tipo de input
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;

    // Cambia el ícono del ojo
    this.innerHTML = type === 'password' 
      ? '<i class="fas fa-eye"></i>' 
      : '<i class="fas fa-eye-slash"></i>';
  });
