from flask import Blueprint, jsonify, request, session
from app.services.crud import get_record, delete_records
from app.utils.bucket_cloudflare import eliminar_archivo

# Crear un Blueprint para los usuarios
gastos_registrados_bp = Blueprint('gastos_registrados', __name__)

@gastos_registrados_bp.route('/boletas/list', methods=['GET'])
def lista_boletas():
    response = get_record(
        table="boletas",
        #filters={"username": "editado"}, ejemplo solo si quiero filtrar es como un where en sql
        filters={'id_usuario':session['id_user']},
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
    

@gastos_registrados_bp.route('/boletas/eliminar_boletas', methods=['POST'])
def eliminar_boletas():
    data = request.get_json()

    if not data or not isinstance(data, list):
        return jsonify({"error": "Se esperaba una lista JSON con objetos {id_boleta, url_boleta}"}), 400

    errores = []
    eliminadas = []

    for item in data:
        id_boleta = item.get('id_boleta')
        archivo_key = item.get('url_boleta')

        if not id_boleta or not archivo_key:
            errores.append({"id_boleta": id_boleta, "error": "Faltan campos"})
            continue

        # Eliminar archivo
        if not eliminar_archivo(archivo_key):
            errores.append({"id_boleta": id_boleta, "error": "No se pudo eliminar archivo"})
            continue

        # Eliminar boleta
        resultado = delete_records(
            table_name="boletas",
            ids={id_boleta}
        )

        if not resultado:
            errores.append({"id_boleta": id_boleta, "error": "No se pudo eliminar boleta"})
            continue

        eliminadas.append(id_boleta)

    return jsonify({
        "eliminadas": eliminadas,
        "errores": errores
    })


    

