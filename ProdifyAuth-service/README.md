# Prodify Auth - Servicio de Autenticación (Node.js)

API RESTful de autenticación construida con Node.js, Express y PostgreSQL para el proyecto Prodify.

## Rol en la arquitectura

Servicio de autenticación central:
- Consumido por los clientes para registro e inicio de sesión.
- Genera y emite tokens JWT.
- Los otros microservicios (Backend A y Backend B) validan el JWT emitido por este servicio.

## Descripción

Gestiona el registro de usuarios y el inicio de sesión. Utiliza JWT de forma stateless y Argon2 para el hashing seguro de contraseñas.

## Tech Stack

- **Node.js** (ESM), **Express** 5.x
- **PostgreSQL** + **Sequelize**
- **JWT**, **Argon2**
- **Helmet**, **CORS**, **Rate Limiting**, **Swagger**

## Instalación

```bash
cd ProdifyAuth-service
pnpm install
cp .env.example .env # Asegúrate de configurar las variables
pnpm dev
```

## Variables de Entorno

Ejemplo de `.env`:

```env
PORT=5277
JWT_SECRET=super_secret_jwt_key_prodify
NODE_ENV=development

# PostgreSQL Config
DB_HOST=localhost
DB_PORT=5433
DB_NAME=prodify_auth
DB_USERNAME=prodify_user
DB_PASSWORD=prodify_password
```

## Endpoints

**Prefijo:** `/api/v1`  
**Puerto:** `5277`  
**Health:** `GET /api/v1/health`
**Swagger:** `GET /api-docs`

### Autenticación (`/api/v1/auth`)

| Método | Endpoint         | Descripción                       | Auth |
| ------ | ---------------- | --------------------------------- | ---- |
| POST   | `/auth/register` | Registrar un nuevo usuario        | No   |
| POST   | `/auth/login`    | Iniciar sesión y obtener JWT      | No   |

## Ejemplos

**Registro:**

```bash
curl -X POST http://localhost:5277/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "adrian",
    "correo": "acamposeco@kinal.edu.gt",
    "contraseña": "password123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5277/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "acamposeco@kinal.edu.gt",
    "contraseña": "password123"
  }'
```

## Dependencias

| Consumidor | Uso                                        |
| ---------- | ------------------------------------------ |
| Backend A  | Validación JWT                             |
| Backend B  | Validación JWT                             |

## Docker

El servicio se puede ejecutar o apoyar en un contenedor Docker para la base de datos PostgreSQL, escuchando en el puerto `5433` o `5432` según configuración.

## Autor y licencia

**Adrian Camposeco** (2026)
Licencia **MIT** con fines educativos.
