import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [energySeries, setEnergySeries] = useState([]);

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
        const series = Array.from({ length: 20 }, () => 8 + Math.random() * 6);
        setEnergySeries(series);
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

  const requestSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const filteredAndSortedPlants = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    let rows = plantsData.filter((p) => {
      const matchesQuery = !normalizedQuery ||
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.vereda.toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });

    const statusRank = { danger: 0, warning: 1, normal: 2 };
    const { key, direction } = sortConfig;
    rows.sort((a, b) => {
      let cmp = 0;
      if (key === 'users' || key === 'flow') {
        const aVal = key === 'flow' ? parseFloat(a[key]) : a[key];
        const bVal = key === 'flow' ? parseFloat(b[key]) : b[key];
        cmp = aVal === bVal ? 0 : aVal < bVal ? -1 : 1;
      } else if (key === 'status') {
        cmp = statusRank[a.status] - statusRank[b.status];
      } else {
        const aVal = String(a[key]).toLowerCase();
        const bVal = String(b[key]).toLowerCase();
        cmp = aVal.localeCompare(bVal);
      }
      return direction === 'asc' ? cmp : -cmp;
    });
    return rows;
  }, [plantsData, searchQuery, statusFilter, sortConfig]);

  const downloadCsv = useCallback(() => {
    const headers = ['id', 'name', 'vereda', 'status', 'flow', 'users'];
    const rows = filteredAndSortedPlants.map((p) => headers.map((h) => p[h]));
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'plantas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [filteredAndSortedPlants]);

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
                  <svg viewBox="0 0 100 60" preserveAspectRatio="none" width="100%" height="60">
                    <polyline 
                      fill="rgba(6, 182, 212, 0.15)" 
                      stroke="none" 
                      points={`0,60 ${energySeries.map((v, i) => {
                        const x = (i / (Math.max(energySeries.length - 1, 1))) * 100;
                        const y = 60 - ((v - 8) / 6) * 55;
                        return `${x},${y}`;
                      }).join(' ')} 100,60`}
                    />
                    <polyline 
                      fill="none" 
                      stroke="var(--color-primary)" 
                      strokeWidth="1.5" 
                      points={energySeries.map((v, i) => {
                        const x = (i / (Math.max(energySeries.length - 1, 1))) * 100;
                        const y = 60 - ((v - 8) / 6) * 55;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabla de plantas */}
        <section className={uiStyles.section}>
          <h2>Plantas</h2>
          <div className={styles.controlsBar}>
            <div className={styles.controlGroup}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por planta o vereda..."
                className={styles.searchInput}
                aria-label="Buscar plantas"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.select}
                aria-label="Filtrar por estado"
              >
                <option value="all">Todos los estados</option>
                <option value="normal">Normal</option>
                <option value="warning">Advertencia</option>
                <option value="danger">Crítico</option>
              </select>
            </div>
            <div className={styles.tableActions}>
              <button type="button" className={uiStyles.btnGhost} onClick={downloadCsv}>
                Exportar CSV
              </button>
              <Link to="/plantas" className={uiStyles.btnPrimary}>
                Ver todas
              </Link>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table} aria-label="Lista de plantas">
              <thead>
                <tr>
                  <th>
                    <button 
                      type="button" 
                      className={styles.thButton}
                      onClick={() => requestSort('name')}
                      aria-label={`Ordenar por planta (${sortConfig.key === 'name' ? sortConfig.direction : 'asc'})`}
                    >
                      Planta
                      <span className={`${styles.sortIcon} ${sortConfig.key === 'name' ? styles[sortConfig.direction] : ''}`} aria-hidden="true">▾</span>
                    </button>
                  </th>
                  <th>
                    <button 
                      type="button" 
                      className={styles.thButton}
                      onClick={() => requestSort('vereda')}
                      aria-label={`Ordenar por vereda (${sortConfig.key === 'vereda' ? sortConfig.direction : 'asc'})`}
                    >
                      Vereda
                      <span className={`${styles.sortIcon} ${sortConfig.key === 'vereda' ? styles[sortConfig.direction] : ''}`} aria-hidden="true">▾</span>
                    </button>
                  </th>
                  <th>
                    <button 
                      type="button" 
                      className={styles.thButton}
                      onClick={() => requestSort('status')}
                      aria-label={`Ordenar por estado (${sortConfig.key === 'status' ? sortConfig.direction : 'asc'})`}
                    >
                      Estado
                      <span className={`${styles.sortIcon} ${sortConfig.key === 'status' ? styles[sortConfig.direction] : ''}`} aria-hidden="true">▾</span>
                    </button>
                  </th>
                  <th>
                    <button 
                      type="button" 
                      className={styles.thButton}
                      onClick={() => requestSort('flow')}
                      aria-label={`Ordenar por caudal (${sortConfig.key === 'flow' ? sortConfig.direction : 'asc'})`}
                    >
                      Caudal (L/s)
                      <span className={`${styles.sortIcon} ${sortConfig.key === 'flow' ? styles[sortConfig.direction] : ''}`} aria-hidden="true">▾</span>
                    </button>
                  </th>
                  <th>
                    <button 
                      type="button" 
                      className={styles.thButton}
                      onClick={() => requestSort('users')}
                      aria-label={`Ordenar por usuarios (${sortConfig.key === 'users' ? sortConfig.direction : 'asc'})`}
                    >
                      Usuarios
                      <span className={`${styles.sortIcon} ${sortConfig.key === 'users' ? styles[sortConfig.direction] : ''}`} aria-hidden="true">▾</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedPlants.map((plant) => (
                  <tr key={plant.id}>
                    <td>
                      <Link to={`/plantas/${plant.id}`} className={styles.rowLink}>
                        {plant.name}
                      </Link>
                    </td>
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