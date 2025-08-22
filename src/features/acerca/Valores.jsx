import React from 'react';
import styles from '../../styles/acerca.module.css';

const Valores = () => {
  const valores = ["Transparencia", "Accesibilidad", "Confiabilidad", "Sostenibilidad"];

  return (
    <section className={styles.section}>
      <h2>Nuestros Valores</h2>
      <div className={styles.chipsContainer}>
        {valores.map((valor, index) => (
          <span key={index} className={styles.chip}>
            {valor}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Valores;
