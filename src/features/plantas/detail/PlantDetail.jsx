/**
 * Feature: Plantas / Detail
 * This is the Plant Detail feature; it contains the plant detail page with tabs for different views.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlant, getLatestReadings } from '../../../lib/apiClient';
import { useAuth, ROLES } from '../../../contexts/AuthContext';
import uiStyles from '../../../styles/ui.module.css';
import styles from '../../../styles/plant-detail.module.css';
import Loading from '../../../components/feedback/Loading';
import Empty from '../../../components/feedback/Empty';
import Error from '../../../components/feedback/Error';

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
  const navigate = useNavigate();

  // Cargar datos de la planta y lecturas
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [plantData, readingsData] = await Promise.all([
          getPlant(id),
          getLatestReadings(id, 5) // Últimas 5 lecturas
        ]);
        
        setPlant(plantData);
        setReadings(readingsData);
      } catch (err) {
        console.error('Error loading plant data:', err);
        setError('No se pudo cargar la información de la planta');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Verificar si el usuario tiene acceso a la pestaña actual
  const canAccessTab = (tabName) => {
    if (role === ROLES.ADMIN) return true;
    if (tabName === 'resumen') return true;
    if (tabName === 'lecturas' && [ROLES.OPERARIO, ROLES.ADMIN].includes(role)) return true;
    if (tabName === 'estado' && [ROLES.OPERARIO, ROLES.ADMIN].includes(role)) return true;
    if (tabName === 'info' && [ROLES.OPERARIO, ROLES.PRESIDENTE_JAA, ROLES.ADMIN].includes(role)) return true;
    return false;
  };

  // Renderizar el contenido de la pestaña activa
  const renderTabContent = () => {
    if (!plant) return null;

    switch (activeTab) {
      case 'resumen':
        return (
          <div className={styles.tabContent}>
            <h3>Resumen de la Planta</h3>
            <div className={styles.kpiGrid}>
              <KpiCard 
                value={plant.estado_actual || 'N/A'} 
                label="Estado Actual" 
                unit={plant.estado_actual === 'ok' ? '✓' : plant.estado_actual === 'warning' ? '⚠️' : '❌'} 
              />
              <KpiCard 
                value={plant.caudal_actual || '0'} 
                label="Caudal" 
                unit="L/s" 
              />
              <KpiCard 
                value={plant.nivel_cloro || '0'} 
                label="Nivel de Cloro" 
                unit="mg/L" 
              />
              <KpiCard 
                value={plant.ph || '0'} 
                label="pH" 
              />
            </div>
            
            <div className={styles.section}>
              <h4>Últimas lecturas</h4>
              {readings.length > 0 ? (
                <div className={styles.readingsTable}>
                  <div className={styles.tableHeader}>
                    <div>Fecha</div>
                    <div>Caudal (L/s)</div>
                    <div>Cloro (mg/L)</div>
                    <div>pH</div>
                    <div>Estado</div>
                  </div>
                  {readings.map((reading, index) => (
                    <div key={index} className={styles.tableRow}>
                      <div>{new Date(reading.fecha).toLocaleString()}</div>
                      <div>{reading.caudal}</div>
                      <div>{reading.cloro}</div>
                      <div>{reading.ph}</div>
                      <div><StatusChip status={reading.estado} /></div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay lecturas recientes</p>
              )}
            </div>
          </div>
        );

      case 'lecturas':
        return (
          <div className={styles.tabContent}>
            <h3>Historial de Lecturas</h3>
            <p>Aquí se mostrará el historial completo de lecturas de la planta.</p>
            {/* Implementar tabla de lecturas con paginación */}
          </div>
        );

      case 'estado':
        return (
          <div className={styles.tabContent}>
            <h3>Estado del Sistema</h3>
            <div className={styles.statusGrid}>
              <div className={styles.statusCard}>
                <h4>Bombas</h4>
                <StatusChip status={plant.estado_bombas} />
                <p>Última revisión: {new Date(plant.ultima_revision).toLocaleDateString()}</p>
              </div>
              <div className={styles.statusCard}>
                <h4>Tanque de Almacenamiento</h4>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${plant.nivel_tanque || 0}%` }}
                    role="progressbar"
                    aria-label="Nivel del tanque"
                    aria-valuenow={plant.nivel_tanque || 0}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {plant.nivel_tanque || 0}%
                  </div>
                </div>
              </div>
              <div className={styles.statusCard}>
                <h4>Calidad del Agua</h4>
                <StatusChip status={plant.calidad_agua} />
                <p>Último análisis: {new Date(plant.ultimo_analisis).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        );

      case 'info':
        return (
          <div className={styles.tabContent}>
            <h3>Información de la Planta</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h4>Datos Generales</h4>
                <p><strong>Nombre:</strong> {plant.nombre}</p>
                <p><strong>Ubicación:</strong> {plant.ubicacion}</p>
                <p><strong>Fuente de agua:</strong> {plant.fuente}</p>
                <p><strong>Capacidad:</strong> {plant.capacidad} L/s</p>
                <p><strong>Población servida:</strong> {plant.poblacion_servida.toLocaleString()} habitantes</p>
              </div>
              
              <div className={styles.infoCard}>
                <h4>Contacto</h4>
                <p><strong>Operador:</strong> {plant.operador || 'No asignado'}</p>
                <p><strong>Teléfono:</strong> {plant.telefono || 'N/A'}</p>
                <p><strong>Email:</strong> {plant.email || 'N/A'}</p>
                <p><strong>Horario de atención:</strong> {plant.horario_atencion || 'L-V 8:00-17:00'}</p>
              </div>
              
              <div className={styles.infoCard}>
                <h4>Estadísticas</h4>
                <p><strong>En operación desde:</strong> {new Date(plant.fecha_operacion).getFullYear()}</p>
                <p><strong>Inversión total:</strong> ${plant.inversion_total?.toLocaleString() || 'N/A'}</p>
                <p><strong>Eficiencia:</strong> {plant.eficiencia || 'N/A'}%</p>
                <p><strong>Último mantenimiento:</strong> {plant.ultimo_mantenimiento ? 
                  new Date(plant.ultimo_mantenimiento).toLocaleDateString() : 'Nunca'}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  if (!plant) return <Empty message="No se encontró la planta solicitada" />;

  return (
    <div className={styles.plantDetail}>
      <header className={styles.header}>
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backButton}
          aria-label="Volver atrás"
        >
          &larr; Volver
        </button>
        <h1>{plant.nombre}</h1>
        <div className={styles.plantMeta}>
          <span className={styles.location}>{plant.ubicacion}</span>
          <StatusChip status={plant.estado_actual} />
        </div>
      </header>

      <div className={styles.tabContainer} role="tablist">
        <TabButton 
          active={activeTab === 'resumen'} 
          onClick={() => setActiveTab('resumen')}
        >
          Resumen
        </TabButton>
        
        {canAccessTab('lecturas') && (
          <TabButton 
            active={activeTab === 'lecturas'} 
            onClick={() => setActiveTab('lecturas')}
          >
            Lecturas
          </TabButton>
        )}
        
        {canAccessTab('estado') && (
          <TabButton 
            active={activeTab === 'estado'} 
            onClick={() => setActiveTab('estado')}
          >
            Estado
          </TabButton>
        )}
        
        {canAccessTab('info') && (
          <TabButton 
            active={activeTab === 'info'} 
            onClick={() => setActiveTab('info')}
          >
            Información
          </TabButton>
        )}
      </div>

      {renderTabContent()}

      <div className={styles.actions}>
        {[ROLES.OPERARIO, ROLES.ADMIN].includes(role) && (
          <button className={uiStyles.btnPrimary}>
            Registrar Lectura
          </button>
        )}
        
        {[ROLES.PRESIDENTE_JAA, ROLES.ADMIN].includes(role) && (
          <button className={uiStyles.btnOutline}>
            Generar Reporte
          </button>
        )}
        
        {role === ROLES.ADMIN && (
          <button className={uiStyles.btnDanger}>
            Editar Planta
          </button>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;
