from flask import Blueprint, jsonify, session, request
from app.services.crud import get_record, get_record_function, create_record_multiple
from datetime import datetime, timezone
import json
import re
import os
import google.generativeai as genai

# Configura la API Key
genai.configure(api_key=os.getenv("API_KEY_GEMINI"))

model = genai.GenerativeModel("gemini-1.5-flash")

# Crear un Blueprint para los usuarios
listado_de_ingredientes_bp = Blueprint('listado_de_ingredientes', __name__)

@listado_de_ingredientes_bp.route('/ingredientes-maestros', methods=['GET'])
def ingredientes_maestros():
    response = get_record(
        table="ingredientes_maestros",
        filters={'id_usuario': session['id_user']},
        select_columns="*"
    )
    return jsonify({
        "ingredientes_maestros": response if response else []
    })

@listado_de_ingredientes_bp.route('/ingredientes-nuevos', methods=['GET'])
def ingredientes_nuevos():
    response = get_record_function(
        function_name="get_missing_ingredients",
        params={"user_id": int(session['id_user'])}
    )
    return jsonify({
        "ingredientes_nuevos": response if response else []
    })

@listado_de_ingredientes_bp.route('/ingredientes-nuevos-insercion-masiva', methods=['POST'])
def insertar_ingredientes_nuevos():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibió data"}), 400

        user_id = int(session['id_user'])

        # Eliminar duplicados por nombre_generico
        unique = {}
        for item in data:
            if "nombre_generico" in item:
                unique[item["nombre_generico"].strip().lower()] = item
        data = list(unique.values())

        # Obtener los porcentajes de rendimiento (función síncrona)
        porcentajes_rendimiento = obtener_porcentajes_rendimiento(data)
        print(porcentajes_rendimiento)

        registros = []
        for item in porcentajes_rendimiento:
            if "nombre_generico" in item and "unidad_medida" in item:
                registros.append({
                    "nombre": item["nombre_generico"].strip(),
                    "unidad_base": item["unidad_medida"].strip(),
                    "porcentaje_rendimiento": item.get("porcentaje_rendimiento", 100),  # asignar 100 si no hay
                    "id_usuario": user_id,
                    "activo": True,
                    # created_at y updated_at se agregan dentro de create_record_multiple
                })

        if not registros:
            return jsonify({"error": "No se encontraron elementos válidos"}), 400

        insertados = create_record_multiple("ingredientes_maestros", registros)
        return jsonify({"insertados": insertados}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def obtener_porcentajes_rendimiento(ingredientes):
    """
    Recibe una lista de diccionarios con ingredientes,
    y devuelve un JSON con el porcentaje de rendimiento estimado para cada uno,
    usando Gemini para generar la respuesta.
    """
    lista_texto = json.dumps(ingredientes, ensure_ascii=False)
    prompt = f"""
    Para cada ingrediente en esta lista, define un porcentaje estimado de rendimiento basado en su tipo común y unidad de medida.
    Devuelve SOLO un JSON con la lista de objetos en este formato EXACTO:
    [
      {{ "nombre_generico": "huevos", "unidad_medida": "unidades", "porcentaje_rendimiento": 85 }},
      ...
    ]
    NO incluyas texto adicional, ni explicaciones, ni markdown, solo el JSON.
    
    Aquí está la lista de ingredientes:
    {lista_texto}
    """

    response = model.generate_content(prompt)

    if response and response.candidates:
        text_response = response.candidates[0].content.parts[0].text

        try:
            json_result = json.loads(text_response)
            return json_result
        except json.JSONDecodeError:
            # Intentar limpiar con regex si falla el parseo
            json_match = re.search(r'\[.*\]', text_response, re.DOTALL)
            if json_match:
                try:
                    json_result = json.loads(json_match.group(0))
                    return json_result
                except json.JSONDecodeError as e:
                    return [{"error": f"JSON inválido después de limpiar: {e}"}]
            else:
                return [{"error": "No se encontró JSON válido en la respuesta."}]
    else:
        return [{"error": "No se recibió respuesta válida del modelo."}]
