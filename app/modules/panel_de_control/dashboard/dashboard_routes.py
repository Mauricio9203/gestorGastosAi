from flask import Blueprint, jsonify, request, session
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

@dashboard_bp.route('/dashboard/boletas_no_revisadas', methods=['GET'])
def total_boletas_no_revisadas():
    comercio = request.args.get('comercio')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    query = supabase.table('boletas').select(count='exact').eq('confirmacion_revision', False).eq('id_usuario',session['id_user'] )

    if comercio:
        query = query.eq('nombre_comercio', comercio)
    if fecha_inicio:
        query = query.gte('fecha_boleta', fecha_inicio)
    if fecha_fin:
        query = query.lte('fecha_boleta', fecha_fin)

    response = query.execute()
    return jsonify(response.count if response.data else 0)

@dashboard_bp.route('/dashboard/count_boletas', methods=['GET'])
def total_boletas():
    comercio = request.args.get('comercio')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    query = supabase.table('boletas').select(count='exact').eq('id_usuario', session['id_user'])

    if comercio:
        query = query.eq('nombre_comercio', comercio)
    if fecha_inicio:
        query = query.gte('fecha_boleta', fecha_inicio)
    if fecha_fin:
        query = query.lte('fecha_boleta', fecha_fin)

    response = query.execute()
    return jsonify(response.count if response.data else 0)

@dashboard_bp.route('/dashboard/total_gastado', methods=['GET'])
def total_gastado():
    #response = supabase.rpc("get_total_gastado_dynamic", {"fecha_inicio": "2025-04-12","fecha_fin": "2026-04-12","comercio": "Woolworths","usuario_id": 108}).execute()
    response = supabase.rpc('get_total_gastado_dynamic', {'usuario_id':  session['id_user']}).execute()
    return jsonify(response.data if response.data else 0)

@dashboard_bp.route('/dashboard/total_gastado_por_categoria', methods=['GET'])
def total_gastado_por_categoria():
    #response = supabase.rpc('get_total_gastado_por_categoria_dynamic', {'fecha_inicio': '2025-04-12','fecha_fin': '2026-04-12','comercio': 'Woolworths',id_usuario: 108,'limite': 10}).execute()
    response = supabase.rpc('get_total_gastado_por_categoria_dynamic', {'limite':10, 'id_usuario': session['id_user']}).execute()
    #print(response)
    return jsonify(response.data if response.data else [])

@dashboard_bp.route('/dashboard/total_gastado_por_comercio', methods=['GET'])
def total_gastado_por_comercio():
    #response = supabase.rpc('get_total_gastado_por_comercio', {'fecha_inicio': '2025-04-12','fecha_fin': '2026-04-12','comercio': 'Woolworths','usuario_id': 108,'limite': 10}).execute()
    response = supabase.rpc('get_total_gastado_por_comercio',{'usuario_id': session['id_user']}).execute()
    print(response)
    return jsonify(response.data if response.data else [])
  


