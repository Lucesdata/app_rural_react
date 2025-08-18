import React from 'react';
import styles from '../../../styles/home.module.css';

/**
 * WaveBackground - Componente que muestra un fondo con ondas animadas
 * Se utiliza en la página de inicio para el efecto visual del héroe
 */
const WaveBackground = () => (
  <>
    <div className={`${styles.wave} ${styles.wave1}`} aria-hidden="true" />
    <div className={`${styles.wave} ${styles.wave2}`} aria-hidden="true" />
    <div className={`${styles.wave} ${styles.wave3}`} aria-hidden="true" />
  </>
);

export default WaveBackground;
