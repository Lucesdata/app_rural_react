/**
 * Objetivos section for the Acerca page.
 */
import React from 'react';
import styles from '../../../styles/acerca.module.css';

const Objetivos = () => (
  <article className={styles.card}>
    <h2>Nuestros Objetivos</h2>
    <ul className={styles.list}>
      <li>
        <strong>Monitoreo continuo:</strong> métricas clave en tiempo real para la calidad y
        disponibilidad del agua.
      </li>
      <li>
        <strong>Alertas tempranas:</strong> sistema de notificaciones para la prevención y respuesta
        rápida ante posibles problemas.
      </li>
      <li>
        <strong>Eficiencia operativa:</strong> herramientas de soporte para operarios y Juntas
        Administradoras de Agua (JAA).
      </li>
    </ul>
  </article>
);

export default Objetivos;
