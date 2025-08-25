import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../styles/layout.module.css';

/**
 * AppLayout - Layout component that wraps all pages with a consistent structure
 * Provides a main content area with proper spacing for the fixed Navbar
 */
const AppLayout = () => {
  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
