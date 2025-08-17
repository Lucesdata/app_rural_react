import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import styles from './styles/home.module.css';
import uiStyles from './styles/ui.module.css';

// Componentes auxiliares para las ondas de fondo
const WaveBackground = () => (
  <>
    <div className={`${styles.wave} ${styles.wave1}`} aria-hidden="true" />
    <div className={`${styles.wave} ${styles.wave2}`} aria-hidden="true" />
    <div className={`${styles.wave} ${styles.wave3}`} aria-hidden="true" />
  </>
);

// Componente para las tarjetas KPI
const KpiCard = ({ value, label }) => (
  <div className={styles.kpiCard}>
    <div className={styles.kpiValue}>{value}</div>
    <div className={styles.kpiLabel}>{label}</div>
  </div>
);

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
            <a href="/dashboard" className={uiStyles.btnPrimary}>
              Ir al Dashboard
            </a>
            <button type="button" className={uiStyles.btnGhost}>
              Conocer más
            </button>
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

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div className={isHome ? styles.homeContainer : ''}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
