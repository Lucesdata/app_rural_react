import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <div style={{color:'#f87171',textAlign:'center',marginTop:'3rem',fontSize:'1.2rem'}}>
        No autorizado para ver esta sección.
      </div>
    );
  }

  return children;
}
