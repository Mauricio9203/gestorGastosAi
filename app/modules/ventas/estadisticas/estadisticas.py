from flask import Blueprint, jsonify, request

# Crear un Blueprint para los usuarios
estadisticas_bp = Blueprint('estadisticas', __name__)

@estadisticas_bp.route('/ruta_base', methods=['POST'])
def echo_data():
    data = request.get_json()
    return jsonify(data)
