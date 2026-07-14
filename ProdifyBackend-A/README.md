# Prodify Backend A - Servicio de Tareas (Node.js)

API RESTful para la gestión de tareas construida con Node.js, Express y MongoDB.

## Rol en la arquitectura

Servicio principal de gestión de datos:
- Maneja el CRUD completo de las tareas de los usuarios.
- Protege sus rutas validando el JWT emitido por el Auth Service.
- Provee datos al Backend B (Productividad) a través de comunicación HTTP.

## Descripción

Permite a los usuarios crear, leer, actualizar, eliminar y cambiar el estado de sus tareas. Cada tarea está asociada al ID del usuario extraído del JWT.

## Tech Stack

- **Node.js** (ESM), **Express** 5.x
- **MongoDB** + **Mongoose**
- **JWT** (para validación)
- **Helmet**, **CORS**, **Rate Limiting**, **Swagger**

## Instalación

```bash
cd ProdifyBackend-A
pnpm install
# Configurar .env
pnpm dev
```

## Variables de Entorno

Ejemplo de `.env`:

```env
PORT=3002
NODE_ENV=development

# MongoDB
URL_MONGODB=mongodb://localhost:27017/prodify_db

# JWT
JWT_SECRET=super_secret_jwt_key_prodify
```

## Endpoints

**Prefijo:** `/api/v1`  
**Puerto:** `3002`  
**Health:** `GET /api/v1/health`
**Swagger:** `GET /api-docs`

### Tareas (`/api/v1/tasks`)

| Método | Endpoint               | Descripción                       | Auth |
| ------ | ---------------------- | --------------------------------- | ---- |
| GET    | `/tasks`               | Obtener todas las tareas          | JWT  |
| POST   | `/tasks`               | Crear una nueva tarea             | JWT  |
| GET    | `/tasks/:id`           | Obtener detalles de una tarea     | JWT  |
| PUT    | `/tasks/:id`           | Actualizar una tarea              | JWT  |
| DELETE | `/tasks/:id`           | Eliminar una tarea                | JWT  |
| PATCH  | `/tasks/:id/status`    | Cambiar el estado de una tarea    | JWT  |

## Ejemplos

**Crear tarea:**

```bash
curl -X POST http://localhost:3002/api/v1/tasks \
  -H "Authorization: Bearer <tu_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "título": "Terminar proyecto",
    "descripción": "Finalizar la prueba técnica",
    "prioridad": "Alta",
    "estado": "Pendiente",
    "fecha": "2026-07-20"
  }'
```

## Dependencias

| Dependencia | Uso                                        |
| ----------- | ------------------------------------------ |
| Auth Service| Proveedor de tokens JWT                    |

## Autor y licencia

**Adrian Camposeco** (2026)
Licencia **MIT** con fines educativos.
