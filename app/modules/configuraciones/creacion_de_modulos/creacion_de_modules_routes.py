from flask import Blueprint, jsonify, request
import os

from app.modules.configuraciones.creacion_de_modulos.utils.html_sub_modulo import crear_html
from app.modules.configuraciones.creacion_de_modulos.utils.js_sub_modulo import crear_archivo_js
from app.modules.configuraciones.creacion_de_modulos.utils.css_sub_modulo import crear_css
from app.modules.configuraciones.creacion_de_modulos.utils.py_sub_modulo import crear_py

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
    textoNormal = payload["textoNormal"] #guardar en la base de datos
    texto_guion = payload["texto_guion"] #crear modulo python
    texto_guion_bajo = payload["texto_guion_bajo"] #crear modulo static js css
    
    try:
        # Crear carpeta de módulo python
        python_ruta = os.path.join("app/modules")
        os.makedirs(os.path.join(python_ruta, texto_guion_bajo), exist_ok=True)
        
        # Crear carpeta de módulo static js css
        css_js_ruta = os.path.join("static/modules")
        os.makedirs(os.path.join(css_js_ruta, texto_guion), exist_ok=True)
        
        # Crear carpeta de módulo static html
        html_ruta = os.path.join("templates/modules")
        os.makedirs(os.path.join(html_ruta, texto_guion), exist_ok=True)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@creacion_de_modulos_bp.route("/crear_sub_modulo", methods=["POST"])
def crear_sub_modulo():
    payload = request.get_json()
    textoNormal = payload["textoNormal"] #guardar en la base de datos #nombre módulo
    texto_guion = payload["texto_guion"] #crear modulo python
    texto_guion_bajo = payload["texto_guion_bajo"] #crear modulo static js css
    textoNormalSubModulo = payload["textoNormal_sub_modulo"] #guardar en la base de datos #nombre sub módulo
    texto_guion_sub_modulo = payload["texto_guion_sub_modulo"] #crear modulo python
    texto_guion_bajo_sub_modulo = payload["texto_guion_bajo_sub_modulo"] #crear modulo static js css
    

    ruta_python = "app/modules/"+texto_guion_bajo
    ruta_js_css = "static/modules/"+texto_guion
    ruta_html = "templates/modules/"+texto_guion

    try:
        # Crear carpeta de módulo python
        python_ruta = os.path.join(ruta_python)
        os.makedirs(os.path.join(python_ruta, texto_guion_bajo_sub_modulo), exist_ok=True)
        crear_py(python_ruta,texto_guion_bajo_sub_modulo,texto_guion,texto_guion_sub_modulo,texto_guion_bajo)
        
        # Crear carpeta de módulo static js css
        css_js_ruta = os.path.join(ruta_js_css)
        os.makedirs(os.path.join(css_js_ruta, texto_guion_sub_modulo), exist_ok=True)
        
        css_ruta = os.path.join(ruta_js_css+"/"+texto_guion_sub_modulo)
        os.makedirs(os.path.join(css_ruta, "css"), exist_ok=True)
        crear_css(css_ruta,texto_guion_sub_modulo,)
        
        js_ruta = os.path.join(ruta_js_css+"/"+texto_guion_sub_modulo)
        os.makedirs(os.path.join(js_ruta, "js"), exist_ok=True)
        crear_archivo_js(js_ruta,texto_guion,texto_guion_sub_modulo)
        
        # Crear carpeta de módulo static html
        crear_html(ruta_html,texto_guion_sub_modulo,textoNormalSubModulo, texto_guion)
        return jsonify({"success": True})
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
    
