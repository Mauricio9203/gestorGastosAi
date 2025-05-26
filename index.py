from flask import Flask, render_template, redirect, url_for, session
from flask_cors import CORS  # Importar CORS

#importacion de registros blueprint
from app.auth.login import login_bp
from app.modules.configuraciones.usuarios.usuarios_routes import bp as users_bp
from app.modules.panel_de_control.dashboard.dashboard_routes import dashboard_bp
from app.modules.registro_gastos.registrar_gasto.registrar_gasto_routes import registro_gastos_bp
from app.modules.configuraciones.creacion_de_modulos.creacion_de_modules_routes import creacion_de_modulos_bp
from app.modules.registro_gastos.gastos_registrados.gastos_registrados_routes import gastos_registrados_bp
from app.modules.insumos_y_costeo.listado_de_ingredientes.listado_de_ingredientes_routes import listado_de_ingredientes_bp
from app.modules.insumos_y_costeo.costeo_de_platillos.costeo_de_platillos_routes import costeo_de_platillos_bp
from app.modules.registro_gastos.productos_registrados.productos_registrados_routes import productos_registrados_bp
#fin importacion de registros blueprint

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
app.register_blueprint(gastos_registrados_bp)
app.register_blueprint(listado_de_ingredientes_bp)
app.register_blueprint(costeo_de_platillos_bp)
app.register_blueprint(productos_registrados_bp)
#Fin Registra los Blueprints

#fin blueprint

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

@app.route('/configuraciones/creacion-de-modulos')
@login_required
def creacion_modulos():
    return render_template('modules/configuraciones/creacion-de-modulos.html')

@app.route('/logout')
@login_required
def logout():
    session.pop('email', None)
    return redirect(url_for('login.login_get'))


@app.route('/registro-gastos/gastos-registrados')
@login_required
def gastos_registrados():
    return render_template('modules/registro-gastos/gastos-registrados.html')


@app.route('/listado-de-ingredientes')
@login_required
def listado_de_ingredientes():
    return render_template('modules/insumos-y-costeo/listado-de-ingredientes.html')


@app.route('/costeo-de-platillos')
@login_required
def costeo_de_platillos():
    return render_template('modules/insumos-y-costeo/costeo-de-platillos.html')

@app.route('/productos-registrados')
@login_required
def productos_registrados():
    return render_template('modules/registro-gastos/productos-registrados.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
