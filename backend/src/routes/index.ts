import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';

const router = Router();
const controller = new ProjectController();

// Rutas de Proyectos
router.get('/projects', controller.getAllProjects.bind(controller));
router.post('/projects', controller.createProject.bind(controller));
router.get('/projects/:id/metrics', controller.getProjectMetrics.bind(controller));
router.post('/projects/:id/analyze', controller.analyzeCode.bind(controller));

// Ruta de Métricas (para el dashboard)
router.get('/metrics/recent', controller.getRecentMetrics.bind(controller));

export default router;