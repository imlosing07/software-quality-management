-- Tabla de Reportes
CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  report_type VARCHAR(100),
  file_path VARCHAR(500),
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
