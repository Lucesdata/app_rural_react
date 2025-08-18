import React from 'react';
import styles from '../../../styles/home.module.css';

/**
 * KpiCard - Componente para mostrar tarjetas de indicadores clave (KPIs)
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor numérico a mostrar
 * @param {string} props.label - Etiqueta descriptiva del KPI
 */
const KpiCard = ({ value, label }) => (
  <div className={styles.kpiCard}>
    <div className={styles.kpiValue}>{value}</div>
    <div className={styles.kpiLabel}>{label}</div>
  </div>
);

export default KpiCard;
