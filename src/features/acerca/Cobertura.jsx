import React from 'react';
import styles from '../../styles/acerca.module.css';

const Cobertura = () => (
  <section className={styles.section}>
    <h2>Cobertura</h2>
    <div className={styles.gridTwo}>
      <div className={styles.card}>
        <h3>Áreas de impacto</h3>
        <p>Actualmente operamos en 15 comunidades rurales de la región, beneficiando a más de 5,000 familias.</p>
        <ul className={styles.coberturaList}>
          <li>Monitoreo de 12 plantas de tratamiento</li>
          <li>25 sistemas de distribución</li>
          <li>10 fuentes de agua protegidas</li>
        </ul>
      </div>
      <div className={styles.card}>
        <h3>Próximas expansiones</h3>
        <p>Estamos trabajando para ampliar nuestra cobertura a 10 comunidades adicionales para finales del próximo año.</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: '60%' }}
            role="progressbar"
            aria-valuenow={60}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className={styles.progressText}>60% de la meta de expansión alcanzada</p>
      </div>
    </div>
  </section>
);

export default Cobertura;
