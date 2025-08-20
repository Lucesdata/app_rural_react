import React from 'react';
import styles from '../../../styles/dashboard.module.css';

/**
 * AlertItem - Muestra un elemento de alerta con hora y mensaje
 * @param {Object} props - Propiedades del componente
 * @param {string} props.time - Hora de la alerta
 * @param {string} props.message - Mensaje de la alerta
 * @param {string} [props.severity='info'] - Nivel de severidad (info, warning, danger)
 */
const AlertItem = ({ time, message, severity = 'info' }) => (
  <div className={`${styles.alertItem} ${styles[severity]}`}>
    <div className={styles.alertTime}>{time}</div>
    <div className={styles.alertMessage}>{message}</div>
  </div>
);

export default AlertItem;
