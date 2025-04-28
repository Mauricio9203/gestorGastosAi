import boto3
from botocore.client import Config
import os
from dotenv import load_dotenv
import uuid
from app.utils.comprimir_imagen import comprimir_imagen_memoria

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# ==== CONFIGURACIÓN (rellena con tus datos) ====

ACCESS_KEY_ID = os.getenv("CLOUDFLARE_ACCESS_KEY_ID")  # Ya no es necesario el valor predeterminado aquí
SECRET_ACCESS_KEY = os.getenv("CLOUDFLARE_SECRET_ACCESS_KEY")
ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
BUCKET_NAME = os.getenv("CLOUDFLARE_BUCKET_NAME")
ENDPOINT_URL = f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com'

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
