from flask import Flask, render_template, redirect, url_for, session
from flask_cors import CORS  # Importar CORS
from app.users.users_routes import bp as users_bp
from app.login.login import login_bp
from app.dashboard.dashboard import dashboard_bp
from app.registro_gastos.registro_gastos_routes import registro_gastos_bp
from app.utils.decorators import login_required
from app.menu import modulos

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Habilitar CORS para todas las rutas

app.config['SECRET_KEY'] = 'mi_clave_secreta'
app.config['STATIC_FOLDER'] = 'static'

# Registra los Blueprints
app.register_blueprint(users_bp)
app.register_blueprint(login_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(registro_gastos_bp)

@app.route('/')
@login_required
def index():
    return render_template('dashboard.html')


@app.route('/users')
@login_required
def users():
    return render_template('users.html')

@login_required
@app.route('/registro-gastos')
def registro_gastos():
    return render_template('registro-gastos/registro-gastos.html')

@login_required
@app.route('/modulo-base/sub-modulo-base')
def modulo_base():
    return render_template('modulo-base/sub-modulo-base.html')

@app.route('/logout')
def logout():
    session.pop('email', None)
    return redirect(url_for('login.login_get'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
