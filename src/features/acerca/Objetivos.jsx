import React from 'react';
import styles from '../../styles/acerca.module.css';
import uiStyles from '../../styles/ui.module.css';

const Objetivos = () => (
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
);

export default Objetivos;
