import React, { createContext, useContext, useState, useEffect } from 'react';

export const ROLES = {
  USUARIO: 'USUARIO',
  OPERARIO: 'OPERARIO',
  PRESIDENTE_JAA: 'PRESIDENTE_JAA',
  ADMIN: 'ADMIN'
};

const ROLE_STORAGE_KEY = 'app_rural_user_role';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(ROLES.USUARIO);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load role from localStorage on initial render
  useEffect(() => {
    const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
    if (savedRole && Object.values(ROLES).includes(savedRole)) {
      setRole(savedRole);
    }
    setIsInitialized(true);
  }, []);

  const updateRole = (newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setRole(newRole);
      localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    }
  };

  // Don't render children until we've loaded the role from localStorage
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ role, updateRole, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
