import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import WaveBackground from './components/WaveBackground';
import KpiCard from './components/KpiCard';
import styles from '../../styles/home.module.css';
import uiStyles from '../../styles/ui.module.css';

// Datos mock para las tarjetas KPI
const kpiData = [
  { value: '98%', label: 'Calidad OK' },
  { value: '24/7', label: 'Monitoreo' },
  { value: '1.2K', label: 'Usuarios' },
];

const Home = () => {
  const { isAuthenticated, user, hasAnyRole } = useAuth();

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className={styles.ctaRow}>
          <Link to="/plantas" className={uiStyles.btnPrimary}>
            Ver Plantas
          </Link>
          {hasAnyRole(['ADMIN', 'OPERARIO']) && (
            <Link to="/dashboard" className={uiStyles.btnGhost}>
              Panel de Control
            </Link>
          )}
        </div>
      );
    }
    
    return (
      <div className={styles.ctaRow}>
        <Link 
          to="/login" 
          className={uiStyles.btnPrimary}
          state={{ from: '/plantas' }}
        >
          Iniciar Sesión
        </Link>
        <Link to="/registro" className={uiStyles.btnGhost}>
          Crear Cuenta
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.hero}>
      <WaveBackground />
      <div className={uiStyles.container}>
        <main className={styles.heroContent}>
          <h1 className={styles.title}>
            {isAuthenticated 
              ? `Bienvenido/a, ${user?.name || 'Usuario'}` 
              : 'Monitoreo rural de agua potable'}
          </h1>
          
          <p className={styles.subtitle}>
            {isAuthenticated
              ? 'Accede a las herramientas de monitoreo y gestión de plantas de agua.'
              : 'Visualiza estado, sensores y servicio en tiempo real para comunidades rurales.'}
          </p>
          
          {renderAuthButtons()}
          
          <div className={styles.kpiRow}>
            {kpiData.map((kpi) => (
              <KpiCard
                key={kpi.label}
                value={kpi.value}
                label={kpi.label}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
