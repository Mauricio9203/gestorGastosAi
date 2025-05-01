import fitz  # pymupdf
from io import BytesIO
from PIL import Image

def convertir_pdf_a_imagen(file_bytes, dpi=150):
    """
    Convierte un PDF a una imagen JPEG.
    Si el PDF tiene varias páginas, las une verticalmente.
    Retorna una imagen PIL.Image.
    """
    documento = fitz.open(stream=file_bytes, filetype="pdf")
    imagenes = []

    for pagina in documento:
        pix = pagina.get_pixmap(dpi=dpi)
        img_bytes = pix.tobytes("jpeg")
        imagen = Image.open(BytesIO(img_bytes))
        imagenes.append(imagen)

    if not imagenes:
        raise ValueError("El PDF no contiene páginas.")

    if len(imagenes) == 1:
        return imagenes[0]
    else:
        # Unir imágenes verticalmente
        anchos, altos = zip(*(i.size for i in imagenes))
        ancho_total = max(anchos)
        alto_total = sum(altos)

        imagen_final = Image.new('RGB', (ancho_total, alto_total), color='white')

        y_offset = 0
        for img in imagenes:
            imagen_final.paste(img, (0, y_offset))
            y_offset += img.size[1]

        return imagen_final
