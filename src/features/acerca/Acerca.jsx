/**
 * Feature: Acerca
 * This is the Acerca feature; it composes the about page with information about the application.
 */
import React from 'react';
import uiStyles from '../../styles/ui.module.css';
import styles from '../../styles/acerca.module.css';
import Proposito from './components/Proposito';
import Objetivos from './components/Objetivos';
import Cobertura from './components/Cobertura';
import Valores from './components/Valores';
import CTA from './components/CTA';

const Acerca = () => (
  <main className={styles.aboutPage}>
    <div className={uiStyles.container}>
      <h1 className={styles.pageTitle}>Sobre App_Rural</h1>
      <p className={styles.pageSubtitle}>
        Transparencia y monitoreo para sistemas de agua potable rurales.
      </p>
      <div className={styles.cardGrid}>
        <Proposito />
        <Objetivos />
        <Cobertura />
        <Valores />
        <CTA />
      </div>
    </div>
  </main>
);

export default Acerca;
