import axios from 'axios';

// Tu docker-compose le pasa esta variable al contenedor del frontend [cite: 843]
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Aquí puedes configurar interceptores para tokens JWT, etc.

export default api;