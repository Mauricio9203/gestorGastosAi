document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const passwordField = document.getElementById("password");  // Asegúrate de que el campo de contraseña está correctamente seleccionado
    const loginButton = document.getElementById("loginButton");

    // Verifica si los elementos del DOM están cargados correctamente
    console.log("loginForm:", loginForm);
    console.log("passwordField:", passwordField);
    console.log("loginButton:", loginButton);

    // Toggle password visibility
    const togglePassword = document.getElementById("togglePassword");
    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            const type = passwordField.type === "password" ? "text" : "password";
            passwordField.type = type;
            togglePassword.classList.toggle("fa-eye-slash");
        });
    }

    // Verifica si el evento submit está correctamente agregado al formulario
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();  // Prevenimos el comportamiento por defecto del formulario
        console.log("Formulario enviado");

        const email = document.getElementById("email").value.trim();
        const password = passwordField.value.trim();

        // Validación de campos
        console.log("Email:", email);
        console.log("Contraseña:", password);

        if (!email || !password) {
            console.log("Campos vacíos detectados");
            Swal.fire({
                icon: "error",
                title: "Campos vacíos",
                text: "Por favor, complete todos los campos.",
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log("Expresión regular para el correo:", emailRegex);

        if (!emailRegex.test(email)) {
            console.log("Correo inválido detectado");
            Swal.fire({
                icon: "error",
                title: "Correo inválido",
                text: "Por favor, ingrese un correo electrónico válido.",
            });
            return;
        }

        // Realizamos la solicitud al servidor para autenticar al usuario
        console.log("Enviando solicitud al servidor...");
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            console.log("Respuesta del servidor:", response);
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos del servidor:", data);

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Inicio de sesión exitoso",
                    text: `Bienvenido, ${email}!`,
                }).then(() => {
                    // Redirigir a la página principal después de la autenticación exitosa
                    console.log("Redirigiendo a la página principal...");
                    window.location.href = "/";
                });
            } else {
                console.log("Error de autenticación:", data.message);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message,
                });
            }
        })
        .catch(error => {
            console.log("Error de red o en la solicitud:", error);
            Swal.fire({
                icon: "error",
                title: "Error de red",
                text: "Hubo un problema al intentar iniciar sesión. Intenta nuevamente.",
            });
        });
    });
});
