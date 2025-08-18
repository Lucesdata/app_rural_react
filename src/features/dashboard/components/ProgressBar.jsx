import React from 'react';
import styles from '../../../styles/dashboard.module.css';

/**
 * ProgressBar - Muestra una barra de progreso con etiqueta y porcentaje
 * @param {Object} props - Propiedades del componente
 * @param {number} props.percentage - Porcentaje de progreso (0-100)
 * @param {string} props.label - Texto descriptivo de la barra
 * @param {string} [props.color='primary'] - Color de la barra (primary, success, warning, danger)
 */
const ProgressBar = ({ percentage, label, color = 'primary' }) => (
  <div className={styles.progressContainer}>
    <div className={styles.progressLabel}>
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className={styles.progressBar}>
      <div 
        className={`${styles.progressFill} ${styles[color]}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
);

export default ProgressBar;
