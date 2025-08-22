/**
 * Feature: Home
 * This is the Home feature; it contains the main landing page with hero section and KPIs.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import WaveBackground from './components/WaveBackground';
import KpiCard from './components/KpiCard';
import styles from '../../styles/home.module.css';
import uiStyles from '../../styles/ui.module.css';

const Home = () => {
  // Datos mock para las tarjetas KPI
  const kpiData = [
    { value: '98%', label: 'Calidad OK' },
    { value: '24/7', label: 'Monitoreo' },
    { value: '1.2K', label: 'Usuarios' },
  ];

  return (
    <div className={styles.hero}>
      <WaveBackground />
      <div className={uiStyles.container}>
        <main className={styles.heroContent}>
          <h1 className={styles.title}>
            Monitoreo rural de agua potable
          </h1>
          
          <p className={styles.subtitle}>
            Visualiza estado, sensores y servicio en tiempo real para comunidades rurales.
          </p>
          
          <div className={styles.ctaRow}>
            <Link to="/dashboard" className={uiStyles.btnPrimary}>
              Ir al Dashboard
            </Link>
            <Link to="/acerca" className={uiStyles.btnGhost}>
              Conocer más
            </Link>
          </div>
          
          <div className={styles.kpiRow}>
            {kpiData.map((kpi, index) => (
              <KpiCard 
                key={index}
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
