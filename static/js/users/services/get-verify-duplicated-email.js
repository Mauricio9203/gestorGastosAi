// Función para verificar si el email está duplicado
const getVerifyDuplicatedEmail = async (email) => {
  try {
    const response = await fetch(`/users/verify_duplicated_email?email=${encodeURIComponent(email)}`, {
      method: "GET", // Método GET
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Si la respuesta es exitosa (código de estado 200)
    if (response.ok) {
      const data = await response.json(); // Parsear el JSON de la respuesta

      // Lógica dependiendo de la respuesta (por ejemplo, si la respuesta es true)
      if (data === true) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error("Error al verificar el email duplicado:", response.status);
      return "error";
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return "error";
  }
};

export { getVerifyDuplicatedEmail };
