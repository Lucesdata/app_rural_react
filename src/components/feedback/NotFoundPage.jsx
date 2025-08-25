import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Página no encontrada</h2>
        <p style={styles.text}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/" style={styles.button}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  content: {
    maxWidth: '500px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '6rem',
    fontWeight: 'bold',
    margin: '0',
    color: '#2563eb',
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: '10px 0',
    color: '#1f2937',
  },
  text: {
    fontSize: '1.1rem',
    color: '#4b5563',
    marginBottom: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
};

export default NotFoundPage;
