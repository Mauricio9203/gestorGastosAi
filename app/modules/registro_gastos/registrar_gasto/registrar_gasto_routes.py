from flask import Blueprint, jsonify, request,session
from supabase import create_client, Client
from dotenv import load_dotenv
import os

#necesarias para que la app funcione
import google.generativeai as genai
import json
import re
from PIL import Image
from io import BytesIO

from app.utils.comprimir_imagen import comprimir_imagen_memoria
from app.utils.bucket_cloudflare import subir_archivo
from app.modules.registro_gastos.registrar_gasto.utils import convertir_pdf_a_imagen
from app.services.crud import create_record, create_record_multiple

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Configura la API Key
genai.configure(api_key=os.getenv("API_KEY_GEMINI"))

# Crear modelo 
model = genai.GenerativeModel(
    model_name="models/gemini-1.5-flash",
    system_instruction="""
Extrae de una imagen de boleta:

- Fecha debe ser en este formato siempre yyyy-mm-dd, comercio (nombre y RUT), total neto, total bruto, porcentaje IVA.
- Lista de ítems en orden: nombre, cantidad_items, cantidad_contenido, unidad_contenido, precio_unitario, precio_total, precio_neto, precio_bruto, categoría y unidad_medida.

Usa solo estas unidades de medida (en minúscula, sin abreviar): unidades, gramos, kilogramos, mililitros, litros, paquetes, docenas, botellas, latas, bolsas, cajas, bandejas, frascos, tubos, sachets. Si no sabes, usa "unidades".
La categoría debe ser definida por ti. No uses términos genéricos como "alimento" o "lácteos". Usa categorías específicas pero no excesivamente detalladas. Por ejemplo, si ves queso y yogurth, deben clasificarse como "quesos" y "yogurth", no ambos como "lácteos". Si no puedes clasificarlo, usa "otros".
El resultado debe ser un JSON válido. Si falta información, usa null. No incluyas texto adicional.

Ejemplo:
{
  "fecha": "2024-12-01",
  "comercio": "Supermercado ABC",
  "rut": "76.123.456-7",
  "items": [
    {
      "producto": "Arroz grado 1",
      "cantidad_items": 2,
      "cantidad_contenido": null,
      "unidad_contenido": null,
      "precio_unitario": 1490,
      "precio_total": 2980,
      "categoria": "arroz",
      "unidad_medida": "gramos"
    }
  ],
  "total_boleta_bruto": 9460,
  "total_boleta_neto": 7851.8,
  "porcentaje_iva": 17
}
"""
)



# Crear un Blueprint para los usuarios
registro_gastos_bp = Blueprint('registro_gastos', __name__)

@registro_gastos_bp.route('/registro_gastos/crear_boleta', methods=['POST'])
def crear_boleta():
    try:
        nueva_boleta = request.get_json()
        nueva_boleta["id_usuario"] = int(session['id_user']) #agregar la id del usuario que creo la boleta
        try:
            # Asegúrate de que la variable que usas sea la correcta, aquí estoy usando nueva_boleta
            boleta = create_record("boletas", nueva_boleta)  
            print (boleta)
            return jsonify({"message": "Boleta creada exitosamente", "boleta": boleta}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error al procesar la solicitud: " + str(e)}), 400
    
@registro_gastos_bp.route('/registro_gastos/detalle_boleta', methods=['POST'])
def crear_detalle_boleta():
    try:
        detalle_boleta = request.get_json()
        try:
            # Asegúrate de que la variable que usas sea la correcta, aquí estoy usando detalle_boleta
            detalle_boleta = create_record_multiple("detalle_boleta", detalle_boleta)  
            return jsonify({"message": "Detalles ingresados exitosamente", "detalle_boleta": detalle_boleta}), 201
        except Exception as e:
            print(str(e))
            return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(str(e))
        return jsonify({"error": "Error al procesar la solicitud: " + str(e)}), 400

@registro_gastos_bp.route('/upload_file', methods=['POST'])
def subir_archivo_a_r2():
    try:
        # Verificar que el archivo esté presente en la solicitud
        if 'file' not in request.files:
            return jsonify({"error": "No se encontró el archivo."}), 400

        # Obtener el archivo de la solicitud
        file = request.files['file']
        
       
            
        
        # Verificar que el archivo no esté vacío
        if file.filename == '':
            return jsonify({"error": "Nombre de archivo vacío."}), 400

        # Definir el nombre en R2, puedes cambiarlo si lo deseas
        nombre_objeto_en_r2 = f"boletas/{file.filename}"
        
        if file.mimetype == 'application/pdf':
            print("es un pdf")
        else:
            imagen = Image.open(BytesIO(file.read())).convert("RGB")
            file = comprimir_imagen_memoria(imagen)
                # Leer imagen directamente desde el archivo enviado

        # Usar la función para subir el archivo
        url_firmada = subir_archivo(file, nombre_objeto_en_r2)

        if url_firmada:
            return jsonify({"url": url_firmada}), 200
        else:
            return jsonify({"error": "Hubo un error al subir el archivo."}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@registro_gastos_bp.route('/extraer_items', methods=['POST'])
def analizar_boleta_desde_imagen():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No se encontró el archivo."}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({"error": "Nombre de archivo vacío."}), 400
        
        if file.mimetype == 'application/pdf':
            imagen = convertir_pdf_a_imagen(file.read())
        else:
              # Leer imagen directamente desde el archivo enviado
            imagen = Image.open(BytesIO(file.read())).convert("RGB")

      

        # Comprimir usando la función modular
        imagen_comprimida = comprimir_imagen_memoria(imagen)
        datos_imagen = imagen_comprimida.read()

        # Enviar a Gemini
        response = model.generate_content(
            {
                "parts": [
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": datos_imagen
                        }
                    }
                ]
            }
        )

        texto = response.text.strip()

        # Intentar extraer JSON
        try:
            return jsonify(json.loads(texto))
        except json.JSONDecodeError:
            match = re.search(r'{.*}', texto, re.DOTALL)
            if match:
                return jsonify(json.loads(match.group(0)))
            else:
                return jsonify({"error": "No se encontró JSON válido."}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500







  


