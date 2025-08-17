import React from 'react';
import { Link } from 'react-router-dom';
import uiStyles from '../styles/ui.module.css';
import styles from '../styles/acerca.module.css';

const Acerca = () => {
  const valores = ["Transparencia", "Accesibilidad", "Confiabilidad", "Sostenibilidad"];

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Sobre App_Rural</h1>
          <p>Transparencia y monitoreo para sistemas de agua potable rurales.</p>
        </div>
      </section>

      <div className={uiStyles.container}>
        {/* Propósito Section */}
        <section className={styles.section}>
          <div className={styles.card}>
            <h2>Propósito</h2>
            <p>
              Nuestra misión es facilitar el monitoreo continuo de sistemas de agua potable en zonas rurales, 
              proporcionando datos confiables para la toma de decisiones informadas que garanticen la continuidad 
              del servicio y la calidad del agua para las comunidades.
            </p>
          </div>
        </section>

        {/* Objetivos Section */}
        <section className={styles.section}>
          <h2>Nuestros Objetivos</h2>
          <div className={styles.gridThree}>
            <div className={styles.card}>
              <h3>Monitoreo continuo</h3>
              <p>Métricas clave en tiempo real para el seguimiento de la calidad y disponibilidad del agua.</p>
            </div>
            <div className={uiStyles.card}>
              <h3>Alertas tempranas</h3>
              <p>Sistema de notificaciones para la prevención y respuesta rápida ante posibles problemas.</p>
            </div>
            <div className={uiStyles.card}>
              <h3>Eficiencia operativa</h3>
              <p>Herramientas de soporte para operarios y Juntas Administradoras de Agua (JAA).</p>
            </div>
          </div>
        </section>

        {/* Cobertura Section */}
        <section className={styles.section} aria-label="Áreas de cobertura">
          <div className={styles.card}>
            <h2>Cobertura</h2>
            <div className={styles.placeholder}>
              Mapa de cobertura (próximamente)
            </div>
          </div>
        </section>

        {/* Valores Section */}
        <section className={styles.section}>
          <h2>Nuestros Valores</h2>
          <div className={styles.chips}>
            {valores.map((valor, index) => (
              <span key={index} className={uiStyles.chip}>
                {valor}
              </span>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <Link to="/dashboard" className={uiStyles.btnPrimary}>
            Ver Dashboard
          </Link>
        </section>
      </div>
    </main>
  );
};



export default Acerca;
