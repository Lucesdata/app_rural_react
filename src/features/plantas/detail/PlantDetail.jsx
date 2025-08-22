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
import TabButton from './components/TabButton';
import StatusChip from './components/StatusChip';
import ResumenTab from './components/ResumenTab';
import LecturasTab from './components/LecturasTab';
import EstadoTab from './components/EstadoTab';
import InfoTab from './components/InfoTab';

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
        return <ResumenTab plant={plant} readings={readings} />;
      case 'lecturas':
        return <LecturasTab readings={readings} />;
      case 'estado':
        return <EstadoTab plant={plant} />;
      case 'info':
        return <InfoTab plant={plant} />;
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
