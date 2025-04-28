from flask import Blueprint, jsonify, request, session
import bcrypt
from dotenv import load_dotenv
from app.supabase_client import get_supabase_client
# Funciones importadas
from app.users.utils import buscar_usuario_por_email, validar_nuevo_usuario, actualizar_campo_usuario
from app.crud import get_record, delete_records, update_record
# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Obtener el cliente de Supabase
supabase = get_supabase_client()

# Crear un Blueprint para los usuarios
bp = Blueprint('users', __name__)

@bp.route('/users/verify_duplicated_email', methods=['GET'])
def verificar_email_duplicado():
    email = request.args.get('email')
    respuesta = buscar_usuario_por_email(email)
    return jsonify(respuesta)

@bp.route('/users/list', methods=['GET'])
def listar_usuarios():
    response = get_record(
        table="users",
        #filters={"username": "editado"}, ejemplo solo si quiero filtrar es como un where en sql
        filters={},
        select_columns="id, created_at,email,username,updated_at,id_rol, user_roles(*)"
    )
    return jsonify({
        "users": response if response else [],
        "user_roles": session.get('user_roles', [])
    })
    
@bp.route('/userData', methods=['GET'])
def getUserData():
    response = get_record(
        table="users",
        #filters={"username": "editado"}, ejemplo solo si quiero filtrar es como un where en sql
        filters={"id": session['id_user']},
        select_columns="id, created_at,email,username,updated_at,id_rol, user_roles(*)"
    )
    
    session["email"] = response[0]["email"]
    session["username"] = response[0]["username"]
    
    return jsonify(response)


@bp.route('/rol_users/list', methods=['GET'])
def listar_rol_users():
    response = get_record(
        table="user_roles",
        #filters={"username": "editado"}, ejemplo solo si quiero filtrar es como un where en sql
        filters={},
        select_columns="*"
    )
    return jsonify(response if response else [])


@bp.route('/users/add', methods=['POST'])
def crear_usuario():
    try:
        new_user = request.get_json()
        if not new_user or 'username' not in new_user or 'email' not in new_user or 'password_hash' not in new_user or 'id_rol' not in new_user:
            return jsonify({"error": "Datos incompletos o inválidos"}), 400
        return validar_nuevo_usuario(new_user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
#eliminar usuario
@bp.route('/users/delete', methods=['DELETE'])
def eliminar_usuarios():
    data = request.get_json()
    ids = data.get('ids', [])  # espera una lista: { "ids": [1, 2, 3] }

    if not ids:
        return jsonify({"error": "No se proporcionaron IDs para eliminar."}), 400

    try:
        return delete_records("users", ids)
    except Exception as e:
            print("Error deleting records:", e)
    
@bp.route('/users/updateFields/<int:user_id>', methods=['PUT'])
def actualizar_campos_usuario(user_id):
    try:
        user_data = request.get_json()
        if not user_data or 'campo' not in user_data or 'valor' not in user_data:
            return jsonify({"error": "Se requiere 'campo' y 'valor' en el body"}), 400

        campo = user_data['campo']
        valor = user_data['valor']

        return actualizar_campo_usuario(user_id, campo, valor)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route("/update-user-data", methods=["POST"])
def update_user_data():
    payload = request.get_json()
    table_name = "users"
    data = payload.get("data")
    match_conditions = {"id":session['id_user']}

    try:
        result = update_record(table_name, data, match_conditions)
        
        session['username'] = result[0]["username"]
        session['email'] = result[0]["email"]
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@bp.route('/actualizar_contrasena', methods=['PUT'])
def actualizar_contrasena():
    # Obtener los datos del request
    data = request.get_json()
    
    # Verificar que se recibieron los datos necesarios
    user_id = data.get('user_id')
    nueva_contrasena = data.get('nueva_contrasena')
    
    if not user_id:
        user_id = session['id_user']
    
    if not user_id or not nueva_contrasena:
        return jsonify({"error": "Se requieren los campos 'user_id' y 'nueva_contrasena'"}), 400
    
    # Buscar al usuario por ID
    response = get_record(
        table="users",
        filters={"id": user_id}, 
        select_columns="password_hash"
    )
    
    if not response:  # Si la respuesta está vacía, significa que el usuario no fue encontrado
        return jsonify({"error": "Usuario no encontrado"}), 404  # No encontrado

    # Hashear la nueva contraseña
    hashed_password = bcrypt.hashpw(nueva_contrasena.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Actualizar el campo de la contraseña
    update_data = {"password_hash": hashed_password}
    update_response = update_record("users", update_data, {"id": user_id})
    
    if update_response:
        return jsonify({"message": "Contraseña actualizada exitosamente", "user": update_response}), 200
    else:
        return jsonify({"error": "Error al actualizar contraseña"}), 400



    