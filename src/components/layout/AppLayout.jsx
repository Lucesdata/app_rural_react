import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import styles from '../../styles/layout.module.css';

/**
 * AppLayout - Layout component that wraps all pages with a consistent structure
 * Renders the Navbar and a main content area with proper spacing for the fixed Navbar
 */
const AppLayout = () => {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
