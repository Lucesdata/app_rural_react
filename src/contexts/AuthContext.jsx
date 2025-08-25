import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../lib/apiClient';
import { ROLES, USER_KEY, TOKEN_KEY } from '../constants/roles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(ROLES.USUARIO);
  const [isInitialized, setIsInitialized] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Clear auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setToken(null);
    setRole(ROLES.USUARIO);
    setError(null);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  // Check if user has required role
  const hasRole = useCallback((requiredRole) => {
    if (!user) return false;
    if (role === ROLES.ADMIN) return true; // Admins have access to everything
    return role === requiredRole;
  }, [user, role]);

  // Check if user has any of the required roles
  const hasAnyRole = useCallback((requiredRoles) => {
    if (!user) return false;
    if (role === ROLES.ADMIN) return true; // Admins have access to everything
    return requiredRoles.includes(role);
  }, [user, role]);

  // Login function
  const login = useCallback(async (credentials) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await authApi.login(credentials);
      
      if (!response.token || !response.user) {
        throw new Error('Invalid response from server');
      }
      
      const { token: authToken, user: userData } = response;
      
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, authToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setToken(authToken);
      setRole(userData.role || ROLES.USUARIO);
      
      return userData;
    } catch (err) {
      const errorMessage = err.message || 'Error de autenticación';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem(USER_KEY);
        const storedToken = localStorage.getItem(TOKEN_KEY);
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);
          
          // Set role if available, default to USUARIO
          const userRole = parsedUser.role || ROLES.USUARIO;
          setRole(userRole);
          
          // Verify token with backend
          try {
            await authApi.getProfile();
          } catch (err) {
            console.warn('Session expired, logging out...', err);
            logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthData();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();

    // Listen for unauthorized events (e.g., 401 responses)
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [clearAuthData, logout]);

  // Context value
  const contextValue = {
    user,
    role,
    token,
    isAuthenticated: !!user,
    isInitialized,
    isLoading,
    error,
    login,
    logout,
    hasRole,
    hasAnyRole,
    ROLES
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context for use with the useAuth hook
export default AuthContext;
