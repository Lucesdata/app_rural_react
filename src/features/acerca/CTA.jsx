import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/acerca.module.css';
import uiStyles from '../../styles/ui.module.css';

const CTA = () => (
  <section className={styles.ctaSection}>
    <h2>¿Listo para comenzar?</h2>
    <p>Únete a nuestra plataforma y comienza a monitorear la calidad del agua en tu comunidad.</p>
    <div className={styles.ctaButtons}>
      <Link to="/registro" className={uiStyles.btnPrimary}>
        Crear cuenta
      </Link>
      <Link to="/contacto" className={uiStyles.btnOutline}>
        Contáctanos
      </Link>
    </div>
  </section>
);

export default CTA;
