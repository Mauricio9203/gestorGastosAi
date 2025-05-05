import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { totalReceipts } from "./total-boletas.js";
import { totalGastado } from "./total-gastado.js";
import { totalBoletasNoRevisadas } from "./total-boletas-no-revisadas.js";
import { chartTotalGastoPorCategoria } from "./chart-total-gasto-por-categoria.js";
import { chartTotalGastoPorComercio } from "./chart-total-gasto-por-comercio.js";

const detectarCambiosBoleta = async () => {
  const supabaseUrl = "https://anvmidwmtgkhtesxtdsk.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFudm1pZHdtdGdraHRlc3h0ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNDgxOTMsImV4cCI6MjA1MzYyNDE5M30.848n_1vRqoMJXUPtdzQKffW1DJkZYG53rt7TXMbVWSE";
  const supabase = createClient(supabaseUrl, supabaseKey);

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
        console.log("🎯 Cambio detectado en boletas:", payload);
        ejecutarAcciones();
      }
    )
    .subscribe();
};

const ejecutarAcciones = () => {
  console.log("ejecutando acciones");
  totalReceipts();
  totalGastado();
  chartTotalGastoPorCategoria();
  totalBoletasNoRevisadas();
  chartTotalGastoPorComercio();
};
export { detectarCambiosBoleta };
