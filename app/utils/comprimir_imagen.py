from PIL import Image
from io import BytesIO

# Ajustar esta función para recibir un objeto tipo Image
def comprimir_imagen_memoria(imagen, max_mb=1.5, max_dim=1200):
    """
    Comprime la imagen en memoria hasta un tamaño máximo de MB y redimensiona si es necesario.
    :param imagen: Imagen de tipo PIL.Image
    :param max_mb: Tamaño máximo permitido para la imagen comprimida en MB (por defecto 1.5MB)
    :param max_dim: Resolución máxima de la imagen (por defecto 1200px de ancho o alto)
    :return: Imagen comprimida en memoria o None si ocurrió un error
    """
    try:
        # Si la imagen es más grande que max_dim en cualquiera de sus dimensiones, redimensionarla
        if imagen.width > max_dim or imagen.height > max_dim:
            imagen.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)  # Usando LANCZOS en lugar de ANTIALIAS

        # Inicializar parámetros de compresión
        calidad = 85
        buffer = BytesIO()

        # Comprimir la imagen hasta que cumpla con el límite de tamaño
        while True:
            imagen.save(buffer, format="JPEG", quality=calidad, optimize=True)
            tamaño = buffer.tell() / (1024 * 1024)  # Tamaño en MB
            if tamaño <= max_mb or calidad <= 10:  # Si la imagen cumple con el tamaño o calidad mínima
                break
            calidad -= 5  # Reducir calidad en pasos de 5 (más suave)

        # Reiniciar el buffer a la posición inicial
        buffer.seek(0)
        return buffer

    except Exception as e:
        print(f"Hubo un error al comprimir la imagen: {e}")
        return None
