import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import styles from '../auth.module.css';
import { useNavigate } from 'react-router-dom';

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const ROLES = [
  { value: 'USUARIO', label: 'Usuario' },
  { value: 'OPERARIO', label: 'Operario' },
  { value: 'PRESIDENTE_JAA', label: 'Presidente JAA' },
  { value: 'ADMIN', label: 'Admin' }
];

export default function SignupForm() {
  const { login } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('USUARIO');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!nombre) {
      setError('Nombre requerido');
      return;
    }
    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }
    if (password.length < 6) {
      setError('Mínimo 6 caracteres');
      return;
    }
    if (password !== confirm) {
      setError('No coinciden');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Simular registro y login
      const user = { nombre, email, rol };
      login(user);
      localStorage.setItem('app_rural_user', JSON.stringify(user));
      navigate('/dashboard', { replace: true });
    }, 700);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="signup-nombre" className={styles.label}>Nombre completo</label>
      <input
        id="signup-nombre"
        className={styles.input}
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        autoFocus
        aria-invalid={!!error && !nombre}
      />
      <label htmlFor="signup-email" className={styles.label}>Correo electrónico</label>
      <input
        id="signup-email"
        className={styles.input}
        type="email"
        placeholder="correo@ejemplo.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-invalid={!!error && !validateEmail(email)}
      />
      <label htmlFor="signup-rol" className={styles.label}>Rol</label>
      <select
        id="signup-rol"
        className={styles.input}
        value={rol}
        onChange={e => setRol(e.target.value)}
      >
        {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
      </select>
      <label htmlFor="signup-password" className={styles.label}>Contraseña</label>
      <input
        id="signup-password"
        className={styles.input}
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        aria-invalid={!!error && password.length < 6}
      />
      <label htmlFor="signup-confirm" className={styles.label}>Confirmar contraseña</label>
      <input
        id="signup-confirm"
        className={styles.input}
        type="password"
        placeholder="Confirmar contraseña"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        aria-invalid={!!error && password !== confirm}
      />
      <div className={styles.error} aria-live="polite">{error}</div>
      <button className={styles.button} type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>
      <div style={{fontSize:'0.92rem',color:'#7dd3fc',marginTop:'-0.5rem',textAlign:'center'}}>
        Al crear una cuenta aceptas los Términos y la Política de Privacidad.
      </div>
    </form>
  );
}
