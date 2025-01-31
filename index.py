from flask import Flask, render_template, redirect, url_for, session
from flask_cors import CORS  # Importar CORS
from controllers.users import bp as users_bp
from controllers.login import login_bp
from controllers.dashboard import dashboard_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Habilitar CORS para todas las rutas

app.config['SECRET_KEY'] = 'mi_clave_secreta'
app.config['STATIC_FOLDER'] = 'static'

# Registra los Blueprints
app.register_blueprint(users_bp)
app.register_blueprint(login_bp)
app.register_blueprint(dashboard_bp)

@app.route('/')
def index():
    if 'email' not in session:
        return redirect(url_for('login.login_get'))
    return render_template('dashboard.html')

@app.route('/users')
def usuarios_page():
    return render_template('users.html')

@app.route('/logout')
def logout():
    session.pop('email', None)
    print("Sesión eliminada")
    return redirect(url_for('login.login_get'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
