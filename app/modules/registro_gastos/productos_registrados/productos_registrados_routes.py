from flask import Blueprint, jsonify, request,session
from app.services.crud import get_record_function, get_record, actualizacion_masiva_ingredientes_maestros, update_record

# Crear un Blueprint para los usuarios
productos_registrados_bp = Blueprint('productos_registrados', __name__)

@productos_registrados_bp.route('/productos-registrados/detalle-boleta', methods=['GET'])
def productos_registrados():
    # Si quieres controlar el filtro de nulos por parámetro opcional
    p_solo_nulos = request.args.get('p_solo_nulos', 'false').lower() == 'true'
    response = get_record_function(
        function_name="obtener_detalle_boletas",
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
    
@productos_registrados_bp.route('/ingredientes-coincidencias', methods=['GET'])
def encontrar_coincidencias_ingredientes():
    response = get_record_function(
        function_name="db_encontrar_coincidencias_ingredientes_maestros",
        params={"uid": int(session['id_user'])}
    )

    return jsonify({
        "coincidencias_ingredientes": response if response else []
    })
    
@productos_registrados_bp.route('/actualizacion-masiva-ingredientes-maestros', methods=['POST'])
def actualizacion_masiva_fk_ingrediente_maestro():
    try:
        payload = request.get_json()
        print("Tipo payload:", type(payload))
        print("Primer elemento payload:", payload[0] if payload else None)
        resultado = actualizacion_masiva_ingredientes_maestros(payload)
        return jsonify({"success": True, "result": resultado})
    except Exception as e:
        print("Error en actualizacion_masiva_fk_ingrediente_maestro:", e)
        return jsonify({"error": str(e)}), 400
    
@productos_registrados_bp.route('/detalle_boleta/updateFields', methods=['PUT'])
def actualizar_campo_boleta():  # <- agregar aquí
    try:
        boleta_data = request.get_json()
        print(boleta_data)
        
        id_detalle_boleta = boleta_data["id_detalle_boleta"]  # Usar el ID de la URL
        campo = boleta_data["campo"]
        valor = boleta_data["valor"]
        # Ya no necesitas obtener `boleta_id` del body porque viene por la URL
        
        update_data = {campo: valor}
        response = update_record("detalle_boleta", update_data, {"id": id_detalle_boleta})
        
        if response:
            return jsonify({"message": "Detalle de boleta actualizado exitosamente", "boleta": response}), 200
        else:
            return jsonify({"error": "Error al actualizar Detalle de boleta"}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
