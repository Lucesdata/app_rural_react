import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlant, getLatestReadings } from '../lib/apiClient';
import { useAuth, ROLES } from '../contexts/AuthContext';
import uiStyles from '../styles/ui.module.css';
import styles from '../styles/plant-detail.module.css';
import Loading from '../components/feedback/Loading';
import Empty from '../components/feedback/Empty';
import Error from '../components/feedback/Error';

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`${uiStyles.btn} ${styles.tabButton} ${active ? styles.activeTab : ''}`}
    onClick={onClick}
    aria-selected={active}
    role="tab"
  >
    {children}
  </button>
);

const KpiCard = ({ value, label, unit = '' }) => (
  <div className={styles.kpiCard}>
    <div className={styles.kpiValue}>
      {value}
      {unit && <span className={styles.kpiUnit}>{unit}</span>}
    </div>
    <div className={styles.kpiLabel}>{label}</div>
  </div>
);

const StatusChip = ({ status }) => {
  const statusMap = {
    ok: { label: 'Óptimo', className: styles.statusOk },
    warning: { label: 'Advertencia', className: styles.statusWarning },
    error: { label: 'Crítico', className: styles.statusError }
  };
  
  const { label, className } = statusMap[status] || { label: 'Desconocido', className: styles.statusUnknown };
  
  return <span className={`${styles.statusChip} ${className}`}>{label}</span>;
};

const PlantDetail = () => {
  const { id } = useParams();
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState('resumen');
  const [plant, setPlant] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Define which tabs are visible based on role
  const visibleTabs = React.useMemo(() => {
    const tabs = [
      { id: 'resumen', label: 'Resumen' },
      { id: 'info', label: 'Información' }
    ];
    
    if ([ROLES.OPERARIO, ROLES.ADMIN].includes(role)) {
      tabs.splice(1, 0, { id: 'lecturas', label: 'Lecturas' });
    }
    
    if ([ROLES.OPERARIO, ROLES.PRESIDENTE_JAA, ROLES.ADMIN].includes(role)) {
      tabs.splice(2, 0, { id: 'estado', label: 'Estado' });
    }
    
    return tabs;
  }, [role]);
  
  const navigate = useNavigate();

  // Reset to first visible tab if current tab is not available for the role
  useEffect(() => {
    if (!loading && !visibleTabs.some(tab => tab.id === activeTab)) {
      setActiveTab(visibleTabs[0]?.id || 'resumen');
    }
  }, [visibleTabs, activeTab, loading]);

  // Data fetching effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [plantData, readingsData] = await Promise.all([
          getPlant(id),
          getLatestReadings(id, 20)
        ]);
        
        if (!plantData) {
          throw new Error('Planta no encontrada');
        }
        
        setPlant(plantData);
        setReadings(readingsData);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error al cargar los datos de la planta. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className={`${uiStyles.container} ${styles.container}`}>
        <Loading message="Cargando información de la planta..." />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`${uiStyles.container} ${styles.container}`}>
        <Error 
          message="Error al cargar la planta" 
          error={error} 
          onRetry={() => window.location.reload()}
          additionalActions={[
            {
              label: 'Volver a la lista',
              onClick: () => navigate('/plantas'),
              variant: 'ghost'
            }
          ]}
        />
      </div>
    );
  }

  // Show empty state (shouldn't normally happen as we show error)
  if (!plant) {
    return (
      <div className={`${uiStyles.container} ${styles.container}`}>
        <Empty 
          message="No se encontró información de la planta solicitada"
          icon="🌱"
          buttonText="Volver a la lista"
          onButtonClick={() => navigate('/plantas')}
        />
      </div>
    );
  }

  const lastReading = readings[0] || {};
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'resumen':
        return (
          <div className={styles.tabContent}>
            <h2>Resumen de la Planta</h2>
            <div className={styles.kpiGrid}>
              <KpiCard 
                value={lastReading.flow || 'N/A'} 
                label="Caudal" 
                unit="L/s"
              />
              <KpiCard 
                value={lastReading.level || 'N/A'} 
                label="Nivel" 
                unit="%"
              />
              <KpiCard 
                value={lastReading.pressure || 'N/A'} 
                label="Presión" 
                unit="bar"
              />
              <KpiCard 
                value={lastReading.quality ? `${lastReading.quality}%` : 'N/A'} 
                label="Calidad"
              />
            </div>
            <div className={styles.lastUpdate}>
              Última actualización: {new Date(lastReading.timestamp).toLocaleString()}
            </div>
          </div>
        );
        
      case 'lecturas':
        return (
          <div className={styles.tabContent}>
            <h2>Últimas Lecturas</h2>
            <div className={styles.tableContainer}>
              <table className={styles.readingsTable}>
                <thead>
                  <tr>
                    <th>Fecha/Hora</th>
                    <th>Caudal (L/s)</th>
                    <th>Nivel (%)</th>
                    <th>Presión (bar)</th>
                    <th>Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading, index) => (
                    <tr key={index}>
                      <td>{new Date(reading.timestamp).toLocaleString()}</td>
                      <td>{reading.flow}</td>
                      <td>{reading.level}</td>
                      <td>{reading.pressure}</td>
                      <td>
                        <StatusChip status={reading.status} />
                        <span className={styles.qualityValue}>
                          {reading.quality}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'estado':
        return (
          <div className={styles.tabContent}>
            <h2>Estado de la Planta</h2>
            <div className={styles.statusGrid}>
              <div className={styles.statusItem}>
                <h3>Calidad del Agua</h3>
                <StatusChip status={lastReading.status} />
                <div className={styles.statusValue}>
                  {lastReading.quality}%
                </div>
                <div className={styles.statusDescription}>
                  {lastReading.quality >= 95 
                    ? 'La calidad del agua es excelente'
                    : lastReading.quality >= 85 
                      ? 'La calidad del agua requiere atención'
                      : 'La calidad del agua es crítica'}
                </div>
              </div>
              <div className={styles.statusItem}>
                <h3>Niveles</h3>
                <div className={styles.statusMeter}>
                  <div 
                    className={styles.meterBar} 
                    style={{
                      width: `${lastReading.level}%`,
                      backgroundColor: lastReading.level > 80 
                        ? '#10b981' 
                        : lastReading.level > 50 
                          ? '#f59e0b' 
                          : '#ef4444'
                    }}
                  />
                </div>
                <div className={styles.statusValue}>
                  {lastReading.level}%
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'info':
        return (
          <div className={styles.tabContent}>
            <h2>Información General</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <h3>Ubicación</h3>
                <p>{plant.vereda}, {plant.corregimiento}</p>
                {plant.coordenadas && (
                  <p className={styles.coordinates}>
                    {plant.coordenadas.lat}, {plant.coordenadas.lng}
                  </p>
                )}
              </div>
              
              <div className={styles.infoItem}>
                <h3>Fuente de Agua</h3>
                <p>{plant.fuente}</p>
                <p>Tipo: {plant.tipoAgua}</p>
              </div>
              
              <div className={styles.infoItem}>
                <h3>Capacidad</h3>
                <p>Usuarios: {plant.usuarios.toLocaleString()}</p>
                <p>Población: {plant.poblacion.toLocaleString()}</p>
              </div>
              
              <div className={styles.infoItem}>
                <h3>Caudales</h3>
                <p>Diseño: {plant.caudalDiseno} L/s</p>
                <p>Mínimo: {plant.caudalMinimo} L/s</p>
                <p>Máximo: {plant.caudalMaximo} L/s</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`${uiStyles.container} ${styles.container}`}>
      <header className={styles.header}>
        <h1>{plant.planta}</h1>
        <p className={styles.location}>
          {plant.vereda}, {plant.corregimiento}
        </p>
      </header>
      
      <div className={styles.tabs} role="tablist">
        {visibleTabs.map(tab => (
          <TabButton 
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>
      
      <div className={styles.tabPanel}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PlantDetail;
