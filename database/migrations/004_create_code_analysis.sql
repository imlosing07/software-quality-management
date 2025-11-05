-- Tabla de Análisis de Código
CREATE TABLE IF NOT EXISTS code_analysis (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  issues_count INTEGER,
  code_smells INTEGER,
  vulnerabilities INTEGER,
  coverage_percentage DECIMAL(5,2),
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
