document.addEventListener("DOMContentLoaded", () => {
  addCustomActiveClass(); // Llama a la función cuando la página cargue
  cargarUsuarios(); // Llama la función para cargar los usuarios

  // Asocia el evento al botón de agregar usuario
  document.getElementById("btnAddUser").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("userModal"));
    document.getElementById("userModalLabel").textContent = "Agregar Usuario";
    document.getElementById("userForm").reset();
    document.getElementById("saveUser").textContent = "Guardar";
    modal.show();

    document
      .getElementById("closeModalUsuarioBtn")
      .addEventListener("click", function () {
        modal.hide();
      });
  });


// Asociar el evento de editar o eliminar usuario
$(document).on("click", "button[data-id]", function () {
  const userId = $(this).data("id");

  if ($(this).hasClass("btn-outline-info")) {
      console.log("Editar usuario con ID:", userId);

      // Hacer una solicitud para obtener los datos del usuario
      fetch(`/users/${userId}`)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  console.error("Error al obtener el usuario:", data.error);
                  return;
              }

              // Llenar el modal con los datos del usuario obtenido
              document.getElementById("userModalLabel").textContent = "Editar Usuario";
              document.getElementById("saveUser").textContent = "Actualizar"; // Cambiar el texto del botón

              document.getElementById("username").value = data.username;
              document.getElementById("email").value = data.email;
              document.getElementById("password").value = ""; // No mostrar la contraseña

              // Mostrar el modal
              const modal = new bootstrap.Modal(document.getElementById("userModal"));
              modal.show();

              // Evento para cerrar el modal
              document.getElementById("closeModalUsuarioBtn").addEventListener("click", function () {
                  console.log("Cerrando modal");
                  modal.hide();
              });
          })
          .catch(error => console.error("Error en la solicitud:", error));
  } else if ($(this).hasClass("btn-outline-danger")) {
      console.log("Eliminar usuario con ID:", userId);
      eliminarUsuario(userId);
  }
});


  // Manejo del formulario de agregar usuario

  document.getElementById("saveUser").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Crear un objeto con los datos del formulario
    const userData = {
      username: username,
      email: email,
      password_hash: password, // Enviar la contraseña sin encriptar
    };

    // Enviar los datos al backend
    fetch("/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response.json(); // Siempre intentamos convertir la respuesta en JSON
      })
      .then((data) => {
        // Verificamos si la respuesta contiene un error
        if (data.error) {
          // Si el error es por email duplicado
          if (data.error.includes("El email ya está registrado")) {
            Swal.fire({
              icon: "info",
              title: "Error al agregar usuario",
              text: "El email ya está registrado en el sistema.",
              showConfirmButton: true,
            });
          } else {
            // Si hay otro tipo de error, lo mostramos genéricamente
            Swal.fire({
              icon: "error",
              title: "Error al agregar usuario",
              text: data.error,
              showConfirmButton: true,
            });
          }
        } else {
          // Si no hubo error, mostrar mensaje de éxito
          Swal.fire({
            icon: "success",
            title: "Usuario Agregado",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            document.getElementById("closeModalUsuarioBtn").click();
            cargarUsuarios();
          });
        }
      })
      .catch((error) => {
        // En caso de que algo falle al procesar la respuesta
        console.error("Error:", error);
        alert("Hubo un problema al agregar el usuario.");
      });

  });
});

const addCustomActiveClass = () => {
  const linkId = "configuracionesLink";
  const subLinkId = "usuarios";
  const collapseId = "configuraciones";

  const link = document.getElementById(linkId);
  const subLink = document.getElementById(subLinkId);
  const collapse = document.getElementById(collapseId);

  link.classList.add("custom-active");
  subLink.classList.add("custom-active-sub");

  if (link.getAttribute("aria-expanded") !== "true") {
    link.setAttribute("aria-expanded", "true");
    collapse.classList.add("show");
  }
};

const cargarUsuarios = () => {
  document.getElementById("loadingSpinner").style.display = "block";

  fetch("/users/list")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loadingSpinner").style.display = "none";

      if (data && data.length > 0) {
        var tableData = [];
        data.forEach((usuario) => {
          tableData.push([
            usuario.username,
            usuario.email,
            convertirFecha(usuario.created_at),
            convertirFecha(usuario.updated_at),
            `<button class="btn btn-outline-info btn-sm mr-2" data-id="${usuario.id}"><i class="fas fa-edit"></i></button>
             <button class="btn btn-outline-danger btn-sm" data-id="${usuario.id}"><i class="fas fa-trash"></i></button>`,
          ]);
        });

        let tablaId = "tableUsers";

        //cargar datos a la tabla
        cargarTabla(tableData, tablaId);
      } else {
        console.log("No hay usuarios disponibles.");
      }
    })
    .catch((error) => {
      document.getElementById("loadingSpinner").style.display = "none";
      console.error("Error al obtener usuarios:", error);
    });
};

// Eliminar usuario con confirmación
function eliminarUsuario(userId) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminarlo",
    cancelButtonText: "Cancelar",
    reverseButtons: true, // Para que el botón de "Cancelar" esté a la izquierda
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, proceder con la eliminación
      fetch(`/users/delete/${userId}`, {
        method: "DELETE", // Método DELETE para eliminar
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Si la respuesta es correcta, mostrar un mensaje de éxito
            Swal.fire({
              icon: "success",
              title: "Usuario eliminado",
              text: "El usuario fue eliminado exitosamente.",
              timer: 2000, // Se cierra automáticamente después de 2 segundos
              showConfirmButton: false,
            });
            // Recargar la lista de usuarios
            cargarUsuarios(); // Esta es la función que recarga la lista de usuarios
          } else {
            // Si hubo un error, mostrar un mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el usuario.",
            });
          }
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al intentar eliminar el usuario.",
          });
        });
    } else {
      // Si el usuario cancela, no hacer nada
      console.log("Eliminación cancelada.");
    }
  });
}
