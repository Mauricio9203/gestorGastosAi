# app/supabase_client.py

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Función para obtener el cliente de Supabase
def get_supabase_client() -> Client:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")

    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("SUPABASE_URL y SUPABASE_KEY deben estar configurados en las variables de entorno.")

    return create_client(SUPABASE_URL, SUPABASE_KEY)
