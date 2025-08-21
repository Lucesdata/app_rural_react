import React, { useState, useRef, useEffect, useMemo } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from '../auth.module.css';

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState('login');
  const tabListRef = useRef(null);
  const loginTabRef = useRef(null);
  const signupTabRef = useRef(null);
  
  const tabRefs = useMemo(() => ({
    login: loginTabRef,
    signup: signupTabRef
  }), []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const tabs = ['login', 'signup'];
      const currentIndex = tabs.indexOf(activeTab);
      const direction = e.key === 'ArrowLeft' ? -1 : 1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      setActiveTab(nextTab);
      tabRefs[nextTab].current.focus();
    }
  };

  useEffect(() => {
    tabRefs[activeTab].current.focus();
  }, [activeTab, tabRefs]);

  return (
    <div className={styles.authCard}>
      <div 
        className={styles.tabs} 
        role="tablist"
        aria-label="Seleccionar tipo de autenticación"
        ref={tabListRef}
      >
        <button
          ref={tabRefs.login}
          role="tab"
          id="login-tab"
          aria-selected={activeTab === 'login'}
          aria-controls="login-panel"
          tabIndex={activeTab === 'login' ? 0 : -1}
          className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('login')}
          onKeyDown={handleKeyDown}
        >
          Entrar
        </button>
        <button
          ref={tabRefs.signup}
          role="tab"
          id="signup-tab"
          aria-selected={activeTab === 'signup'}
          aria-controls="signup-panel"
          tabIndex={activeTab === 'signup' ? 0 : -1}
          className={`${styles.tab} ${activeTab === 'signup' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('signup')}
          onKeyDown={handleKeyDown}
        >
          Suscribirse
        </button>
      </div>
      <div 
        id="login-panel"
        role="tabpanel"
        aria-labelledby="login-tab"
        hidden={activeTab !== 'login'}
        className={styles.tabContent}
      >
        {activeTab === 'login' && <LoginForm />}
      </div>
      <div 
        id="signup-panel"
        role="tabpanel"
        aria-labelledby="signup-tab"
        hidden={activeTab !== 'signup'}
        className={styles.tabContent}
      >
        {activeTab === 'signup' && <SignupForm />}
      </div>
    </div>
  );
}
