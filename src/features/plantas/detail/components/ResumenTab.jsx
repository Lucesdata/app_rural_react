import KpiCard from './KpiCard';
import StatusChip from './StatusChip';
import styles from '../../../../styles/plant-detail.module.css';

const ResumenTab = ({ plant, readings }) => (
  <div className={styles.tabContent}>
    <h3>Resumen de la Planta</h3>
    <div className={styles.kpiGrid}>
      <KpiCard
        value={plant.estado_actual || 'N/A'}
        label="Estado Actual"
        unit={
          plant.estado_actual === 'ok'
            ? '✓'
            : plant.estado_actual === 'warning'
            ? '⚠️'
            : '❌'
        }
      />
      <KpiCard
        value={plant.caudal_actual || '0'}
        label="Caudal"
        unit="L/s"
      />
      <KpiCard
        value={plant.nivel_cloro || '0'}
        label="Nivel de Cloro"
        unit="mg/L"
      />
      <KpiCard value={plant.ph || '0'} label="pH" />
    </div>

    <div className={styles.section}>
      <h4>Últimas lecturas</h4>
      {readings.length > 0 ? (
        <div className={styles.readingsTable}>
          <div className={styles.tableHeader}>
            <div>Fecha</div>
            <div>Caudal (L/s)</div>
            <div>Cloro (mg/L)</div>
            <div>pH</div>
            <div>Estado</div>
          </div>
          {readings.map((reading, index) => (
            <div key={index} className={styles.tableRow}>
              <div>{new Date(reading.fecha).toLocaleString()}</div>
              <div>{reading.caudal}</div>
              <div>{reading.cloro}</div>
              <div>{reading.ph}</div>
              <div>
                <StatusChip status={reading.estado} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay lecturas recientes</p>
      )}
    </div>
  </div>
);

export default ResumenTab;
