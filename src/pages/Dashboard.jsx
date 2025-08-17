import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';
import uiStyles from '../styles/ui.module.css';
import Loading from '../components/feedback/Loading';
import Empty from '../components/feedback/Empty';
import Error from '../components/feedback/Error';

// Componente para las barras de progreso
const ProgressBar = ({ percentage, label, color = 'primary' }) => (
  <div className={styles.progressContainer}>
    <div className={styles.progressLabel}>
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className={styles.progressBar}>
      <div 
        className={`${styles.progressFill} ${styles[color]}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
);

// Componente para las alertas
const AlertItem = ({ time, message, severity = 'info' }) => (
  <div className={`${styles.alertItem} ${styles[severity]}`}>
    <div className={styles.alertTime}>{time}</div>
    <div className={styles.alertMessage}>{message}</div>
  </div>
);

// Componente para las celdas de estado
const StatusCell = ({ status }) => {
  const statusMap = {
    normal: { label: 'Normal', className: styles.statusNormal },
    warning: { label: 'Advertencia', className: styles.statusWarning },
    danger: { label: 'Crítico', className: styles.statusDanger }
  };
  
  const { label, className } = statusMap[status] || statusMap.normal;
  
  return <span className={`${styles.statusChip} ${className}`}>{label}</span>;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulando carga de datos
        setLoading(true);
        // En una implementación real, aquí iría la llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos mock para la tabla de plantas
        const mockData = [
          { id: 1, name: 'Campoalegre', vereda: 'La Esperanza', status: 'normal', flow: '12.5', users: 245 },
          { id: 2, name: 'Soledad', vereda: 'El Porvenir', status: 'warning', flow: '8.2', users: 178 },
          { id: 3, name: 'Cascajal', vereda: 'San Isidro', status: 'normal', flow: '15.7', users: 312 },
          { id: 4, name: 'Voragine', vereda: 'El Edén', status: 'danger', flow: '5.3', users: 92 },
          { id: 5, name: 'Carbonero', vereda: 'Las Brisas', status: 'normal', flow: '10.1', users: 203 },
        ];
        
        setPlantsData(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Datos mock para las alertas
  const alertsData = [
    { id: 1, time: '10:23 AM', message: 'Bajo nivel de cloro en Campoalegre', severity: 'warning' },
    { id: 2, time: '09:45 AM', message: 'Falla en sensor de caudal en Voragine', severity: 'danger' },
    { id: 3, time: '08:12 AM', message: 'Mantenimiento programado completado', severity: 'info' },
  ];

  // Mostrar estados de carga, error o vacío
  if (loading) return <Loading message="Cargando datos del panel..." />;
  if (error) return <Error message="Error al cargar el panel" error={error} onRetry={() => window.location.reload()} />;
  if (plantsData.length === 0) return <Empty message="No hay datos disponibles para mostrar" />;

  return (
    <div className={styles.dashboard}>
      <div className={uiStyles.container}>
        <header className={styles.header}>
          <h1>Dashboard operativo</h1>
          <p className={styles.subtitle}>Resumen en tiempo real de plantas rurales (datos de prueba)</p>
        </header>

        {/* Sección de KPIs */}
        <section className={uiStyles.section}>
          <div className={uiStyles.kpiRow}>
            <div className={uiStyles.kpiCard}>
              <div className={styles.kpiValue}>42</div>
              <div className={styles.kpiLabel}>Sensores activos</div>
            </div>
            <div className={uiStyles.kpiCard}>
              <div className={styles.kpiValue}>8.1</div>
              <div className={styles.kpiLabel}>Caudal promedio (L/s)</div>
            </div>
            <div className={uiStyles.kpiCard}>
              <div className={styles.kpiValue}>99.2%</div>
              <div className={styles.kpiLabel}>Disponibilidad</div>
          </div>
        </div>
      </section>

      {/* Sección de tarjetas */}
      <section className={uiStyles.section}>
        <div className={styles.gridTwo}>
          {/* Tarjeta de operación */}
          <div className={`${uiStyles.card} ${styles.card}`}>
            <h2>Operación</h2>
            <div className={styles.progressSection}>
              <ProgressBar percentage={76} label="Plantas en verde" color="success" />
              <ProgressBar percentage={18} label="Plantas en amarillo" color="warning" />
              <ProgressBar percentage={6} label="Plantas en rojo" color="danger" />
            </div>
          </div>

          {/* Tarjeta de consumo de energía */}
          <div className={`${uiStyles.card} ${styles.card}`}>
            <h2>Consumo energía</h2>
            <div className={styles.energyConsumption}>
              <div className={styles.energyItem}>
                <span>Hoy</span>
                <strong>12.4 kWh</strong>
              </div>
              <div className={styles.energyItem}>
                <span>Semana</span>
                <strong>86 kWh</strong>
              </div>
              <div className={styles.sparkline} aria-hidden="true">
                <div className={styles.sparklineLine}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de plantas */}
      <section className={uiStyles.section}>
        <h2>Plantas</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table} aria-label="Lista de plantas">
            <thead>
              <tr>
                <th>Planta</th>
                <th>Vereda</th>
                <th>Estado</th>
                <th>Caudal (L/s)</th>
                <th>Usuarios</th>
              </tr>
            </thead>
            <tbody>
              {plantsData.map((plant) => (
                <tr key={plant.id}>
                  <td>{plant.name}</td>
                  <td>{plant.vereda}</td>
                  <td><StatusCell status={plant.status} /></td>
                  <td>{plant.flow}</td>
                  <td>{plant.users}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Panel de alertas */}
      <section className={uiStyles.section}>
        <h2>Alertas recientes</h2>
        <div className={styles.alertsContainer}>
          {alertsData.map((alert) => (
            <AlertItem 
              key={alert.id}
              time={alert.time}
              message={alert.message}
              severity={alert.severity}
            />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default Dashboard;
