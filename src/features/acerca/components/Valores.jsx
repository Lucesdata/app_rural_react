/**
 * Valores section for the Acerca page.
 */
import React from 'react';
import uiStyles from '../../../styles/ui.module.css';
import styles from '../../../styles/acerca.module.css';

const valores = [
  'Transparencia',
  'Accesibilidad',
  'Confiabilidad',
  'Sostenibilidad',
];

const Valores = () => (
  <article className={styles.card}>
    <h2>Nuestros Valores</h2>
    <div className={styles.chips}>
      {valores.map((valor) => (
        <span key={valor} className={uiStyles.chip}>
          {valor}
        </span>
      ))}
    </div>
  </article>
);

export default Valores;
