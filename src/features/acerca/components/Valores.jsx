/**
 * Valores section for the Acerca page.
 */
import React from 'react';
import styles from '../../../styles/acerca.module.css';

const valores = [
  'Transparencia',
  'Accesibilidad',
  'Confiabilidad',
  'Sostenibilidad',
];

const Valores = () => (
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

export default Valores;
