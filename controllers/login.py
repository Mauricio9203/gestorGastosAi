from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
from supabase import create_client, Client
import bcrypt

# Configuración de Supabase
SUPABASE_URL = "https://anvmidwmtgkhtesxtdsk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFudm1pZHdtdGdraHRlc3h0ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNDgxOTMsImV4cCI6MjA1MzYyNDE5M30.848n_1vRqoMJXUPtdzQKffW1DJkZYG53rt7TXMbVWSE"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def buscar_usuario_por_email(email):
    # Buscar el usuario por email
    response = supabase.table('users').select('id').eq('email', email).execute()

    # Verificar si se encontró el usuario
    if response.data:
        return True  # Usuario encontrado
    else:
        return False  # Usuario no encontrado

# Definir el Blueprint
login_bp = Blueprint('login', __name__)

# Ruta para manejar el login (POST)
@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'message': 'No data received'}), 400

    email = data.get('email')
    password = data.get('password')

    # Usar la función buscar_usuario_por_email para verificar si el usuario existe
    if not buscar_usuario_por_email(email):
        return jsonify({'success': False, 'message': 'User not found'}), 200

    # Buscar al usuario por correo en la tabla 'users'
    response = supabase.table('users').select('*').eq('email', email).single().execute()
    
    # Verificar si el usuario existe
    if response.data:
        user = response.data

        # Obtener el hash almacenado y comparar con la contraseña proporcionada
        password_hash = user['password_hash']
        if bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
            session['email'] = email  # Guardamos el email en la sesión
            session['username'] = user["username"]  # Guardamos el nombre en la sesión
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'message': 'Incorrect password'})
    else:
       return jsonify({'success': False, 'message': 'There is no registered user with this email'}), 200

# Ruta para la página de login (GET)
@login_bp.route('/login', methods=['GET'])
def login_get():
    # Verifica si ya hay una sesión activa
    if 'email' in session:
        return redirect(url_for('index'))  # Redirige a la página principal si ya hay sesión activa
    return render_template('login.html')
