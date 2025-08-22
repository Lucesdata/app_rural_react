import styles from '../../../../styles/plant-detail.module.css';

const StatusChip = ({ status }) => {
  const statusMap = {
    ok: { label: 'Óptimo', className: styles.statusOk },
    warning: { label: 'Advertencia', className: styles.statusWarning },
    error: { label: 'Crítico', className: styles.statusError },
  };

  const { label, className } =
    statusMap[status] || { label: 'Desconocido', className: styles.statusUnknown };

  return <span className={`${styles.statusChip} ${className}`}>{label}</span>;
};

export default StatusChip;
