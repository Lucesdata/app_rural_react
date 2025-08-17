import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, ROLES } from '../contexts/AuthContext';
import styles from '../styles/ui.module.css';

const Navbar = () => {
  const { role, updateRole } = useAuth();
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
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/acerca" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Acerca
          </NavLink>
        </div>
        
        <div className={styles.roleSelector}>
          <span className={styles.roleLabel}>Rol:</span>
          <select
            className={styles.roleSelect}
            value={role}
            onChange={(e) => updateRole(e.target.value)}
            aria-label="Seleccionar rol de usuario"
          >
            {Object.entries(ROLES).map(([key, value]) => (
              <option key={key} value={value}>
                {value.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
