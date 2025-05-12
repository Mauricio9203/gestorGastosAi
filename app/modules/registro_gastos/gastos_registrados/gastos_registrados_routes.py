from flask import Blueprint, jsonify, request, session
from app.services.crud import get_record, delete_records
from app.utils.bucket_cloudflare import eliminar_archivo
from app.services.crud import update_record, create_record

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
    
@gastos_registrados_bp.route('/boleta/updateFields/<int:boleta_id>', methods=['PUT'])
def actualizar_campo_boleta(boleta_id):  # <- agregar aquí
    try:
        boleta_data = request.get_json()
        print(boleta_data)
        
        campo = boleta_data["campo"]
        valor = boleta_data["valor"]
        # Ya no necesitas obtener `boleta_id` del body porque viene por la URL
        
        update_data = {campo: valor}
        response = update_record("boletas", update_data, {"id": boleta_id})
        
        if response:
            return jsonify({"message": "Boleta o factura actualizado exitosamente", "boleta": response}), 200
        else:
            return jsonify({"error": "Error al actualizar Boleta o factura"}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@gastos_registrados_bp.route('/boleta/updateFieldsDetalleBoleta/<int:detalle_boleta_id>', methods=['PUT'])
def actualizar_campo_detalle_boleta(detalle_boleta_id):  # <- agregar aquí
    try:
        detalle_boleta_data = request.get_json()
        print(detalle_boleta_data)
        
        campo = detalle_boleta_data["campo"]
        valor = detalle_boleta_data["valor"]
        # Ya no necesitas obtener `boleta_id` del body porque viene por la URL
        
        update_data = {campo: valor}
        response = update_record("detalle_boleta", update_data, {"id": detalle_boleta_id})
        
        if response:
            return jsonify({"message": "Detalle de boleta actualizado exitosamente", "detalle_boleta": response}), 200
        else:
            return jsonify({"error": "Error al actualizar detalle de boleta"}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@gastos_registrados_bp.route('/boletas/eliminar_detalle_boleta', methods=['POST'])
def eliminar_detalle_boleta():
    data = request.get_json()

    if not data or not isinstance(data, list):
        return jsonify({"error": "Se esperaba una lista JSON con objetos {id_detalle_boleta}"}), 400

    errores = []
    eliminadas = []

    for item in data:
        id_boleta = item.get('id_detalle_boleta')

        if not id_boleta:
            errores.append({"id_detalle_boleta": id_boleta, "error": "Falta id_detalle_boleta"})
            continue

        resultado = delete_records(
            table_name="detalle_boleta",
            ids={id_boleta}
        )

        if not resultado:
            errores.append({"id_detalle_boleta": id_boleta, "error": "No se pudo eliminar boleta"})
            continue

        eliminadas.append(id_boleta)

    return jsonify({
        "eliminadas": eliminadas,
        "errores": errores
    })
    
@gastos_registrados_bp.route('/registro_gastos/crear_detalle_boleta', methods=['POST'])
def crear_detalle_boleta():
    try:
        nuevo_detalle = request.get_json()
        print(nuevo_detalle)
        #nuevo_detalle["id_usuario"] = int(session['id_user']) #agregar la id del usuario que creo la boleta
        try:
            # Asegúrate de que la variable que usas sea la correcta, aquí estoy usando nuevo_detalle
            detalle_boleta = create_record("detalle_boleta", nuevo_detalle)  
            print (detalle_boleta)
            return jsonify({"message": "Detalle de Boleta creada exitosamente", "detalle_boleta": detalle_boleta, "ok":True}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error al procesar la solicitud: " + str(e)}), 400





    

