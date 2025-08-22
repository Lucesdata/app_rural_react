/**
 * Feature: Acerca
 * This is the Acerca feature; it contains the about page with information about the application.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import uiStyles from '../../styles/ui.module.css';
import styles from '../../styles/acerca.module.css';

const valores = [
  "Transparencia",
  "Accesibilidad",
  "Confiabilidad",
  "Sostenibilidad"
];

const Acerca = () => {

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
        <section className={styles.section}>
          <h2>Cobertura</h2>
          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <h3>Áreas de impacto</h3>
              <p>Actualmente operamos en 15 comunidades rurales de la región, beneficiando a más de 5,000 familias.</p>
              <ul className={styles.coberturaList}>
                <li>Monitoreo de 12 plantas de tratamiento</li>
                <li>25 sistemas de distribución</li>
                <li>10 fuentes de agua protegidas</li>
              </ul>
            </div>
            <div className={styles.card}>
              <h3>Próximas expansiones</h3>
              <p>Estamos trabajando para ampliar nuestra cobertura a 10 comunidades adicionales para finales del próximo año.</p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: '60%' }}
                  role="progressbar"
                  aria-valuenow={60}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Porcentaje de comunidades adicionales cubiertas"
                ></div>
              </div>
              <p className={styles.progressText}>60% de la meta de expansión alcanzada</p>
            </div>
          </div>
        </section>

        {/* Valores Section */}
        <section className={styles.section}>
          <h2>Nuestros Valores</h2>
          <div className={styles.chipsContainer}>
            {valores.map((valor, index) => (
              <span key={index} className={styles.chip}>
                {valor}
              </span>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nuestra plataforma y comienza a monitorear la calidad del agua en tu comunidad.</p>
          <div className={styles.ctaButtons}>
            <Link to="/registro" className={uiStyles.btnPrimary}>
              Crear cuenta
            </Link>
            <Link to="/contacto" className={uiStyles.btnOutline}>
              Contáctanos
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Acerca;
