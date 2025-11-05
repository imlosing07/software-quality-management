import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProjectService {

  async findAll() {
    // Tu frontend espera 'activeTests' [cite: 887]
    // Tu esquema de DB no lo tiene [cite: 770-779], así que lo calculamos.
    const projects = await prisma.project.findMany({
      include: {
        _count: {
          select: {
            test_cases: { where: { status: 'active' } } // Asumiendo 'active' como estado
          }
        }
      }
    });

    // Mapeamos el resultado para que coincida con lo que espera el frontend
    return projects.map((p: any) => ({
      ...p,
      activeTests: p._count.test_cases
    }));
  }

  async create(data: { name: string; description?: string; repository_url?: string }) {
    // 'data' debe ser validado (usando Zod, Joi, etc.) pero aquí lo pasamos directo
    return prisma.project.create({
      data: data,
    });
  }

  async analyzeCodeQuality(id: string) {
    // Esta es una función compleja.
    // Aquí iría la lógica para clonar el repo, correr SonarQube o similar.
    // Por ahora, devolvemos un análisis mock y lo guardamos.
    const analysisData = {
      issues_count: Math.floor(Math.random() * 50),
      code_smells: Math.floor(Math.random() * 20),
      vulnerabilities: Math.floor(Math.random() * 5),
      coverage_percentage: Math.random() * 100,
    };

    return prisma.codeAnalysis.create({
      data: {
        project_id: Number(id),
        ...analysisData,
      },
    });
  }
}