from flask import Blueprint, render_template

# Crear un Blueprint
bp = Blueprint('users', __name__)

@bp.route('/users', methods=['GET'])
def mostrar_usuarios():
    # Renderiza la plantilla 'users.html'
    return render_template('users.html')
