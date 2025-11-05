# Software Quality Management System

## ⚠️ Estado Actual del Proyecto

Este proyecto está **EN DESARROLLO**. Hay errores conocidos que necesitan ser corregidos antes de que funcione completamente.

---

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Docker Desktop** (Windows/Mac) o **Docker Engine + Docker Compose** (Linux)
  - Versión Docker: 20.10 o superior
  - Versión Docker Compose: 2.0 o superior
- **Git**
- **Node.js 18+** (solo si vas a desarrollar localmente sin Docker)

---

## 🚀 Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd software-quality-management
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_PASSWORD=tu_password_seguro
GRAFANA_PASSWORD=admin123
```

### 3. Construir y levantar los contenedores

```bash
docker compose build
docker compose up -d
```

### 4. Verificar el estado

```bash
docker compose ps
```

Todos los servicios deberían mostrar estado `Up` excepto si hay errores.

---

## 🔍 Servicios y Puertos

| Servicio   | Puerto | URL                    | Descripción           |
|------------|--------|------------------------|-----------------------|
| Frontend   | 80     | http://localhost       | Interfaz React        |
| API        | 3000   | http://localhost:3000  | Backend Node.js       |
| PostgreSQL | 5432   | localhost:5432         | Base de datos         |
| Redis      | 6379   | localhost:6379         | Cache                 |
| Prometheus | 9090   | http://localhost:9090  | Métricas              |
| Grafana    | 3001   | http://localhost:3001  | Dashboards (admin/admin123) |

---

## 🐛 Problemas Conocidos

### ❌ API no inicia - Error: Cannot find module 'express'

**Causa**: Los Dockerfiles de `backend/` y `frontend/` están intercambiados.

**Solución**:
1. El archivo `backend/Dockerfile` debe usar Node.js (no NGINX)
2. El archivo `frontend/Dockerfile` debe usar NGINX (no Node.js)
3. Intercambiar el contenido de ambos archivos
4. Reconstruir: `docker compose down && docker compose build --no-cache && docker compose up -d`

### ❌ Frontend muestra página en blanco o NGINX por defecto

**Causa**: 
- Los Dockerfiles están intercambiados
- O el build de React no está generando archivos correctamente

**Solución**:
1. Verificar que `frontend/Dockerfile` use NGINX
2. Asegurarse de que existe `frontend/package.json` con script `build`
3. El build debe generar carpeta `build/` con archivos estáticos

---

## 📂 Estructura del Proyecto

```
software-quality-management/
├── backend/               # API Node.js + Express
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── Dockerfile         ⚠️ Debe usar Node.js multi-stage
├── frontend/              # React App
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile         ⚠️ Debe usar NGINX
├── monitoring/
│   ├── prometheus/
│   └── grafana/
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🛠️ Comandos Útiles

### Ver logs de un servicio específico
```bash
docker compose logs api
docker compose logs frontend
docker compose logs -f api  # Seguir logs en tiempo real
```

### Reconstruir sin caché
```bash
docker compose build --no-cache
```

### Detener todo
```bash
docker compose down
```

### Detener y eliminar volúmenes (⚠️ borra la BD)
```bash
docker compose down -v
```

### Entrar a un contenedor
```bash
docker compose exec api sh
docker compose exec postgres psql -U admin -d quality_db
```

---

## 🔧 Desarrollo Local (sin Docker)

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📝 Próximos Pasos para Completar

- [ ] Corregir los Dockerfiles intercambiados
- [ ] Verificar que las migraciones de Prisma se ejecuten correctamente
- [ ] Configurar correctamente las variables de entorno en cada servicio
- [ ] Agregar health checks en docker-compose.yml
- [ ] Configurar correctamente el proxy de NGINX para las APIs
- [ ] Testear la conexión Frontend → API → Database

---

## 🆘 Ayuda

Si encuentras errores:

1. Revisa los logs: `docker compose logs <servicio>`
2. Verifica que todos los servicios estén corriendo: `docker compose ps`
3. Asegúrate de tener el archivo `.env` configurado
4. Reconstruye sin caché si hiciste cambios: `docker compose build --no-cache`

---

## 👥 Contribución

Este es un proyecto en desarrollo activo. Si vas a continuar el trabajo:

1. Lee los comentarios en el código
2. Revisa la sección de "Problemas Conocidos"
3. Haz commit frecuentemente
4. Documenta cualquier cambio importante

---

**Última actualización**: Proyecto en estado inicial con errores de configuración de Docker pendientes de resolver.