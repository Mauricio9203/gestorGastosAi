from app.supabase_client import get_supabase_client
from flask import jsonify
import bcrypt
from app.crud import get_record, create_record, update_record


# Obtener el cliente de Supabase
supabase = get_supabase_client()

def buscar_usuario_por_email(email):
    response = get_record(
        table="users",
        filters={"email": email},
        select_columns="id, created_at,email,username,updated_at,id_rol, user_roles(*)"
    )
    return bool(response)

def validar_nuevo_usuario(new_user):
    if buscar_usuario_por_email(new_user.get('email')):
        return jsonify({"error": "El email ya está registrado."}), 409

    if new_user.get('password_hash'):
        new_user['password_hash'] = bcrypt.hashpw(
            new_user['password_hash'].encode('utf-8'), 
            bcrypt.gensalt()
        ).decode('utf-8')

    try:
        user = create_record("users", new_user)
        return jsonify({"message": "Usuario creado exitosamente", "user": user}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    
def actualizar_campo_usuario(user_id, campo, valor):
    try:
        update_data = {campo: valor}
        response = update_record("users", update_data, {"id": user_id})
        
        if response:
            return jsonify({"message": "Usuario actualizado exitosamente", "user": response}), 200
        else:
            return jsonify({"error": "Error al actualizar usuario"}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
