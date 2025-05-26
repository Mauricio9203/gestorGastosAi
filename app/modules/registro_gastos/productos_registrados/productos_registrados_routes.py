from flask import Blueprint, jsonify, request,session
from app.services.crud import get_record_function, get_record

# Crear un Blueprint para los usuarios
productos_registrados_bp = Blueprint('productos_registrados', __name__)

@productos_registrados_bp.route('/productos-registrados/detalle-boleta', methods=['GET'])
def productos_registrados():
    # Si quieres controlar el filtro de nulos por parámetro opcional
    p_solo_nulos = request.args.get('p_solo_nulos', 'false').lower() == 'true'
    response = get_record_function(
        function_name="obtener_detalle_boleta",
        params={"p_id_usuario": int(session['id_user']), "p_solo_nulos": p_solo_nulos}
    )

    return jsonify({
        "detalle_boleta": response if response else []
    })

@productos_registrados_bp.route('/ingredientes-maestros-detalle-boleta', methods=['GET'])
def ingredientes_maestros_detalle_boleta():
    response = get_record(
        table="ingredientes_maestros",
        #filters={"username": "editado"}, ejemplo solo si quiero filtrar es como un where en sql
        filters={'id_usuario':session['id_user']},
        select_columns="id,nombre"
    )
    return jsonify({
        "ingredientes_maestros": response if response else []
    })
    

