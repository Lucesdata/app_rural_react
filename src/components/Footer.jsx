import React from 'react';
import { NavLink } from 'react-router-dom';
import uiStyles from '../styles/ui.module.css';
import styles from '../styles/footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer} aria-label="Pie de página">
      <div className={`${uiStyles.container} ${styles.footerContainer}`}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h2 className={styles.footerHeading}>App_Rural</h2>
            <p className={styles.copyright}>
              &copy; {currentYear} App_Rural. Todos los derechos reservados.
            </p>
          </div>
          
          <nav className={styles.footerNav} aria-label="Navegación del pie de página">
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  end
                >
                  Inicio
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to="/plantas" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  Plantas
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to="/acerca" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  Acerca
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <a 
                  href="#contacto" 
                  className={styles.navLink}
                  onClick={(e) => {
                    e.preventDefault();
                    // Smooth scroll to contact section if it exists
                    const contactSection = document.getElementById('contacto');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
          
          <div className={styles.footerSection}>
            <a 
              href="https://github.com/tu-usuario/app-rural" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.githubLink}
              aria-label="Ver en GitHub (se abre en una nueva pestaña)"
            >
              <svg 
                className={styles.githubIcon} 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
