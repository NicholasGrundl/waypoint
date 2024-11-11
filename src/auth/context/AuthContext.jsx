// src/auth/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { Authenticator } from '../services/Authenticator';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  const auth = new Authenticator('/');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const hasAuth = await auth.checkAuth();
      setIsAuthenticated(hasAuth);
      
      if (hasAuth) {
        const userData = await auth.getIdentity();
        setUser(userData);
      }
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    auth.login();
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await auth.logout();
      
      if (success) {
        setIsAuthenticated(false);
        setUser(null);
        // Use window.location.href for a full page refresh after logout
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.message);
      // If there's an error, we'll show it but won't redirect
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    isLoading,
    isAuthenticated,
    user,
    error,
    login,
    logout,
    clearError,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
