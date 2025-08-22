import styles from '../../../../styles/plant-detail.module.css';

const KpiCard = ({ value, label, unit = '' }) => (
  <div className={styles.kpiCard}>
    <div className={styles.kpiValue}>
      {value}
      {unit && <span className={styles.kpiUnit}>{unit}</span>}
    </div>
    <div className={styles.kpiLabel}>{label}</div>
  </div>
);

export default KpiCard;
