import React from 'react';
import AuthCard from './components/AuthCard';
import styles from './auth.module.css';

export default function AuthPage() {
  return (
    <div className={styles.authPage}>
      <main className={styles.authContainer}>
        <AuthCard />
      </main>
    </div>
  );
}
