# Proyecto SorteoTNM
Sistema de sorteo para eventos deportivos del Tecnológico Nacional de México (TecNM), que permite la gestión y visualización de grupos deportivos para diferentes disciplinas.

## Descripción
El proyecto SorteoTNM es una aplicación web desarrollada para facilitar la organización de eventos deportivos del Tecnológico Nacional de México. Permite registrar, editar y visualizar grupos de diferentes instituciones tecnológicas participantes en diversas disciplinas deportivas.

## Características
- Visualización de grupos : Interfaz pública para consultar los grupos formados por deporte
- Filtrado de información : Búsqueda por institución, deporte y grupo
- Gestión de grupos : Registro, edición y eliminación de grupos (requiere autenticación)
- Autenticación de usuarios : Sistema de login para administradores
- Interfaz responsiva : Diseño adaptable a diferentes dispositivos
## Tecnologías
### Frontend (SorteoTNM)
- Framework : Angular 19
- Lenguaje : TypeScript
- Estilos : CSS con Bootstrap 5
- Comunicación : HttpClient para consumo de API REST
### Backend (BackNode)
- Runtime : Node.js
- Framework : Express.js
- Base de datos : PostgreSQL
- Autenticación : JWT (JSON Web Tokens)
- Seguridad : bcrypt para encriptación de contraseñas
## Requisitos
### Para desarrollo
- Node.js (versión recomendada: 18.x o superior)
- Angular CLI (versión 19.x)
- PostgreSQL (versión 14 o superior)
- npm (gestor de paquetes de Node.js)
## Instalación
### Configuración del Backend
1. Navegar al directorio del backend:
```
cd BackNode
```
2. Instalar dependencias:
```
npm install
```
3. Crear un archivo .env en la raíz del directorio BackNode con las siguientes variables:
```
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=sorteo_tnm
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

JWT_SECRET=tu_clave_secreta_jwt
SALT=10
```
4. Ejecutar la migración para crear las tablas en la base de datos:
```
npm run migrate
```
5. Iniciar el servidor en modo desarrollo:
```
npm run dev
```
### Configuración del Frontend
1. Navegar al directorio del frontend:
```
cd SorteoTNM
```
2. Instalar dependencias:
```
npm install
```
3. Iniciar el servidor en modo desarrollo:
```
ng serve
```
4. Acceder a la aplicación en el navegador: http://localhost:4200
## Estructura del Proyecto
### Frontend (SorteoTNM)
```
SorteoTNM/
├── src/
│   ├── app/
│   │   ├── auth/           # Componentes de autenticación
│   │   ├── layouts/        # Layouts de la aplicación
│   │   ├── pages/          # Páginas principales
│   │   ├── services/       # Servicios para comunicación con API
│   │   └── shared/         # Componentes compartidos
│   ├── assets/             # Recursos estáticos
│   └── styles.css          # Estilos globales
├── public/                 # Archivos públicos (imágenes, favicon)
└── package.json            # Dependencias y scripts
```
### Backend (BackNode)
```
BackNode/
├── src/
│   ├── config/             # Configuración (BD, variables de entorno)
│   ├── controllers/        # Controladores de rutas
│   ├── middleware/         # Middleware (autenticación)
│   ├── models/             # Modelos y repositorios de datos
│   └── routes/             # Definición de rutas
├── index.js                # Punto de entrada de la aplicación
└── package.json            # Dependencias y scripts
```
## Variables de Entorno
### Backend
Variable Descripción PORT Puerto en el que se ejecuta el servidor NODE_ENV Entorno de ejecución (development/production) DB_HOST Host de la base de datos DB_PORT Puerto de la base de datos DB_NAME Nombre de la base de datos DB_USER Usuario de la base de datos DB_PASSWORD Contraseña de la base de datos JWT_SECRET Clave secreta para firmar tokens JWT SALT Factor de costo para bcrypt

## Endpoints API
### Públicos
- POST / - Obtener grupos (con filtros opcionales)
- POST /loginST - Iniciar sesión
### Protegidos (requieren autenticación)
- POST /logoutST - Cerrar sesión
- POST /registerGrupoST - Registrar nuevo grupo
- PUT /edit-GruposST - Actualizar grupo existente
- POST /edit-GruposST - Obtener grupo por parámetros
- DELETE /edit-GruposST/:id - Eliminar grupo
- POST /resultadosST - Obtener resultados filtrados
## Contribución
Proyecto desarrollado por Héctor Leonardo Martínez Ríos.

## Licencia
ISC (para el backend) según se especifica en el package.json
