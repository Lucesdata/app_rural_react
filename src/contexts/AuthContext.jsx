/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

export const ROLES = {
  USUARIO: 'USUARIO',
  OPERARIO: 'OPERARIO',
  PRESIDENTE_JAA: 'PRESIDENTE_JAA',
  ADMIN: 'ADMIN'
};

const USER_KEY = 'app_rural_user';
const ROLE_STORAGE_KEY = 'app_rural_user_role';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(ROLES.USUARIO);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      if (parsed.role) setRole(parsed.role);
    } else {
      const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
      if (savedRole && Object.values(ROLES).includes(savedRole)) {
        setRole(savedRole);
      }
    }
    setIsInitialized(true);
  }, []);

  const login = ({ email, role = ROLES.USUARIO, name }) => {
    const userObj = { name: name || email.split('@')[0], email, role };
    setUser(userObj);
    setRole(role);
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const updateRole = (newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setRole(newRole);
      if (user) {
        const updated = { ...user, role: newRole };
        setUser(updated);
        localStorage.setItem(USER_KEY, JSON.stringify(updated));
      } else {
        localStorage.setItem(ROLE_STORAGE_KEY, newRole);
      }
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, role, login, signOut, updateRole, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
