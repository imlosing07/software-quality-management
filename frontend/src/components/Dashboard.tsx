import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table } from 'antd';
import { Line } from '@ant-design/plots';
import { projectService } from '../services/projectService';
import { metricsService } from '../services/metricsService';

interface DashboardData {
  totalProjects: number;
  activeTests: number;
  avgCoverage: number;
  recentMetrics: any[];
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const projects = await projectService.getAll();
      const metrics = await metricsService.getRecent();

      setData({
        totalProjects: projects.length,
        activeTests: calculateActiveTests(projects),
        avgCoverage: calculateAvgCoverage(metrics),
        recentMetrics: metrics
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateActiveTests = (projects: any[]) => {
    return projects.reduce((sum, p) => sum + (p.activeTests || 0), 0);
  };

  const calculateAvgCoverage = (metrics: any[]) => {
    const coverageMetrics = metrics.filter(m => m.metric_name === 'coverage');
    if (coverageMetrics.length === 0) return 0;
    return coverageMetrics.reduce((sum, m) => sum + m.metric_value, 0) / coverageMetrics.length;
  };

  const lineConfig = {
    data: data?.recentMetrics || [],
    xField: 'timestamp',
    yField: 'metric_value',
    seriesField: 'metric_name',
    smooth: true,
  };

  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Proyectos Totales" value={data?.totalProjects} loading={loading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Pruebas Activas" value={data?.activeTests} loading={loading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Cobertura Promedio"
              value={data?.avgCoverage}
              suffix="%"
              precision={2}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Tendencia de Métricas">
            <Line {...lineConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
