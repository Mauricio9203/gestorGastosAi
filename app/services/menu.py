#en la url se debe colocar el nombre de la función registrada a esa url

modulos = [
    {
        "id": "dashboard",
        "icono": "fa-chart-line",
        "nombre": "Panel de Control",
        "submodulos": [
            {
                "id": "overview",
                "icono": "fa-chart-bar",
                "nombre": "Dashboard",
                "url": "index"
            }
        ]
    },
    {
        "id": "registroGastos",
        "icono": "fa-receipt",
        "nombre": "Registro Gastos",
        "submodulos": [
            {
                "id": "escanearBoleta",
                "icono": "fa-camera",
                "nombre": "Registrar Gasto",
                "url": "registro_gastos"
            }
        ]
    },
    {
        "id": "configuraciones",
        "icono": "fa-gear",
        "nombre": "Configuraciones",
        "submodulos": [
            {
                "id": "usuarios",
                "icono": "fa-user-cog",
                "nombre": "Usuarios",
                "url": "users"
            },
            {
                "id": "creacion-de-modulos",
                "icono": "fa-cubes",
                "nombre": "Creación de módulos",
                "url": "creacion_modulos"
            }
        ]
    },
    {
        "id": "moduloBase",
        "icono": "fa-gear",
        "nombre": "Módulo Base",
        "submodulos": [
            {
                "id": "sub_modulo_base",
                "icono": "fa-user-cog",
                "nombre": "Sub módulo Base",
                "url": "modulo_base"
            }
        ]
    }
]
