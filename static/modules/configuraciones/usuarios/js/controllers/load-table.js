import { tableSettings } from "../components/table-settings.js";
import { getUsers } from "../services/get-users.js";

let table;

//Iniciar Tabla
const loadTable = async () => {
  var data = await getUsers();
  var tabledata = data.users;

  //configuración de las columnas
  var column = [
    {
      hozAlign: "center",
      formatter: "rowSelection",
      width: 30,
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      cellClick: function (e, cell) {
        cell.getRow().toggleSelect();
      },
    },
    {
      title: "Name",
      field: "username",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Email",
      field: "email",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Rol",
      field: "user_roles.rol_name", // el arreglo está en este campo
      headerFilter: "select",
      headerFilterParams: {
        values: {
          "": "All", // valor por defecto (sin filtro)
          Admin: "Admin",
          Editor: "Editor",
          Viewer: "Viewer",
          Moderator: "Moderator",
        },
      },
      editor: "select",
      editorParams: {
        values: {
          Admin: "Admin",
          Editor: "Editor",
          Viewer: "Viewer",
          Moderator: "Moderator",
        }, // valores que aparecerán en el select
      },
    },
    {
      title: "Created At",
      field: "created_at",
      formatter: function (cell) {
        // Obtener la fecha desde el campo
        const date = new Date(cell.getValue());

        // Formatear la fecha y hora a "DD/MM/YYYY HH:mm:ss"
        const formattedDate = date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
        return formattedDate;
      },
      headerFilter: "input",
    },
    {
      title: "Updated At",
      field: "updated_at",
      formatter: (cell) => {
        // Obtener la fecha desde el campo
        const date = new Date(cell.getValue());

        // Formatear la fecha y hora a "DD/MM/YYYY HH:mm:ss"
        const formattedDate = date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
        return formattedDate;
      },
      headerFilter: "input",
    },
    {
      title: "Actions",
      field: "Actions",
      hozAlign: "center",
      formatter: function () {
        return `
       <button class="btn btn-sm changePass" title="Change password" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
        <i class="fas fa-key text-warning"></i>
      </button>`;
      },
      cellClick: function (e, cell) {
        const rowData = cell.getRow().getData();
        document.getElementById("changePasswordLabel").innerText = "Update Password: " + rowData.username;
        document.getElementById("users-modal-id-usuario").value = rowData.id;
      },
      headerSort: false,
    },
  ];

  var paginationSize = 10;
  var initialSort = [{ column: "created_at", dir: "desc" }];

  table = tableSettings(tabledata, paginationSize, initialSort, column);
};

// Exportar todo
export { loadTable, table };
