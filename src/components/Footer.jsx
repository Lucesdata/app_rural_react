import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Pie de página">
      <div className={styles.row}>
        <div className={styles.brand}>
          <strong>App_Rural</strong>
          <span className={styles.tagline}>Plataforma de monitoreo rural de agua potable</span>
        </div>
        
        <div className={styles.cert}>
          <span className={styles.certBadge}>✓</span>
          <span className={styles.certText}>
            Certificación / Entidad: ________
            <span className={styles.regNumber}>Registro N° ________</span>
          </span>
        </div>
      </div>
      
      <nav className={styles.links} aria-label="Enlaces de navegación">
        <NavLink 
          to="/" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
          end
        >
          Inicio
        </NavLink>
        <span className={styles.separator}>·</span>
        <NavLink 
          to="/plantas" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
        >
          Plantas
        </NavLink>
        <span className={styles.separator}>·</span>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
        >
          Dashboard
        </NavLink>
        <span className={styles.separator}>·</span>
        <NavLink 
          to="/acerca" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
        >
          Acerca
        </NavLink>
        <span className={styles.separator}>·</span>
        <a 
          href="#contacto" 
          className={styles.link}
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Contacto
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
