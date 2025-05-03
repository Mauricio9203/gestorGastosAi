import os

def crear_css(css_ruta, texto_guion_sub_modulo):
    print(css_ruta)
    print(texto_guion_sub_modulo)
    # Crear carpeta si no existe
    os.makedirs(css_ruta, exist_ok=True)

    # Ruta completa del archivo css
    ruta_archivo_css = os.path.join(css_ruta+"/css", texto_guion_sub_modulo + ".css")

    # Contenido básico del css con placeholders para las variables
    contenido_css = """ 
   
    """
    # Crear archivo css
    with open(ruta_archivo_css, "w", encoding="utf-8") as archivo:
        archivo.write(contenido_css)
        