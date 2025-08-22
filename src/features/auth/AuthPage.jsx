import React from 'react';
import AuthCard from './components/AuthCard';
import Navbar from '../../components/Navbar';
import styles from './auth.module.css';

export default function AuthPage() {
  return (
    <>
      <Navbar />
      <div className={styles.authPage}>
        <main className={styles.authContainer}>
          <AuthCard />
        </main>
      </div>
    </>
  );
}
