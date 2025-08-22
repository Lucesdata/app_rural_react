import styles from '../../../../styles/plant-detail.module.css';

const InfoTab = ({ plant }) => (
  <div className={styles.tabContent}>
    <h3>Información de la Planta</h3>
    <div className={styles.infoGrid}>
      <div className={styles.infoCard}>
        <h4>Datos Generales</h4>
        <p><strong>Nombre:</strong> {plant.nombre}</p>
        <p><strong>Ubicación:</strong> {plant.ubicacion}</p>
        <p><strong>Fuente de agua:</strong> {plant.fuente}</p>
        <p><strong>Capacidad:</strong> {plant.capacidad} L/s</p>
        <p>
          <strong>Población servida:</strong>{' '}
          {plant.poblacion_servida.toLocaleString()} habitantes
        </p>
      </div>

      <div className={styles.infoCard}>
        <h4>Contacto</h4>
        <p><strong>Operador:</strong> {plant.operador || 'No asignado'}</p>
        <p><strong>Teléfono:</strong> {plant.telefono || 'N/A'}</p>
        <p><strong>Email:</strong> {plant.email || 'N/A'}</p>
        <p>
          <strong>Horario de atención:</strong> {plant.horario_atencion || 'L-V 8:00-17:00'}
        </p>
      </div>

      <div className={styles.infoCard}>
        <h4>Estadísticas</h4>
        <p>
          <strong>En operación desde:</strong> {new Date(plant.fecha_operacion).getFullYear()}
        </p>
        <p>
          <strong>Inversión total:</strong> ${plant.inversion_total?.toLocaleString() || 'N/A'}
        </p>
        <p>
          <strong>Eficiencia:</strong> {plant.eficiencia || 'N/A'}%
        </p>
        <p>
          <strong>Último mantenimiento:</strong>{' '}
          {plant.ultimo_mantenimiento
            ? new Date(plant.ultimo_mantenimiento).toLocaleDateString()
            : 'Nunca'}
        </p>
      </div>
    </div>
  </div>
);

export default InfoTab;
