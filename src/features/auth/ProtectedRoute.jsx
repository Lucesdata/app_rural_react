import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, hasAnyRole, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <div>Cargando...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  if (roles && !hasAnyRole(roles)) {
    return (
      <div style={{
        color: '#dc2626',
        textAlign: 'center',
        marginTop: '3rem',
        padding: '1rem',
        backgroundColor: '#fef2f2',
        borderRadius: '0.375rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3>Acceso no autorizado</h3>
        <p>No tienes los permisos necesarios para acceder a esta sección.</p>
      </div>
    );
  }

  return children;
}
