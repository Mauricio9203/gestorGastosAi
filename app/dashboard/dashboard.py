from flask import Blueprint, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
# Crear un Blueprint para los usuarios
dashboard_bp = Blueprint('dashboard', __name__)

    
@dashboard_bp.route('/dashboard/dashboard_roles', methods=['GET'])
def count_users_by_rol():
    response = supabase.table('user_roles_summary').select('*').execute()
    return jsonify(response.data if response.data else [])


@dashboard_bp.route('/dashboard/count_users', methods=['GET'])
def total_users():
    response = supabase.table('users').select( count='exact').execute()
    return jsonify(response.count if response.data else 0)


  


