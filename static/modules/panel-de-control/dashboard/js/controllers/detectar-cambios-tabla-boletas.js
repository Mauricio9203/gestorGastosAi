import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { totalReceipts } from "./total-boletas.js";
import { totalGastado } from "./total-gastado.js";
import { totalBoletasNoRevisadas } from "./total-boletas-no-revisadas.js";
import { chartTotalGastoPorCategoria } from "./chart-total-gasto-por-categoria.js";
import { chartTotalGastoPorComercio } from "./chart-total-gasto-por-comercio.js";

const detectarCambiosBoleta = async () => {
  const supabase = await obtenerCredencialesSupabase();

  const channel = supabase
    .channel("boletas-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "boletas",
      },
      (payload) => {
        let idUsuario = payload["new"]["id_usuario"];
        verificarUsuario(idUsuario);
      }
    )
    .subscribe();
};

const ejecutarAcciones = () => {
  totalReceipts();
  totalGastado();
  chartTotalGastoPorCategoria();
  totalBoletasNoRevisadas();
  chartTotalGastoPorComercio();
};

const verificarUsuario = (idUsuario) => {
  fetch(`/dashboard/comprobar_id_usuario?idUsuario=${idUsuario}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.verificacion) {
        ejecutarAcciones();
      }
    })
    .catch((error) => {
      console.error("Error al comprobar el ID:", error);
    });
};

const obtenerCredencialesSupabase = async () => {
  try {
    const response = await fetch(`/dashboard/credenciales_supabase`);
    const data = await response.json();
    const supabaseUrl = data["supabaseUrl"];
    const supabaseKey = data["supabaseKey"];
    const supabase = createClient(supabaseUrl, supabaseKey);
    return supabase;
  } catch (error) {
    console.error("Error al obtener las credenciales de Supabase:", error);
    return null;
  }
};

export { detectarCambiosBoleta, ejecutarAcciones };
