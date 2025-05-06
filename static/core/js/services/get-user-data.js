const setUserData = () => {
  document.getElementById("configurar_cuenta").addEventListener("click", async function () {
    disableInputs();
    getUserData();
  });
};

const getUserData = () => {
  fetch("/userData")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("userName-settings").value = data[0]["username"];
      document.getElementById("userEmail-settings").value = data[0]["email"];

      enableInputs();
      // ejemplo: document.getElementById("user_name_welcome").innerHTML = `¡Hola, ${data.name}!`;
    })
    .catch((error) => {
      enableInputs();
    });
};

const disableInputs = () => {
  document.getElementById("userName-settings").disabled = true;
  document.getElementById("userEmail-settings").disabled = true;
  document.getElementById("save-data-user-settings").disabled = true;
};

const enableInputs = () => {
  document.getElementById("userName-settings").disabled = false;
  document.getElementById("userEmail-settings").disabled = false;
  document.getElementById("save-data-user-settings").disabled = false;
};

export { setUserData, getUserData };
