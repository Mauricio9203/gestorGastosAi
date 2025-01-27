from flask import Flask, render_template
from controllers.hola_mundo import bp  # Importa el Blueprint

app = Flask(__name__)
# Asegúrate de que la ruta estática se configure bien si usas una estructura diferente
app.config['STATIC_FOLDER'] = 'static'

# Registra el Blueprint
app.register_blueprint(bp)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/holaMundo')
def hola_mundo_page():
    return render_template('hola-mundo.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

