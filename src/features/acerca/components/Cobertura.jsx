/**
 * Cobertura section for the Acerca page.
 */
import React from 'react';
import styles from '../../../styles/acerca.module.css';

const Cobertura = () => (
  <article className={styles.card}>
    <h2>Cobertura</h2>
    <p>
      Actualmente operamos en 15 comunidades rurales de la región, beneficiando a más de 5,000 familias.
    </p>
    <ul className={styles.list}>
      <li>Monitoreo de 12 plantas de tratamiento</li>
      <li>25 sistemas de distribución</li>
      <li>10 fuentes de agua protegidas</li>
    </ul>
  </article>
);

export default Cobertura;
