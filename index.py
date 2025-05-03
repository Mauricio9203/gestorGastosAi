from flask import Flask, render_template, redirect, url_for, session
from flask_cors import CORS  # Importar CORS

#importacion de registros blueprint
from app.auth.login import login_bp
from app.modules.configuraciones.usuarios.usuarios_routes import bp as users_bp
from app.modules.panel_de_control.dashboard.dashboard_routes import dashboard_bp
from app.modules.registro_gastos.registrar_gasto.registrar_gasto_routes import registro_gastos_bp
from app.modules.configuraciones.creacion_de_modulos.creacion_de_modules_routes import creacion_de_modulos_bp
from app.utils.decorators import login_required
from app.services.menu import modulos

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Habilitar CORS para todas las rutas

app.config['SECRET_KEY'] = 'mi_clave_secreta'
app.config['STATIC_FOLDER'] = 'static'

# Registra los Blueprints
app.register_blueprint(users_bp)
app.register_blueprint(login_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(registro_gastos_bp)
app.register_blueprint(creacion_de_modulos_bp)

@app.route('/')
@login_required
def index():
    return render_template('modules/panel-de-control/dashboard.html')


@app.route('/configuraciones/usuarios')
@login_required
def users():
    return render_template('modules/configuraciones/usuarios.html')


@app.route('/registro-gastos/registrar-gasto')
@login_required
def registro_gastos():
    return render_template('modules/registro-gastos/registrar-gasto.html')


@app.route('/modulo-base/sub-modulo-base')
@login_required
def modulo_base():
    return render_template('modules/modulo-base/sub-modulo-base.html')

@app.route('/configuraciones/creacion-de-modulos')
@login_required
def creacion_modulos():
    return render_template('modules/configuraciones/creacion-de-modulos.html')

@app.route('/logout')
@login_required
def logout():
    session.pop('email', None)
    return redirect(url_for('login.login_get'))


@app.route('/estadisticas')
@login_required
def estadisticas():
    return render_template('modules/ventas/estadisticas.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
