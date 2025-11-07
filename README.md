# Prueba Gases del Caribe

Aplicación web full-stack para gestión de usuarios con autenticación.

## Estructura del Proyecto

```
prueba-gases-del-caribe/
├── Backend/                    # API Backend (Node.js + Express + Sequelize)
│   ├── src/
│   │   ├── controllers/        # Controladores de la API
│   │   ├── database/          # Configuración de base de datos
│   │   ├── interface/         # Interfaces TypeScript
│   │   ├── models/            # Modelos de Sequelize
│   │   └── routes/            # Rutas de la API
│   ├── app.ts                 # Configuración principal de Express
│   ├── server.ts              # Punto de entrada del servidor
│   └── package.json
├── src/                       # Frontend (React + TypeScript + Vite)
│   ├── components/            # Componentes reutilizables
│   ├── guard/                 # Guards de autenticación
│   ├── hooks/                 # Hooks personalizados
│   ├── page/                  # Páginas de la aplicación
│   ├── routes/                # Configuración de rutas
│   ├── store/                 # Estado global (Zustand)
│   ├── types/                 # Tipos TypeScript
│   └── validations/           # Esquemas de validación
├── public/                    # Archivos estáticos
└── package.json               # Dependencias del frontend
```

## Cómo Ejecutar

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn
- PostgreSQL (opcional, actualmente usa datos mockeados)

### Instalación y Ejecución

1. **Instalar dependencias del frontend:**
   ```bash
   npm install
   ```

2. **Instalar dependencias del backend:**
   ```bash
   cd Backend
   npm install
   cd ..
   ```

3. **Ejecutar el backend:**
   ```bash
   cd Backend
   npx tsx server.ts
   ```
   El servidor backend estará disponible en `http://localhost:4000`

4. **Ejecutar el frontend (en una terminal separada):**
   ```bash
   npm run dev
   ```
   La aplicación frontend estará disponible en `http://localhost:5173` (o el puerto que indique Vite)

### Endpoints de la API

- `POST /api/users` - Crear usuario (registro)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Funcionalidades

- Registro de usuarios con validación
- Inicio de sesión
- Dashboard protegido
- Gestión de usuarios (CRUD)
- Autenticación con JWT (en desarrollo)
- Interfaz responsiva con Material-UI

### Notas

- Actualmente el backend usa datos mockeados para evitar dependencias de base de datos
- La autenticación completa está en desarrollo
- Para producción, configurar variables de entorno para la base de datos
