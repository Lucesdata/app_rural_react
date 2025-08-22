import React from 'react';
import uiStyles from '../../styles/ui.module.css';
import Hero from './Hero';
import Proposito from './Proposito';
import Objetivos from './Objetivos';
import Cobertura from './Cobertura';
import Valores from './Valores';
import CTA from './CTA';

const Acerca = () => {
  return (
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
};

export default Acerca;
