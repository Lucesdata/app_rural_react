/**
 * Feature: Dashboard
 * This is the Dashboard feature; it contains the main dashboard page with KPIs, alerts, and status overview.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import AlertItem from './components/AlertItem';
import StatusCell from './components/StatusCell';
import styles from '../../styles/dashboard.module.css';
import uiStyles from '../../styles/ui.module.css';
import Loading from '../../components/feedback/Loading';
import Empty from '../../components/feedback/Empty';
import Error from '../../components/feedback/Error';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  // Datos mock para el dashboard
  const mockData = {
    kpis: [
      { title: 'Plantas Activas', value: '12', trend: '+2', trendPositive: true },
      { title: 'Alertas Hoy', value: '3', trend: '-1', trendPositive: false },
      { title: 'Consumo Promedio', value: '1.2M', unit: 'L', trend: '0%', trendPositive: true },
      { title: 'Eficiencia', value: '92%', trend: '+2%', trendPositive: true },
    ],
    alerts: [
      { time: '10:30', message: 'Alta demanda en Planta Norte', severity: 'warning' },
      { time: '09:15', message: 'Nivel de cloro bajo en Planta Sur', severity: 'danger' },
      { time: '08:45', message: 'Actualización de firmware completada', severity: 'info' },
    ],
    plants: [
      { id: 1, name: 'Planta Norte', status: 'normal', lastUpdate: 'Hace 5 min' },
      { id: 2, name: 'Planta Sur', status: 'warning', lastUpdate: 'Hace 15 min' },
      { id: 3, name: 'Planta Este', status: 'normal', lastUpdate: 'Hace 2 min' },
      { id: 4, name: 'Planta Oeste', status: 'danger', lastUpdate: 'Hace 1 hora' },
    ]
  };

  useEffect(() => {
    // Simular carga de datos
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simular retraso de red
        await new Promise(resolve => setTimeout(resolve, 800));
        setDashboardData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('No se pudieron cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  if (!dashboardData) return <Empty message="No hay datos disponibles" />;

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <h1>Panel de Control</h1>
        <p>Vista general del sistema de monitoreo</p>
      </header>

      {/* Sección de KPIs */}
      <section className={styles.kpiSection}>
        <h2>Resumen General</h2>
        <div className={styles.kpiGrid}>
          {dashboardData.kpis.map((kpi, index) => (
            <div key={index} className={styles.kpiCard}>
              <div className={styles.kpiValue}>
                {kpi.value} {kpi.unit && <span className={styles.kpiUnit}>{kpi.unit}</span>}
              </div>
              <div className={styles.kpiTitle}>{kpi.title}</div>
              <div className={`${styles.kpiTrend} ${kpi.trendPositive ? styles.positive : styles.negative}`}>
                {kpi.trend}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.dashboardContent}>
        {/* Sección de Alertas */}
        <section className={styles.alertsSection}>
          <div className={styles.sectionHeader}>
            <h2>Alertas Recientes</h2>
            <Link to="/alertas" className={styles.viewAllLink}>Ver todas</Link>
          </div>
          <div className={styles.alertsList}>
            {dashboardData.alerts.map((alert, index) => (
              <AlertItem 
                key={index}
                time={alert.time}
                message={alert.message}
                severity={alert.severity}
              />
            ))}
          </div>
        </section>

        {/* Sección de Plantas */}
        <section className={styles.plantsSection}>
          <div className={styles.sectionHeader}>
            <h2>Estado de Plantas</h2>
            <Link to="/plantas" className={styles.viewAllLink}>Ver todas</Link>
          </div>
          <div className={styles.plantsGrid}>
            {dashboardData.plants.map((plant) => (
              <Link to={`/plantas/${plant.id}`} key={plant.id} className={styles.plantCard}>
                <div className={styles.plantHeader}>
                  <h3>{plant.name}</h3>
                  <StatusCell status={plant.status} />
                </div>
                <div className={styles.plantDetails}>
                  <div className={styles.plantDetail}>
                    <span className={styles.detailLabel}>Estado:</span>
                    <span className={styles.detailValue}>
                      {plant.status === 'normal' ? 'Operativo' : 
                       plant.status === 'warning' ? 'En advertencia' : 'Crítico'}
                    </span>
                  </div>
                  <div className={styles.plantDetail}>
                    <span className={styles.detailLabel}>Última actualización:</span>
                    <span className={styles.detailValue}>{plant.lastUpdate}</span>
                  </div>
                </div>
                <div className={styles.viewDetails}>Ver detalles →</div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Sección de Gráficos */}
      <section className={styles.chartsSection}>
        <h2>Métricas Clave</h2>
        <div className={styles.chartsGrid}>
          <div className={styles.chartContainer}>
            <h3>Consumo de Agua (7 días)</h3>
            <div className={styles.chartPlaceholder}>
              <p>Gráfico de consumo de agua</p>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <h3>Calidad del Agua</h3>
            <div className={styles.chartPlaceholder}>
              <p>Métricas de calidad</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
