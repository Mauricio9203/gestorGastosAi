import boto3
from botocore.client import Config
import os
from dotenv import load_dotenv
import uuid
from app.utils.comprimir_imagen import comprimir_imagen_memoria

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# ==== CONFIGURACIÓN (rellena con tus datos) ====

ACCESS_KEY_ID = '9d24206a11bc740bd7a1d16a7d213cfd'        # <-- Tu Access Key de Cloudflare R2
SECRET_ACCESS_KEY = 'b7ecd088691edd754e39cafc8b51a0c33d10b79b5907877364cd3bde46834864'     # <-- Tu Secret Key de Cloudflare R2
ACCOUNT_ID = 'e8b3ab98814698c7daf1295aa93037d0'           # <-- Tu ID de cuenta en Cloudflare (está en la URL)
BUCKET_NAME = 'boletas'    # <-- El nombre del bucket en R2
ENDPOINT_URL = f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com'

 #os.getenv("CLOUDFLARE_BUCKET_NAME")

# ==== CONEXIÓN ====

s3 = boto3.client(
    's3',
    endpoint_url=ENDPOINT_URL,
    aws_access_key_id=ACCESS_KEY_ID,
    aws_secret_access_key=SECRET_ACCESS_KEY,
    config=Config(signature_version='s3v4'),
    region_name='auto'  # Cloudflare usa 'auto'
)

# ==== FUNCIÓN PARA SUBIR ====
def generar_nombre_unico(nombre_objeto_en_r2):
    """
    Función para generar un nombre único para el archivo, agregando un sufijo con UUID.
    """
    nombre, extension = nombre_objeto_en_r2.rsplit('.', 1)
    nuevo_nombre = f"{nombre}_{uuid.uuid4().hex}.{extension}"
    return nuevo_nombre

def subir_archivo(file_object, nombre_objeto_en_r2, tiempo_expiracion=3600):
    try:
        nombre_objeto_en_r2 = generar_nombre_unico(nombre_objeto_en_r2)
        # Usar 'upload_fileobj' para trabajar con un objeto 'file-like' (FileStorage)
        s3.upload_fileobj(file_object, BUCKET_NAME, nombre_objeto_en_r2)
        print(f"✅ Archivo subido como '{nombre_objeto_en_r2}' exitosamente.")


     
        # Generar y retornar la URL firmada
        url = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': nombre_objeto_en_r2
            },
            ExpiresIn=tiempo_expiracion
        )
        return url

    except Exception as e:
        print(f"❌ Error al subir el archivo: {e}")
        return None

# ==== EJEMPLO DE USO ====

# Asegúrate que 'boleta_woolworths.jpg' exista en el mismo directorio que_
