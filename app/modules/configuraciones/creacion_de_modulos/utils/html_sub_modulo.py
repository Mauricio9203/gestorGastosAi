import os

def crear_html(html_ruta, texto_guion_sub_modulo, titulo_sub_modulo,texto_guion):
    # Crear carpeta si no existe
    os.makedirs(html_ruta, exist_ok=True)

    # Ruta completa del archivo HTML
    ruta_archivo_html = os.path.join(html_ruta, texto_guion_sub_modulo + ".html")

    # Contenido básico del HTML con placeholders para las variables
    contenido_html = """ 
    <link rel="stylesheet" href="{{ url_for('static', filename='modules/{modulo}/{submodulo}/css/{submodulo}.css') }}" />

    <div class="container-fluid py-4">
    <h3 class="text-dark d-flex align-items-center text-shadow">
        <i class="fas fa-chart-line mr-2"></i>
        {titulo_sub_modulo}
    </h3>

    <div class="row mt-3">
        <div class="col-md-12 mt-2">
        <div class="card rounded-lg border-0">
            <div class="card-body text-dark">contenido base</div>
        </div>
        </div>
    </div>
    </div>

    <script type="module" src="{{ url_for('static', filename='modules/{modulo}/{submodulo}/js/index.js') }}"></script>
    """

    # Reemplazar las variables con el método format()
    contenido_html = contenido_html.format(
        modulo=texto_guion, 
        submodulo=texto_guion_sub_modulo, 
        titulo_sub_modulo=titulo_sub_modulo
    )

    # Crear archivo HTML
    with open(ruta_archivo_html, "w", encoding="utf-8") as archivo:
        archivo.write(contenido_html)
        