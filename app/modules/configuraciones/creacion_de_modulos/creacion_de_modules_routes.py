from flask import Blueprint, jsonify, request
import os

# Crear el Blueprint
creacion_de_modulos_bp = Blueprint('creacion_de_modulos', __name__)

@creacion_de_modulos_bp.route("/funcion_base", methods=["POST"])
def funcion_base():
    payload = request.get_json()
    # Ruta relativa basada en donde se ejecuta el script
    ruta_base = os.path.join("modules", "modulo_prueba")

    # Crear carpetas y archivos
    os.makedirs(os.path.join(ruta_base, "css"), exist_ok=True)

    try:
        result = "hola"
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

#esto creará la estructura de carpetas del módulo
@creacion_de_modulos_bp.route("/crear_modulo", methods=["POST"])
def crear_modulo():
    payload = request.get_json()
    
    # Crear carpeta de módulo python
    #python_ruta = os.path.join("app/modules")
    #os.makedirs(os.path.join(python_ruta, payload["nombreModulo"]), exist_ok=True)
    
    # Crear carpeta de módulo static js css
    #css_js_ruta = os.path.join("static/modules")
    #os.makedirs(os.path.join(css_js_ruta, payload["nombreModulo"]), exist_ok=True)
    
    # Crear carpeta de módulo static html
    #html_ruta = os.path.join("templates/modules")
    #os.makedirs(os.path.join(html_ruta, payload["nombreModulo"]), exist_ok=True)
    
    try:
        #obtener nombre de carpetas
        ruta_base = "app/modules"
        carpetas = [nombre for nombre in os.listdir(ruta_base) if os.path.isdir(os.path.join(ruta_base, nombre))]
        return jsonify({"success": True, "data": carpetas})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@creacion_de_modulos_bp.route("/obtener_lista_modulos", methods=["POST"])
def obtener_lista_modulos():
    try:
        #obtener nombre de carpetas
        ruta_base = "app/modules"
        carpetas = [nombre for nombre in os.listdir(ruta_base) if os.path.isdir(os.path.join(ruta_base, nombre))]
        return jsonify({"success": True, "data": carpetas})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@creacion_de_modulos_bp.route("/obtener_lista_sub_modulos", methods=["POST"])
def obtener_lista_sub_modulos():
    payload = request.get_json()
    
    try:
        #obtener nombre de carpetas
        ruta_base = "app/modules/"+payload["nombreModulo"]
        carpetas = [nombre for nombre in os.listdir(ruta_base) if os.path.isdir(os.path.join(ruta_base, nombre))]
        return jsonify({"success": True, "data": carpetas})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
