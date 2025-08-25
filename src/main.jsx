import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import uiStyles from './styles/ui.module.css';
import './styles/global.css';
import AppRouter from './router';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <Router>
          <Navbar />
          <main className={uiStyles.mainContent}>
            <AppRouter />
          </main>
        </Router>
      </AuthProvider>
    </StrictMode>
  );
