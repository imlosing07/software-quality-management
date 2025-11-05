-- Tabla de Métricas
CREATE TABLE IF NOT EXISTS metrics (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  metric_name VARCHAR(100),
  metric_value DECIMAL(10,2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
