from flask import Blueprint, render_template

# Crear un Blueprint
bp = Blueprint('hola_mundo', __name__)

@bp.route('/holaMundo', methods=['GET'])
def hola_mundo():
    # Solo renderiza la plantilla 'hola-mundo.html'
    return render_template('hola-mundo.html', mensaje="Hola Mundo")
