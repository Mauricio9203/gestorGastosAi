import os

def crear_py(py_ruta, texto_guion_bajo_sub_modulo,texto_guion,texto_guion_sub_modulo):
    print(py_ruta)
    print(texto_guion_bajo_sub_modulo)
    # Crear carpeta si no existe
    os.makedirs(py_ruta, exist_ok=True)

    # Ruta completa del archivo py
    ruta_archivo_py = os.path.join(py_ruta+"/"+texto_guion_bajo_sub_modulo, texto_guion_bajo_sub_modulo + ".py")

    # Contenido exactamente como lo quieres, respetando espacios
    contenido_py = (
        "from flask import Blueprint, jsonify, request\n\n"
        "# Crear un Blueprint para los usuarios\n"
        f"{texto_guion_bajo_sub_modulo}_bp = Blueprint('{texto_guion_bajo_sub_modulo}', __name__)\n\n"
        f"@{texto_guion_bajo_sub_modulo}_bp.route('/ruta_base', methods=['POST'])\n"
        "def echo_data():\n"
        "    data = request.get_json()\n"
        "    return jsonify(data)\n"
    )
    # Crear archivo py
    with open(ruta_archivo_py, "w", encoding="utf-8") as archivo:
        archivo.write(contenido_py)
        
    # Llamar a la función con los parámetros deseados
    agregar_ruta_a_app('/'+texto_guion_sub_modulo, texto_guion_bajo_sub_modulo, 'modules/'+texto_guion+'/'+texto_guion_sub_modulo+'.html')
        
def agregar_ruta_a_app(ruta, nombre_funcion, plantilla):
    # Ruta del archivo Python donde deseas agregar la nueva ruta (ejemplo: 'app.py')
    archivo_py = 'index.py'

    # Abrir el archivo y leer su contenido
    with open(archivo_py, 'r', encoding='utf-8') as archivo:
        contenido = archivo.readlines()

    # Buscar la línea donde está el bloque if __name__ == '__main__':
    posicion_main = None
    for i, linea in enumerate(contenido):
        if linea.strip() == 'if __name__ == \'__main__\':':
            posicion_main = i
            break

    if posicion_main is None:
        raise Exception("No se encontró el bloque 'if __name__ == '__main__':' en el archivo")

    # Crear la nueva ruta a agregar
    nueva_ruta = f"""
@app.route('{ruta}')
@login_required
def {nombre_funcion}():
    return render_template('{plantilla}')\n
"""
    
    # Insertar la nueva ruta antes del bloque `if __name__ == '__main__':`
    contenido.insert(posicion_main, nueva_ruta)

    # Escribir los cambios de vuelta al archivo
    with open(archivo_py, 'w', encoding='utf-8') as archivo:
        archivo.writelines(contenido)

    print(f"Ruta '{ruta}' agregada correctamente al archivo '{archivo_py}'")



#agregar registro de blue print

        