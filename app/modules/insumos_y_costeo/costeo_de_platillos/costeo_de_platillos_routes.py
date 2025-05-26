from flask import Blueprint, jsonify, request

# Crear un Blueprint para los usuarios
costeo_de_platillos_bp = Blueprint('costeo_de_platillos', __name__)

@costeo_de_platillos_bp.route('/ruta_base', methods=['POST'])
def echo_data():
    data = request.get_json()
    return jsonify(data)
