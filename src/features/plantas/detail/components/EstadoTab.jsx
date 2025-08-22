import StatusChip from './StatusChip';
import styles from '../../../../styles/plant-detail.module.css';

const EstadoTab = ({ plant }) => (
  <div className={styles.tabContent}>
    <h3>Estado del Sistema</h3>
    <div className={styles.statusGrid}>
      <div className={styles.statusCard}>
        <h4>Bombas</h4>
        <StatusChip status={plant.estado_bombas} />
        <p>Última revisión: {new Date(plant.ultima_revision).toLocaleDateString()}</p>
      </div>
      <div className={styles.statusCard}>
        <h4>Tanque de Almacenamiento</h4>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${plant.nivel_tanque || 0}%` }}
            role="progressbar"
            aria-label="Nivel del tanque"
            aria-valuenow={plant.nivel_tanque || 0}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {plant.nivel_tanque || 0}%
          </div>
        </div>
      </div>
      <div className={styles.statusCard}>
        <h4>Calidad del Agua</h4>
        <StatusChip status={plant.calidad_agua} />
        <p>Último análisis: {new Date(plant.ultimo_analisis).toLocaleDateString()}</p>
      </div>
    </div>
  </div>
);

export default EstadoTab;
