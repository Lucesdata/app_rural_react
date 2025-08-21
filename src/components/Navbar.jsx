
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import styles from '../styles/ui.module.css';

const getInitials = (name, email) => {
  if (name) {
    return name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return '?';
};

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink 
          to="/" 
          className={styles.brand}
          end
        >
          App_Rural
        </NavLink>
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
            to="/plantas" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Plantas
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
        {/* Estado de sesión */}
        {user ? (
          <div className={styles.userMenuWrapper}>
            <button className={styles.userChip} onClick={() => setMenuOpen(v => !v)}>
              <span className={styles.userInitials}>{getInitials(user.name, user.email)}</span>
              <span className={styles.userName}>{user.name || user.email}</span>
            </button>
            {menuOpen && (
              <div className={styles.userMenu} onMouseLeave={() => setMenuOpen(false)}>
                <button className={styles.userMenuItem} disabled>Mi perfil</button>
                <button className={styles.userMenuItem} onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={() => navigate('/login')}>
            Entrar
          </button>
        )}
        {/* Selector de rol solo si no hay sesión */}
        {!user && (
          <div className={styles.roleSelector}>
            {/* ...mantener selector de rol global aquí si es necesario... */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
