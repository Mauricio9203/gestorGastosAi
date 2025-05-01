from app.services.supabase_client import get_supabase_client
from datetime import datetime, timezone
from app.utils.decorators import login_required

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