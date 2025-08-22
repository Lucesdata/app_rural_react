/**
 * Feature: Acerca
 * This is the Acerca feature; it composes the about page with information about the application.
 */
import React from 'react';
import uiStyles from '../../styles/ui.module.css';
import Hero from './components/Hero';
import Proposito from './components/Proposito';
import Objetivos from './components/Objetivos';
import Cobertura from './components/Cobertura';
import Valores from './components/Valores';
import CTA from './components/CTA';

const Acerca = () => (
  <main>
    <Hero />
    <div className={uiStyles.container}>
      <Proposito />
      <Objetivos />
      <Cobertura />
      <Valores />
      <CTA />
    </div>
  </main>
);

export default Acerca;
