from flask import Blueprint, jsonify, request
from app.services.crud import get_record

# Crear un Blueprint para los usuarios
gastos_registrados_bp = Blueprint('gastos_registrados', __name__)

@gastos_registrados_bp.route('/boletas/list', methods=['GET'])
def lista_boletas():
    response = get_record(
        table="boletas",
        #filters={"username": "editado"}, ejemplo solo si quiero filtrar es como un where en sql
        filters={},
        select_columns="id, created_at,updated_at,fecha_boleta,nombre_comercio,rut_comercio,total_neto,total_bruto, porcentaje_iva,confirmacion_revision, url_boleta"
    )
    return jsonify({
        "boletas": response if response else []
    })
    
@gastos_registrados_bp.route('/boletas/detalle_boleta', methods=['GET'])
def detalle_boleta():
    id_boleta = request.args.get('id_boleta')

    response = get_record(
        table="detalle_boleta",
        filters={"id_boleta": id_boleta}, 
        select_columns="id, created_at,updated_at,nombre_item, precio_total, precio_unitario, nombre_categoria,cantidad,cantidad_contenido_unidad, unidad_medida,id_boleta"
    )

    return jsonify({
        "detalle_boleta": response if response else []
    })
    

