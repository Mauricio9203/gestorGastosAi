document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const passwordField = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");

    const showAlert = (icon, title, text) => {
        Swal.fire({
            icon,
            title,
            text,
            customClass: {
                popup: 'swal-popup',
                title: 'swal-title',
                content: 'swal-content',
                confirmButton: 'swal-btn',
            },
            width: '300px',
            padding: '15px',
        });
    };

    const toggleLoadingState = (isLoading) => {
        if (isLoading) {
            loginButton.disabled = true; // Deshabilitar el botón
            loginButton.innerHTML = 'Login <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'; // Mostrar el ícono de carga
        } else {
            loginButton.disabled = false; // Habilitar el botón
            loginButton.innerHTML = 'Login'; // Volver al texto original
        }
    };

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

        const email = document.getElementById("email").value.trim();
        const password = passwordField.value.trim();

        // Validación de campos vacíos
        if (!email || !password) {
            showAlert("info", "Empty fields", "Please complete all fields.");
            return;
        }

        // Validación del formato del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert("info", "Invalid email", "Please enter a valid email.");
            return;
        }

        // Activar el estado de carga mientras se espera la respuesta
        toggleLoadingState(true);

        // Realizamos la solicitud al servidor para autenticar al usuario
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network or server unavailable error");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Mostrar respuesta del servidor para depuración

            // Si la autenticación es exitosa
            if (data.success) {
                window.location.href = "/"; // Redirigir a la página principal
            } else {
                showAlert("info", "Error", data.message); // Mostrar mensaje del servidor
            }
        })
        .catch(error => {
            showAlert("error", "Error", error.message || "There was a problem trying to log in. Try again.");
        })
        .finally(() => {
            // Restaurar el estado del botón una vez que se haya recibido la respuesta
            toggleLoadingState(false);
        });
    });
});



document.getElementById("togglePassword").addEventListener("click", function () {
    let passwordInput = document.getElementById("password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    }
});


// Asegúrate de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa el tooltip en el elemento con id "testUserTooltip"
    var tooltipTriggerEl = document.getElementById('testUserTooltip');
    var tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
});