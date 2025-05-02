import os

def crear_archivo_js(ruta_js):
    # Ruta completa donde se creará la carpeta 'js'
    js_ruta = os.path.join(ruta_js, "js")
    
    # Crear la carpeta si no existe
    os.makedirs(js_ruta, exist_ok=True)
    
    # Ruta del archivo JS que se va a crear
    ruta_archivo_js = os.path.join(js_ruta, "index.js")
    
    # Contenido básico del archivo JS
    contenido_js = """import { addCustomActiveClass } from "../../../../utils/sidebarConfig.js";

//mover esto para configurar el sidebar del módulo
window.addEventListener("DOMContentLoaded", function () {
  const linkId = "moduloBaseLink"; // ID del enlace principal
  const subLinkId = "sub_modulo_baseLink"; // ID del subenlace
  const collapseId = "moduloBaseLink"; // ID de la lista que se expande
  const arrow = "moduloBaseArrow";

  addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
});
"""

    # Crear el archivo JS
    with open(ruta_archivo_js, "w", encoding="utf-8") as archivo:
        archivo.write(contenido_js)

