-- Tabla de Casos de Prueba
CREATE TABLE IF NOT EXISTS test_cases (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  complexity VARCHAR(50) CHECK (complexity IN ('basic', 'intermediate', 'complex')),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
