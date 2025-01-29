from flask import Blueprint, render_template, jsonify, request
from supabase import create_client, Client
import bcrypt

# Crear el cliente de Supabase
url = "https://anvmidwmtgkhtesxtdsk.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFudm1pZHdtdGdraHRlc3h0ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNDgxOTMsImV4cCI6MjA1MzYyNDE5M30.848n_1vRqoMJXUPtdzQKffW1DJkZYG53rt7TXMbVWSE"
supabase: Client = create_client(url, key)

def obtener_usuario_por_id(user_id):
    try:
        response = supabase.table('users').select('*').eq('id', user_id).execute()
        if response.data:
            return response.data[0]  # Retorna el primer usuario encontrado
        else:
            return None  # Usuario no encontrado
    except Exception as e:
        print(f"Ocurrió un error al intentar obtener el usuario: {e}")
        return None

def agregar_usuario(new_user):
    email = new_user.get('email')
    if buscar_usuario_por_email(email):
        return jsonify({"error": "El email ya está registrado."}), 409
    
    password = new_user.get('password_hash')
    if password:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user['password_hash'] = hashed_password.decode('utf-8')
    
    response = supabase.table('users').insert(new_user).execute()
    if response.data:
        return jsonify({"message": "Usuario creado exitosamente", "user": response.data}), 201
    elif response.error:
        if "duplicate key value violates unique constraint" in response.error.get('message', ''):
            return jsonify({"error": "El email ya está registrado."}), 409  # Conflict
        else:
            return jsonify({"error": response.error}), 400

def buscar_usuario_por_email(email):
    response = supabase.table('users').select('id').eq('email', email).execute()
    return bool(response.data)

# Crear un Blueprint para los usuarios
bp = Blueprint('users', __name__)

@bp.route('/users', methods=['GET'])
def mostrar_usuarios():
    return render_template('users.html')

@bp.route('/users/list', methods=['GET'])
def listar_usuarios():
    response = supabase.table('users').select('*').execute()
    return jsonify(response.data if response.data else [])

@bp.route('/users/add', methods=['POST'])
def crear_usuario():
    try:
        new_user = request.get_json()
        if not new_user or 'username' not in new_user or 'email' not in new_user or 'password_hash' not in new_user:
            return jsonify({"error": "Datos incompletos o inválidos"}), 400
        return agregar_usuario(new_user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/users/delete/<int:user_id>', methods=['DELETE'])
def eliminar_usuario(user_id):
    response = supabase.table('users').delete().eq('id', user_id).execute()
    if response.data:
        return jsonify({"message": "Usuario eliminado exitosamente."}), 200
    else:
        return jsonify({"error": "Error al eliminar usuario."}), 400

@bp.route('/users/<int:user_id>', methods=['GET'])
def obtener_usuario(user_id):
    usuario = obtener_usuario_por_id(user_id)
    if usuario:
        return jsonify(usuario), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
