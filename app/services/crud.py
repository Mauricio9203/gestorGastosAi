from app.services.supabase_client import get_supabase_client
from datetime import datetime, timezone
from app.utils.decorators import login_required
from flask import request, jsonify
import json

# Obtener el cliente de Supabase
supabase = get_supabase_client()

@login_required
def get_record(table: str, filters: dict, select_columns: str ):
    query = supabase.table(table).select(select_columns)
    
    # Si hay filtros, aplicarlos uno por uno
    if filters:
        for column, value in filters.items():
            query = query.eq(column, value)
    
    response = query.execute()
    return response.data

def get_record_function(function_name: str, params: dict = None):
    """
    Llama a una función RPC en Supabase con los parámetros dados y devuelve los datos.

    :param function_name: Nombre de la función RPC en la base de datos.
    :param params: Diccionario con parámetros para la función.
    :return: Lista de resultados (response.data) o None si no hay resultados.
    """
    params = params or {}

    response = supabase.rpc(function_name, params).execute()

    return response.data

@login_required
def create_record(table_name: str, data: dict):
    data["created_at"] = datetime.now(timezone.utc).isoformat()
    data["updated_at"] = datetime.now(timezone.utc).isoformat()
    response = supabase.table(table_name).insert(data).execute()
    response_dict = response.model_dump()

    if response_dict.get("error"):
        raise Exception(str(response_dict["error"]))
    
    return response_dict.get("data")

def create_record_multiple(table_name: str, data: list):
    now = datetime.now(timezone.utc).isoformat()
    for item in data:
        item["created_at"] = now
        item["updated_at"] = now

    response = supabase.table(table_name).insert(data).execute()
    response_dict = response.model_dump()

    if response_dict.get("error"):
        raise Exception(str(response_dict["error"]))
    
    return response_dict.get("data")

@login_required
def update_record(table_name: str, data: dict, match_conditions: dict):
     # Agregar campo created_at
    data["updated_at"] = datetime.now(timezone.utc).isoformat()
    response = supabase.table(table_name).update(data).match(match_conditions).execute()
    response_dict = response.model_dump()

    if response_dict.get("error"):
        raise Exception(str(response_dict["error"]))
    
    return response_dict.get("data")

@login_required
def delete_records(table_name: str, ids: list):
    response = supabase.table(table_name).delete().in_('id', ids).execute()
    response_dict = response.model_dump()

    if response_dict.get("error"):
        raise Exception(str(response_dict["error"]))
    
    return response_dict.get("data")


#esta es muy específica para el módulo de productos registrados
@login_required
def actualizacion_masiva_ingredientes_maestros(payload: list):
    if not isinstance(payload, list):
        raise ValueError("El cuerpo debe ser una lista de objetos con id_detalle_boleta e id_ingrediente_maestro")

    response = supabase.rpc("actualizar_id_ingrediente_maestro_masivo", {
        "json_data": payload
    }).execute()
    
    print("Response de actualizacion_masiva_ingredientes_maestros:", response)

    # Revisar si hubo error (validar que exista 'error' y no sea None)
    if hasattr(response, 'error') and response.error:
        # Intentar acceder a message, si no existe mostrar error completo como string
        err_msg = getattr(response.error, 'message', str(response.error))
        raise Exception(err_msg)

    # Retornar solo los datos para que el endpoint arme el jsonify
    return response.data

