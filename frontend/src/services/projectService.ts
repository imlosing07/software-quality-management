import api from './api';

// Tu dashboard espera que `getAll` devuelva un array [cite: 886]
const getAll = async () => {
  const response = await api.get('/api/projects'); // Asumiendo que tus rutas tienen /api
  return response.data.data; // Basado en la respuesta de tu controller
};

export const projectService = {
  getAll,
};