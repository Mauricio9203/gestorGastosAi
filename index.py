from flask import Flask, render_template, redirect, url_for, session
from controllers.users import bp  as users_bp   # Importa el Blueprint de hola_mundo
from controllers.login import login_bp  # Importa el Blueprint de login

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mi_clave_secreta'  # Necesario para usar flash messages
app.config['STATIC_FOLDER'] = 'static'

# Registra los Blueprints
app.register_blueprint(users_bp)  # Para 'hola_mundo'
app.register_blueprint(login_bp)  # Para el login

@app.route('/')
def index():
    # Verificar si el usuario está autenticado
    if 'email' not in session:
        return redirect(url_for('login.login_get'))  # Redirige al login si no está autenticado
    return render_template('index.html')

@app.route('/users')
def usuarios_page():
    return render_template('users.html')

@app.route('/logout')
def logout():
    session.pop('email', None)  # Elimina el correo de la sesión
    print("Sesión eliminada")  # Esto debería aparecer en la consola si la sesión se elimina correctamente
    return redirect(url_for('login.login_get'))  # Redirige al login


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
