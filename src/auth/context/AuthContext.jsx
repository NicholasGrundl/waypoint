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
      await auth.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      setError(err.message);
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