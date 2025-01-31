 document.addEventListener("DOMContentLoaded", () => {
  addCustomActiveClass(); // Llama a la función cuando la página cargue
  cargarUsuarios(); // Llama la función para cargar los usuarios

  // Asocia el evento al botón de agregar usuario
  document.getElementById("btnAddUser").addEventListener("click", () => {
    const modalTitle = document.getElementById("userModalLabel");
    const modal = new bootstrap.Modal(document.getElementById("userModal"));
    document.getElementById("userModalLabel").textContent = "Add User";
    document.getElementById("userForm").reset();
    document.getElementById("saveUser").textContent = "Save";
    modalTitle.setAttribute("data-use", "addUser"); // Cambiar el data-use
    modal.show();

    cargarRoles();

    document
      .getElementById("closeModalUsuarioBtn")
      .addEventListener("click", function () {
        modal.hide();
      });
  });

  // Asociar el evento de editar
  $(document).on("click", "button[data-id]", function () {
    const userId = $(this).data("id");
    const modalTitle = document.getElementById("userModalLabel");

    if ($(this).hasClass("btn-outline-info")) {
      // Hacer una solicitud para obtener los datos del usuario
      fetch(`/users/${userId}`)
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            console.error("Error al obtener el usuario:", data.error);
            return;
          }

          // Cargar roles primero
          await cargarRoles(); // Esperar a que se carguen los roles

          // Llenar el modal con los datos del usuario obtenido
          document.getElementById("userModalLabel").textContent = "User Update";
          document.getElementById("saveUser").textContent = "Update"; // Cambiar el texto del botón
          document.getElementById("username").value = data.username;
          document.getElementById("email").value = data.email;
          document.getElementById("user_roles").value = data.id_rol; // O puedes usar el número 2 sin comillas también: 2
          document.getElementById("idUser").value = data.id;
          document.getElementById("password").value = ""; // No mostrar la contraseña
          modalTitle.setAttribute("data-use", "editUser"); // Cambiar el data-use

          // Mostrar el modal
          const modal = new bootstrap.Modal(
            document.getElementById("userModal")
          );
          modal.show();

          // Evento para cerrar el modal
          document
            .getElementById("closeModalUsuarioBtn")
            .addEventListener("click", function () {
              modal.hide();
            });
        })
        .catch((error) => console.error("Error en la solicitud:", error));
    } else if ($(this).hasClass("btn-outline-danger")) {
      eliminarUsuario(userId);
    }
  });

  // Manejo del formulario de agregar usuario

   document.getElementById("saveUser").addEventListener("click", function () {
  
    

    const modalTitle = document.getElementById("userModalLabel");
    const dataUseValue = modalTitle.getAttribute("data-use");

    const idUser = document.getElementById("idUser").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const rol_user = document.getElementById("user_roles").value;
    const password = document.getElementById("password").value;

    if (dataUseValue == "addUser") {
      // Validar si algún campo está vacío
      if (!username || !email || !rol_user || !password) {
        Swal.fire({
          icon: "info",
          title: "Missing Fields",
          text: "Please fill in all fields before submitting.",
          showConfirmButton: true,
        });
        return; // Detener la ejecución si algún campo está vacío
      } else {
        // Crear un objeto con los datos del formulario
        const userData = {
          username: username,
          email: email,
          id_rol: rol_user,
          password_hash: password, // Enviar la contraseña sin encriptar
        };
        agregarUsuario(userData)


      }
    } else {
      if (!username || !email || !rol_user ) {
        Swal.fire({
          icon: "info",
          title: "Missing Fields",
          text: "Please fill in all fields before submitting.",
          showConfirmButton: true,
        });
        return; // Detener la ejecución si algún campo está vacío
      } else {
         editarUsuario(idUser, username, email, password, rol_user);
      }


      
    }
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
      console.log(data)

      document.getElementById("loadingSpinner").style.display = "none";

      let roles = data.user_roles

      data = data["users"]
      if (data && data.length > 0) {
        var tableData = [];
        data.forEach((usuario) => {
          
          let botones = '';

          // Si el rol tiene permisos de editar y eliminar, mostramos los botones
          if (roles.can_update == true) {
            botones += `<button class="btn btn-outline-info btn-sm mr-2" data-id="${usuario.id}"><i class="fas fa-edit"></i></button>`;
          }
        
          if (roles.can_delete == true) {
            botones += `<button class="btn btn-outline-danger btn-sm" data-id="${usuario.id}"><i class="fas fa-trash"></i></button>`;
          }


          tableData.push([
            usuario.username,
            usuario.email,
            convertirFecha(usuario.created_at),
            convertirFecha(usuario.updated_at),
            usuario.user_roles.rol_name,
            convertirACheckbox(usuario.user_roles.can_read),
            convertirACheckbox(usuario.user_roles.can_update),
            convertirACheckbox(usuario.user_roles.can_create),
            convertirACheckbox(usuario.user_roles.can_delete),
            botones,
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
    title: "You're sure?",
    text: "You will not be able to reverse this action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
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
              title: "Deleted user",
              text: "The user was successfully deleted.",
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
              text: "Could not delete user.",
            });
          }
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was a problem trying to delete the user.",
          });
        });
    } else {
      // Si el usuario cancela, no hacer nada
      console.log("Elimination canceled.");
    }
  });
}

const editarUsuario = async (userId, username, email, password, id_rol) => {
  document.getElementById("saveUser").style.display = "none";
  document.getElementById("saveUserWithSpinner").style.display = "block";

  // Verificamos primero si el email ya está registrado en otro usuario
  const emailDuplicado = await verificarEmailDuplicado(email, userId);

  if (emailDuplicado) {
    Swal.fire({
      icon: "info",
      title: "Error",
      text: "The email is already registered with another user. Please use another.",
    });
    document.getElementById("saveUser").style.display = "block";
    document.getElementById("saveUserWithSpinner").style.display = "none";
    return false; // Si el email está duplicado, detenemos la ejecución
  }

  // Si no está duplicado, procedemos a actualizar el usuario
  const updatedData = {
    username,
    email,
    id_rol,
  };

  // Si se proporciona una nueva contraseña, la agregamos
  if (password) {
    updatedData.password_hash = password;
  }

  try {
    // Realizamos la solicitud PUT para actualizar el usuario
    const response = await fetch(`/users/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    // Verificamos si la actualización fue exitosa
    if (data.message) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "The user was successfully updated.",
        timer: 2000, // Se cierra automáticamente después de 2 segundos
        showConfirmButton: false,
      });
      cargarUsuarios();
      document.getElementById("saveUser").style.display = "block";
      document.getElementById("saveUserWithSpinner").style.display = "none";
      document.getElementById("closeModalUsuarioBtn").click();
      

      return true; // Actualización exitosa
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error updating the user.",
      });
      return false; // Error al actualizar
      document.getElementById("saveUser").style.display = "block";
      document.getElementById("saveUserWithSpinner").style.display = "none";
    }

    
  } catch (error) {
    console.error("Error en la solicitud:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error in the request.",
    });
    document.getElementById("saveUser").style.display = "block";
    document.getElementById("saveUserWithSpinner").style.display = "none";
    return false; // Error en la solicitud
  }
};

const verificarEmailDuplicado = async (email, userId) => {

  try {
    const response = await fetch(`/users/list`);
    const usersList = await response.json();

    console.log(usersList.users)

    let usuarios =usersList.users

    userId = Number(userId); // Convertimos userId a número

    // Verificar si existe otro usuario con el mismo email que no sea el actual
    const emailExistente = usuarios.find((user) => {
      const userIdDB = Number(user.id); // Convertimos el ID en la BD a número

      return user.email === email && userIdDB !== userId;
    });

    return emailExistente !== undefined; // Retorna true si hay otro usuario con ese email
  } catch (error) {
    console.error("Error verifying email:", error);
    alert("Hubo un error al verificar el email.");
    return true; // Evita que se actualice el usuario si hay un error
  }
};

const cargarRoles = async () => {
  try {
    const response = await fetch("/rol_users/list"); // Espera la respuesta de la API
    const data = await response.json(); // Convierte la respuesta a formato JSON

    const selectElement = document.getElementById("user_roles"); // Obtener el select
    selectElement.innerHTML = ""; // Limpiar las opciones previas

    // Agregar una opción vacía por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select role";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    // Recorrer los datos recibidos y agregar las opciones
    data.forEach((role) => {
      const option = document.createElement("option");
      option.value = role.id; // Asumiendo que cada rol tiene un campo 'id'
      option.textContent = role.rol_name; // Asumiendo que cada rol tiene un campo 'rol_name'
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading roles:", error); // Manejo de errores
  }
};

 const agregarUsuario = async (userData) => {
    document.getElementById("saveUser").style.display = "none";
    document.getElementById("saveUserWithSpinner").style.display = "block";

    // Enviar los datos al backend
    await fetch("/users/add", {
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
              title: "Error adding user",
              text: "The email is already registered in the system.",
              showConfirmButton: true,
            });
          } else {
            // Si hay otro tipo de error, lo mostramos genéricamente
            Swal.fire({
              icon: "error",
              title: "Error adding user",
              text: data.error,
              showConfirmButton: true,
            });
          }
        } else {
          // Si no hubo error, mostrar mensaje de éxito
          Swal.fire({
            icon: "success",
            title: "Added User",
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
        alert("There was a problem adding the user.");
      });

      document.getElementById("saveUser").style.display = "block";
      document.getElementById("saveUserWithSpinner").style.display = "none";
}

const convertirACheckbox = (valor) => 
  valor ? `<i class="fas fa-check-circle" style="color: green;"></i>` : `<i class="fas fa-times-circle" style="color: red;"></i>`;