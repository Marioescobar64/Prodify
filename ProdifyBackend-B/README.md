# Prodify Backend B - Servicio de Productividad (Node.js)

API RESTful para el cálculo de métricas y estadísticas construida con Node.js, Express y MongoDB.

## Rol en la arquitectura

Servicio de análisis y resumen:
- Consume los datos del Backend A (Servicio de Tareas) mediante Axios.
- Genera estadísticas, resúmenes y métricas de productividad para el dashboard del usuario.
- Protege sus rutas validando el JWT emitido por el Auth Service.

## Descripción

Ofrece endpoints de solo lectura (GET) que procesan la información de las tareas del usuario para devolver resúmenes útiles, como cantidad de tareas pendientes, atrasadas o estadísticas de finalización.

## Tech Stack

- **Node.js** (ESM), **Express** 5.x
- **MongoDB** + **Mongoose** (conexión compartida/independiente)
- **Axios** (Comunicación entre microservicios)
- **JWT** (para validación)
- **Swagger**, **CORS**, **Helmet**

## Instalación

```bash
cd ProdifyBackend-B
pnpm install
# Configurar .env
pnpm dev
```

## Variables de Entorno

Ejemplo de `.env`:

```env
PORT=3003
NODE_ENV=development

# MongoDB
URL_MONGODB=mongodb://localhost:27017/prodify_db

# JWT
JWT_SECRET=super_secret_jwt_key_prodify

# Comunicación
SERVICEB=http://localhost:3002/api/v1/tasks
```

## Endpoints

**Prefijo:** `/api/v1`  
**Puerto:** `3003`  
**Swagger:** `GET /api-docs`

### Productividad (`/api/v1`)

| Método | Endpoint                   | Descripción                           | Auth |
| ------ | -------------------------- | ------------------------------------- | ---- |
| GET    | `/dashboard`               | Métricas generales del dashboard      | JWT  |
| GET    | `/tasks/pending`           | Lista de tareas pendientes            | JWT  |
| GET    | `/tasks/overdue`           | Lista de tareas atrasadas             | JWT  |
| GET    | `/summary/priorities`      | Resumen de tareas por prioridad       | JWT  |
| GET    | `/statistics/completion`   | Estadísticas de tareas completadas    | JWT  |

## Ejemplos

**Obtener Dashboard:**

```bash
curl -X GET http://localhost:3003/api/v1/dashboard \
  -H "Authorization: Bearer <tu_jwt_token>"
```

## Dependencias

| Dependencia | Uso                                        |
| ----------- | ------------------------------------------ |
| Backend A   | Origen de los datos de las tareas (Axios)  |
| Auth Service| Proveedor de tokens JWT                    |

## Autor y licencia

**Adrian Camposeco** (2026)
Licencia **MIT** con fines educativos.
