import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from '../auth.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }
    if (password.length < 6) {
      setError('Mínimo 6 caracteres');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Simular sign-in
      const user = { email, role: 'user' };
      login(user);
      localStorage.setItem('app_rural_user', JSON.stringify(user));
      // Redirigir
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    }, 700);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="login-email" className={styles.label}>Correo electrónico</label>
      <input
        id="login-email"
        className={styles.input}
        type="email"
        placeholder="correo@ejemplo.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
        aria-invalid={!!error && !validateEmail(email)}
      />
      <label htmlFor="login-password" className={styles.label}>Contraseña</label>
      <input
        id="login-password"
        className={styles.input}
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        aria-invalid={!!error && password.length < 6}
      />
      <div className={styles.error} aria-live="polite">{error}</div>
      <button className={styles.button} type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
      <div style={{textAlign:'right',marginTop:'-0.5rem'}}>
        <button type="button" className={styles.link} disabled style={{background:'none',border:'none',color:'#7dd3fc',fontSize:'0.95rem',cursor:'not-allowed',padding:0}}>¿Olvidaste tu contraseña?</button>
      </div>
    </form>
  );
}
