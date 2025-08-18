import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';  // Importar estilos globales
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
