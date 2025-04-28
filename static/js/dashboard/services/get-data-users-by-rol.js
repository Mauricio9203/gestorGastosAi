const getDataUsersByRol = async () => {
    try {
      const response = await fetch("/dashboard/dashboard_roles");
  
      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", response.status);
        return false;
      }
  
      const data = await response.json();
  
      if (!Array.isArray(data) || data.length === 0) {
        return false;
      }
  
      return data;
  
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      return false;
    }
  };

  export {
    getDataUsersByRol
  }