# Prodify

Este es el repositorio principal del sistema Prodify, compuesto por un Frontend y múltiples microservicios Backend.

## Especificaciones de Ejecución

Todos los servicios del proyecto utilizan `pnpm` (recomendado debido a la existencia de los archivos `pnpm-lock.yaml`) o `npm`. 
Debes abrir una terminal por cada uno de los proyectos, instalar las dependencias con `pnpm install` y ejecutarlos.

### 1. Frontend (ProdifyFronted)
- **Tecnología**: React con Vite.
- **Comando de desarrollo**: `pnpm run dev` (o `npm run dev`).
- **Puerto de ejecución**: `5173` (Puerto por defecto de Vite).

### 2. Servicio de Autenticación (ProdifyAuth-service)
- **Tecnología**: Node.js + Express.
- **Comando de desarrollo**: `pnpm run dev` (ejecuta nodemon).
- **Puerto de ejecución**: Definido a través del archivo de variables de entorno `.env` en la variable `PORT`.

### 3. Backend A (ProdifyBackend-A)
- **Tecnología**: Node.js + Express.
- **Comando de desarrollo**: `pnpm run dev`.
- **Puerto de ejecución**: `3002` (Basado en su configuración actual en `.env`).

### 4. Backend B (ProdifyBackend-B)
- **Tecnología**: Node.js + Express.
- **Comando de desarrollo**: `pnpm run dev`.
- **Puerto de ejecución**: `3003` (Basado en su configuración actual en `.env`).

---

## Etiquetas más usadas (Commits Convencionales)

Para mantener un historial de control de versiones ordenado, este proyecto utiliza la convención de Commits Convencionales. Al realizar un commit, utiliza los siguientes prefijos:

- **feat**: Añade una nueva funcionalidad.
- **fix**: Corrige un error en el código.
- **docs**: Modifica la documentación (README, wikis, etc.).
- **refactor**: Reescribe código existente sin agregar funciones ni corregir errores.
- **test**: Añade o modifica pruebas (unitarias, integración).
- **style**: Ajustes de formato, espacios, sangrías, etc. (no afecta la lógica).
- **chore**: Tareas de mantenimiento de la herramienta de construcción, dependencias, etc.
- **perf**: Cambios orientados a mejorar el rendimiento.
- **ci**: Cambios en la configuración de integración continua.
