import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';  // Importar estilos globales
import AppRouter from './router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
