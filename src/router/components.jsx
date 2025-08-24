import { Navigate } from 'react-router-dom';

// Simple loading component
export const LoadingFallback = () => <div>Loading...</div>;

// Protected route component
export function ProtectedRoute({ children, roles }) {
  if (typeof window === 'undefined') return null; // Handle SSR
  
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}
