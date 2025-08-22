/**
 * Propósito section for the Acerca page.
 */
import React from 'react';
import styles from '../../../styles/acerca.module.css';

const Proposito = () => (
  <article className={styles.card}>
    <h2>Propósito</h2>
    <p>
      Nuestra misión es facilitar el monitoreo continuo de sistemas de agua potable en zonas rurales,
      proporcionando datos confiables para la toma de decisiones informadas que garanticen la continuidad
      del servicio y la calidad del agua para las comunidades.
    </p>
  </article>
);

export default Proposito;
