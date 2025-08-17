import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/ui.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `${styles.logoLink} ${isActive ? styles.logoActive : ''}`
            }
            end
          >
            App_Rural
          </NavLink>
        </div>
        
        <div className={styles.navLinks}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
            end
          >
            Inicio
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
            end
          >
            Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
