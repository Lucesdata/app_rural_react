import React, { createContext, useState, useEffect, useContext } from 'react';

const USER_KEY = 'app_rural_user';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Hidratar user desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // signIn: { email, password }
  const signIn = ({ email, role = 'USUARIO', name }) => {
    const userObj = { name: name || email.split('@')[0], email, role };
    setUser(userObj);
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
  };

  // signUp: { name, email, role, password }
  const signUp = ({ name, email, role }) => {
    const userObj = { name, email, role };
    setUser(userObj);
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
  };

  // signOut
  const signOut = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
