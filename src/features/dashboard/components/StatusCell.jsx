import React from 'react';
import styles from '../../../styles/dashboard.module.css';

/**
 * StatusCell - Muestra un indicador de estado con etiqueta
 * @param {Object} props - Propiedades del componente
 * @param {string} props.status - Estado a mostrar (normal, warning, danger)
 */
const StatusCell = ({ status }) => {
  const statusMap = {
    normal: { label: 'Normal', className: styles.statusNormal },
    warning: { label: 'Advertencia', className: styles.statusWarning },
    danger: { label: 'Crítico', className: styles.statusDanger }
  };
  
  const { label, className } = statusMap[status] || statusMap.normal;
  
  return <span className={`${styles.statusChip} ${className}`}>{label}</span>;
};

export default StatusCell;
