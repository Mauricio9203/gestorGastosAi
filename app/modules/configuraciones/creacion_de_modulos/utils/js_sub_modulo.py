import os

def crear_archivo_js(ruta_js,texto_guion,texto_guion_sub_modulo):
    # Ruta completa donde se creará la carpeta 'js'
    js_ruta = os.path.join(ruta_js, "js")
    
    # Crear la carpeta si no existe
    os.makedirs(js_ruta, exist_ok=True)
    
    # Ruta del archivo JS que se va a crear
    ruta_archivo_js = os.path.join(js_ruta, "index.js")
    
    # Contenido básico del archivo JS
    contenido_js = """import {{ addCustomActiveClass }} from "../../../../utils/sidebarConfig.js";

    window.addEventListener("DOMContentLoaded", function () {{
      const linkId = "{0}Link";
      const subLinkId = "{1}Link";
      const collapseId = "{0}";
      const arrow = "{0}Arrow";

      addCustomActiveClass(linkId, subLinkId, collapseId, arrow);
    }});
    """.format(texto_guion_sub_modulo,texto_guion)

    # Crear el archivo JS
    with open(ruta_archivo_js, "w", encoding="utf-8") as archivo:
        archivo.write(contenido_js)

