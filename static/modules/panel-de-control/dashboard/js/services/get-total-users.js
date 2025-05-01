const getTotalUsers = async () => {
    try {
      const response = await fetch("/dashboard/count_users"); // Aquí va la ruta del endpoint que llamará a tu API Flask
      
      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", response.status);
        return false;
      }else {
        const data =  await response.json();
        return data
      }
  
    } catch (error) {
      console.error("Error al obtener el total de usuarios:", error);
    }
   }

   export {
    getTotalUsers
   }