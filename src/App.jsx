import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AppRouter from './router';
import uiStyles from './styles/ui.module.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className={uiStyles.mainContent}>
        <AppRouter />
      </main>
    </AuthProvider>
  );
}

export default App;
