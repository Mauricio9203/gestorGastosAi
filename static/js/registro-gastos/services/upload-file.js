import { notificationToastify } from "../../utils/notifications-toastify.js";

//subir a cloudflare
const sendFileUpload = async (file) => {
  console.log(file.file); // Asegúrate de que `file.file` esté correctamente definido
  console.log(file.file.name); // Verifica el nombre del archivo

  const formData = new FormData();
  formData.append("file", file.file, file.file.name);

  try {
    // Realizar la solicitud fetch para subir el archivo
    const response = await fetch("/upload_file", {
      method: "POST",
      body: formData,
    });

    const data = await response.json(); // Esperamos la respuesta como JSON

    if (data.url) {
      notificationToastify("Archivo cargado con éxito", 3000, "bottom", "right", "success");
      return data.url; // Devolvemos la URL
    } else {
      notificationToastify("Error" + data.error, 3000, "bottom", "right", "danger");
      return data.error; // Si hay un error, lo retornamos
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Error al subir el archivo.");
    return error; // Retornamos el error si algo falla
  }
};

export { sendFileUpload };
