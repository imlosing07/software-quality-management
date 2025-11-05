import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MetricsService {
  
  async recordMetric(data: { project_id: number; metric_name: string; metric_value: number }) {
    return prisma.metric.create({
      data: data,
    });
  }

  async getProjectMetrics(projectId: string) {
    return prisma.metric.findMany({
      where: {
        project_id: Number(projectId),
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  // ¡NECESITAS ESTA FUNCIÓN! Tu frontend la llama [cite: 886]
  async getRecentMetrics() {
    return prisma.metric.findMany({
      orderBy: {
        timestamp: 'desc',
      },
      take: 100, // Por ejemplo, las 100 más recientes
    });
  }
}