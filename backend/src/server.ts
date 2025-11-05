import express, { Application } from 'express';
import apiRoutes from './routes';
import dotenv from 'dotenv'; // Para cargar variables de entorno

dotenv.config(); // Carga las variables del .env

// 1. Inicializa la aplicación Express
const app: Application = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares
app.use(express.json()); // Middleware para parsear el body de las peticiones

// 3. Rutas de la API
// Aquí usamos 'app' por primera vez
app.use('/api', apiRoutes);

// 4. Inicia el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});