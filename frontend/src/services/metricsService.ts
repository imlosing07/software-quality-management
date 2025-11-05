import api from './api';

// Tu dashboard llama a getRecent() [cite: 886]
const getRecent = async () => {
  const response = await api.get('/api/metrics/recent'); // Ruta que acabamos de inventar
  return response.data.data;
};

export const metricsService = {
  getRecent,
};