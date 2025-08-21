import React from 'react';
import styles from './acerca.module.css';

const Acerca = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Header Section */}
        <section className={`${styles.card} ${styles.headerCard}`}>
          <h1>Acerca del Proyecto</h1>
          <p className={styles.subtitle}>
            Monitoreo y automatización de plantas de agua potable rurales
          </p>
        </section>

      {/* History and Objectives */}
      <section className={`${styles.card} ${styles.historyObjectivesCard}`}>
        <div className={styles.twoColumn}>
          <div className={styles.historySection}>
            <h2>Nuestra Historia</h2>
            <p>Nuestro proyecto nació en 2023 con la visión de transformar la gestión del agua potable en zonas rurales. 
            Ante la creciente necesidad de soluciones tecnológicas accesibles, nos propusimos desarrollar un sistema integral 
            que permita el monitoreo y control remoto de plantas de agua, mejorando significativamente la calidad y disponibilidad 
            del recurso hídrico en comunidades alejadas de los centros urbanos.</p>
          </div>
          <div className={styles.objectivesSection}>
            <h2>Nuestro Objetivo</h2>
            <ul className={styles.objectivesList}>
              <li className={styles.objectiveItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Implementar sistemas de monitoreo en tiempo real para plantas de agua potable rurales</span>
              </li>
              <li className={styles.objectiveItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Automatizar procesos críticos para garantizar la calidad y disponibilidad del agua</span>
              </li>
              <li className={styles.objectiveItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Facilitar el acceso a datos e información para la toma de decisiones informadas</span>
              </li>
              <li className={styles.objectiveItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Promover el uso sostenible de los recursos hídricos en comunidades rurales</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Present and Future */}
      <section className={styles.presentFutureContainer}>
        <div className={`${styles.card} ${styles.presentCard}`}>
          <div className={styles.cardHeader}>
            <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h2>Presente</h2>
          </div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.featureNumber}>13+</span>
              <span>Plantas de agua monitoreadas en tiempo real</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureNumber}>24/7</span>
              <span>Seguimiento continuo de la calidad del agua</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureNumber}>100+</span>
              <span>Sensores desplegados en campo</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureNumber}>5</span>
              <span>Comunidades rurales beneficiadas</span>
            </li>
          </ul>
        </div>

        <div className={`${styles.card} ${styles.futureCard}`}>
          <div className={styles.cardHeader}>
            <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
              <line x1="16.24" y1="7.76" x2="12" y2="12"></line>
            </svg>
            <h2>Futuro</h2>
          </div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>→</span>
              <span>Ampliar cobertura a 30+ comunidades rurales</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>→</span>
              <span>Integrar IA para predicción de mantenimiento</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>→</span>
              <span>Implementar aplicación móvil comunitaria</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>→</span>
              <span>Automatización de reportes para autoridades</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsCard}>
        <h2 className={styles.sectionTitle}>Lo que dicen sobre nosotros</h2>
        <div className={styles.testimonialsGrid}>
          {/* Testimonial 1 */}
          <div className={styles.testimonial}>
            <div className={styles.avatar}>
              <span>JP</span>
            </div>
            <div className={styles.quoteContainer}>
              <p className={styles.quote}>
                "El sistema de monitoreo nos ha permitido tomar decisiones más informadas y mejorar la calidad del agua que suministramos a nuestra comunidad."
              </p>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Juan Pérez</span>
                <span className={styles.authorTitle}>Presidente JAA</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className={styles.testimonial}>
            <div className={styles.avatar} style={{backgroundColor: '#4f46e5'}}>
              <span>MG</span>
            </div>
            <div className={styles.quoteContainer}>
              <p className={styles.quote}>
                "Antes pasábamos horas revisando los niveles manualmente. Ahora con el sistema automatizado, podemos enfocarnos en mejorar el servicio."
              </p>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>María Gómez</span>
                <span className={styles.authorTitle}>Operaria de Planta</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className={styles.testimonial}>
            <div className={styles.avatar} style={{backgroundColor: '#10b981'}}>
              <span>CL</span>
            </div>
            <div className={styles.quoteContainer}>
              <p className={styles.quote}>
                "Como vecino, me siento más seguro sabiendo que la calidad del agua se monitorea constantemente. Es un gran avance para nuestra comunidad."
              </p>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Carlos López</span>
                <span className={styles.authorTitle}>Usuario</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Acerca;
