document.addEventListener("DOMContentLoaded", () => {
  addCustomActiveClass(); // Llama a la función cuando la página cargue
});

const addCustomActiveClass = () => {
  // Cambia estos valores según el enlace y la lista que quieras manejar
  const linkId = "configuracionesLink";  // ID del enlace principal
  const subLinkId = "usuarios";  // ID del subenlace
  const collapseId = "configuraciones";  // ID de la lista que se expande

  // Obtener referencias de los elementos del DOM
  const link = document.getElementById(linkId);
  const subLink = document.getElementById(subLinkId);
  const collapse = document.getElementById(collapseId);

  // Añadir las clases personalizadas a los enlaces
  link.classList.add("custom-active");
  subLink.classList.add("custom-active-sub");

  // Si no está expandida, expandirla
  if (link.getAttribute("aria-expanded") !== "true") {
    link.setAttribute("aria-expanded", "true");
    collapse.classList.add("show");  // Muestra el contenido de la lista
  }
};



// Ejemplo de datos en formato JSON (se puede simular como una variable)
var usuarios = [
  {
    "username": "Mauricio Garrido",
    "email": "mauriciogarridonz@gmail.com"
  },
  {
    "username": "José Pérez",
    "email": "jose@example.com"
  },
  {
    "username": "Mauricio Garrido",
    "email": "mauriciogarridonz@gmail.com"
  },
  {
    "username": "José Pérez",
    "email": "jose@example.com"
  },
  {
    "username": "Mauricio Garrido",
    "email": "mauriciogarridonz@gmail.com"
  },
  {
    "username": "José Pérez",
    "email": "jose@example.com"
  },
  {
    "username": "Mauricio Garrido",
    "email": "mauriciogarridonz@gmail.com"
  },
  {
    "username": "José Pérez",
    "email": "jose@example.com"
  },
  {
    "username": "Mauricio Garrido",
    "email": "mauriciogarridonz@gmail.com"
  },
  {
    "username": "José Pérez",
    "email": "jose@example.com"
  }
];

$(document).ready(function() {
  // Recorremos el array de usuarios y los agregamos a la tabla
  var tableData = [];
  $.each(usuarios, function(i, usuario) {
    tableData.push([
      usuario.username,
      usuario.email,
      '<button class="btn btn-outline-info btn-sm mr-2"><i class="fas fa-edit"></i></button><button class="btn btn-outline-danger btn-sm"><i class="fas fa-trash"></i></button>'
    ]);
  });

  // Inicializamos DataTable con los datos obtenidos
  $('#myTable').DataTable({
    data: tableData,
    responsive: true,  // Habilitar la responsividad
    language: {
      "sEmptyTable": "No hay datos disponibles",
      "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "sInfoEmpty": "Mostrando 0 a 0 de 0 entradas",
      "sInfoFiltered": "(filtrado de _MAX_ entradas en total)",
      "sInfoPostFix": "",
      "sLengthMenu": "Mostrar _MENU_ entradas",
      "sLoadingRecords": "Cargando...",
      "sProcessing": "Procesando...",
      "sSearch": "Buscar:",
      "sZeroRecords": "No se encontraron resultados",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }
    }
  });
});
