import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../../lib/apiClient';
import styles from './register.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setIsLoading(true);
      // Call the registration API
      await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Redirect to login page with success message
      navigate('/login', { 
        state: { 
          from,
          message: '¡Registro exitoso! Por favor inicia sesión.'
        } 
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Error al registrar el usuario. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Crear Cuenta</h2>
        
        {error && (
          <div style={pageStyles.error}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={pageStyles.form}>
          <div style={pageStyles.formGroup}>
            <label htmlFor="name" style={pageStyles.label}>Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          
          <div style={pageStyles.formGroup}>
            <label htmlFor="email" style={pageStyles.label}>Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          
          <div style={pageStyles.formGroup}>
            <label htmlFor="password" style={pageStyles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
              minLength="6"
            />
          </div>
          
          <div style={pageStyles.formGroup}>
            <label htmlFor="confirmPassword" style={pageStyles.label}>Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              required
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        
        <div style={pageStyles.loginLink}>
          ¿Ya tienes una cuenta?{' '}
          <Link 
            to="/login" 
            state={{ from }}
            style={pageStyles.link}
          >
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

const pageStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 100px)',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 24px',
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  error: {
    padding: '12px',
    marginBottom: '20px',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151',
  },
  loginLink: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#4b5563',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
  },
  'link:hover': {
    textDecoration: 'underline',
  },
};

export default RegisterPage;
