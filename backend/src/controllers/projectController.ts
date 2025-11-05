import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService';
import { MetricsService } from '../services/metricsService';

export class ProjectController {
  private projectService: ProjectService;
  private metricsService: MetricsService;

  constructor() {
    this.projectService = new ProjectService();
    this.metricsService = new MetricsService();
  }

  // Obtener todos los proyectos
  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await this.projectService.findAll();
      res.json({
        success: true,
        data: projects
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener proyectos',
        error: error.message
      });
    }
  }

  // Crear nuevo proyecto
  async createProject(req: Request, res: Response) {
    try {
      const projectData = req.body;
      const newProject = await this.projectService.create(projectData);

      // Registrar métrica de creación
      await this.metricsService.recordMetric({
        project_id: newProject.id,
        metric_name: 'project_created',
        metric_value: 1
      });

      res.status(201).json({
        success: true,
        data: newProject
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Error al crear proyecto',
        error: error.message
      });
    }
  }

  // Obtener métricas de un proyecto
  async getProjectMetrics(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const metrics = await this.metricsService.getProjectMetrics(id);

      res.json({
        success: true,
        data: metrics
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener métricas',
        error: error.message
      });
    }
  }

  // Analizar calidad del código
  async analyzeCode(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const analysis = await this.projectService.analyzeCodeQuality(id);

      res.json({
        success: true,
        data: analysis
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al analizar código',
        error: error.message
      });
    }
  }

  // ...otros métodos...
  // Obtener métricas recientes (para el dashboard)
  async getRecentMetrics(req: Request, res: Response) {
    try {
      const metrics = await this.metricsService.getRecentMetrics();
      res.json({
        success: true,
        data: metrics
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener métricas recientes',
        error: error.message
      });
    }
  }
}
